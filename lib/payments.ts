import { Platform } from "react-native";
import Purchases from "react-native-purchases";

// Modern payment service that handles both web and mobile
export class ModernPaymentService {
  private isWeb: boolean;
  private isInitialized: boolean = false;

  constructor() {
    this.isWeb = Platform.OS === "web";
  }

  async initialize(userId: string) {
    if (this.isInitialized) return;

    try {
      if (this.isWeb) {
        await this.initializeWebPayments();
      } else {
        await this.initializeMobilePayments(userId);
      }
      this.isInitialized = true;
    } catch (error) {
      console.error("Payment initialization error:", error);
    }
  }

  private async initializeWebPayments() {
    // For web, we'll use Stripe Elements or Checkout
    if (typeof window !== "undefined") {
      // Load Stripe.js dynamically
      const script = document.createElement("script");
      script.src = "https://js.stripe.com/v3/";
      script.async = true;
      document.head.appendChild(script);

      return new Promise((resolve) => {
        script.onload = resolve;
      });
    }
  }

  private async initializeMobilePayments(userId: string) {
    // Use react-native-purchases (formerly RevenueCat)
    const apiKey = Platform.select({
      ios: process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY!,
      android: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY!,
    });

    if (apiKey) {
      await Purchases.configure({
        apiKey,
        appUserID: userId,
      });
    }
  }

  async getSubscriptionPlans(): Promise<any[]> {
    if (this.isWeb) {
      return this.getWebPlans();
    } else {
      return this.getMobilePlans();
    }
  }

  private async getWebPlans() {
    // Return predefined Stripe plans for web
    return [
      {
        id: "monthly",
        name: "Monthly Premium",
        price: "$9.99/month",
        priceId: process.env.EXPO_PUBLIC_STRIPE_MONTHLY_PRICE_ID!,
        interval: "month",
        features: [
          "Unlimited stories and content",
          "Advanced learning analytics",
          "Personalized learning paths",
          "Priority customer support",
        ],
      },
      {
        id: "yearly",
        name: "Yearly Premium",
        price: "$99.99/year",
        priceId: process.env.EXPO_PUBLIC_STRIPE_YEARLY_PRICE_ID!,
        interval: "year",
        features: [
          "Unlimited stories and content",
          "Advanced learning analytics",
          "Personalized learning paths",
          "Priority customer support",
          "Save 17% compared to monthly",
        ],
        popular: true,
      },
    ];
  }

  private async getMobilePlans(): Promise<any[]> {
    try {
      const offerings = await Purchases.getOfferings();
      const currentOffering = offerings.current;

      if (!currentOffering) return [];

      return currentOffering.availablePackages.map((pkg: any) => ({
        id: pkg.identifier,
        name: pkg.product.title,
        price: pkg.product.priceString,
        interval: pkg.packageType,
        features: [
          "Unlimited stories and content",
          "Advanced learning analytics",
          "Personalized learning paths",
          "Priority customer support",
        ],
        package: pkg,
      }));
    } catch (error) {
      console.error("Get mobile plans error:", error);
      return [];
    }
  }

  async purchaseSubscription(planId: string): Promise<boolean> {
    if (this.isWeb) {
      return this.purchaseWebSubscription(planId);
    } else {
      return this.purchaseMobileSubscription(planId);
    }
  }

  private async purchaseWebSubscription(priceId: string): Promise<boolean> {
    try {
      // Create checkout session via API route
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/subscription-success`,
          cancelUrl: `${window.location.origin}/subscription-cancelled`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      if (typeof window !== "undefined" && (window as any).Stripe) {
        const stripe = (window as any).Stripe(
          process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!
        );
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
          throw error;
        }
      }

      return true;
    } catch (error) {
      console.error("Web purchase error:", error);
      throw error;
    }
  }

  private async purchaseMobileSubscription(
    packageId: string
  ): Promise<boolean> {
    try {
      const offerings = await Purchases.getOfferings();
      const currentOffering = offerings.current;

      if (!currentOffering) {
        throw new Error("No offerings available");
      }

      const packageToPurchase = currentOffering.availablePackages.find(
        (pkg: any) => pkg.identifier === packageId
      );

      if (!packageToPurchase) {
        throw new Error("Package not found");
      }

      const { customerInfo } = await Purchases.purchasePackage(
        packageToPurchase
      );
      return customerInfo?.entitlements.active["premium"] !== undefined;
    } catch (error) {
      console.error("Mobile purchase error:", error);
      throw error;
    }
  }

  async checkSubscriptionStatus(): Promise<boolean> {
    if (this.isWeb) {
      return this.checkWebSubscription();
    } else {
      return this.checkMobileSubscription();
    }
  }

  private async checkWebSubscription(): Promise<boolean> {
    try {
      const response = await fetch("/api/subscription-status", {
        credentials: "include",
      });

      if (!response.ok) {
        return false;
      }

      const { isActive } = await response.json();
      return isActive;
    } catch (error) {
      console.error("Check web subscription error:", error);
      return false;
    }
  }

  private async checkMobileSubscription(): Promise<boolean> {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      return customerInfo?.entitlements.active["premium"] !== undefined;
    } catch (error) {
      console.error("Check mobile subscription error:", error);
      return false;
    }
  }

  async restorePurchases(): Promise<boolean> {
    if (this.isWeb) {
      // Web doesn't need restore functionality
      return true;
    }

    try {
      const customerInfo = await Purchases.restorePurchases();
      return customerInfo?.entitlements.active["premium"] !== undefined;
    } catch (error) {
      console.error("Restore purchases error:", error);
      throw error;
    }
  }

  async getCustomerInfo(): Promise<any> {
    if (this.isWeb) {
      // For web, return subscription info from your backend
      try {
        const response = await fetch("/api/customer-info", {
          credentials: "include",
        });
        return response.ok ? await response.json() : null;
      } catch {
        return null;
      }
    } else {
      try {
        return await Purchases.getCustomerInfo();
      } catch {
        return null;
      }
    }
  }
}

export const modernPayments = new ModernPaymentService();
