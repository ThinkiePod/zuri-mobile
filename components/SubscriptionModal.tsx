import { modernPayments } from "@/lib/payments";
import { colors } from "@/utils/colors";
import { useAuth } from "@clerk/clerk-expo";
import { Check, CreditCard, Smartphone, Star, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ModernSubscriptionModalProps {
  visible: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

export default function ModernSubscriptionModal({
  visible,
  onClose,
  onSubscribe,
}: ModernSubscriptionModalProps) {
  const { userId } = useAuth();
  const [plans, setPlans] = useState<any[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isWeb = Platform.OS === "web";

  useEffect(() => {
    if (visible) {
      loadPlans();
    }
  }, [visible]);

  const loadPlans = async () => {
    try {
      setIsLoading(true);
      await modernPayments.initialize(userId!);
      const availablePlans = await modernPayments.getSubscriptionPlans();
      setPlans(availablePlans);

      // Select the popular plan or first plan by default
      const defaultPlan =
        availablePlans.find((plan) => plan.popular) || availablePlans[0];
      if (defaultPlan) {
        setSelectedPlan(defaultPlan);
      }
    } catch (error) {
      console.error("Load plans error:", error);
      Alert.alert("Error", "Failed to load subscription plans");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!selectedPlan) return;

    try {
      setIsLoading(true);

      const planId = isWeb ? selectedPlan.priceId : selectedPlan.id;
      const success = await modernPayments.purchaseSubscription(planId);

      if (success) {
        if (isWeb) {
          // For web, Stripe will redirect to checkout
          // Success will be handled on return
        } else {
          Alert.alert(
            "Success! 🎉",
            "Welcome to Zuri Premium! You now have access to all premium features.",
            [
              {
                text: "OK",
                onPress: () => {
                  onSubscribe();
                  onClose();
                },
              },
            ]
          );
        }
      }
    } catch (error: any) {
      Alert.alert(
        "Purchase Failed",
        error.message || "Unable to complete purchase"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestore = async () => {
    if (isWeb) {
      Alert.alert(
        "Not Available",
        "Restore purchases is only available on mobile devices."
      );
      return;
    }

    try {
      setIsLoading(true);

      const success = await modernPayments.restorePurchases();

      if (success) {
        Alert.alert(
          "Restored! ✅",
          "Your premium subscription has been restored.",
          [
            {
              text: "OK",
              onPress: () => {
                onSubscribe();
                onClose();
              },
            },
          ]
        );
      } else {
        Alert.alert(
          "No Purchases",
          "No active subscriptions found to restore."
        );
      }
    } catch {
      Alert.alert("Restore Failed", "Unable to restore purchases");
    } finally {
      setIsLoading(false);
    }
  };

  const premiumFeatures = [
    "Unlimited stories and educational content",
    "Advanced learning analytics and insights",
    "Personalized learning paths for your child",
    "Priority customer support",
    "Offline content downloads",
    "Multiple child profiles",
    "Custom device settings and preferences",
    "Weekly detailed progress reports",
    "Early access to new features",
    "Ad-free experience",
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={colors.custom["800"]} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Zuri Premium</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.heroSection}>
            <View style={styles.starContainer}>
              <Star size={40} color="#FFD60A" fill="#FFD60A" />
            </View>
            <Text style={styles.title}>Unlock Premium Features</Text>
            <Text style={styles.subtitle}>
              Give your child the best learning experience with unlimited access
              to all content and advanced features.
            </Text>
          </View>

          <View style={styles.featuresSection}>
            <Text style={styles.featuresTitle}>What&apos;s included:</Text>
            <View style={styles.featuresGrid}>
              {premiumFeatures.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Check size={18} color="#30D158" strokeWidth={2.5} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          {plans.length > 0 && (
            <View style={styles.pricingSection}>
              <Text style={styles.pricingTitle}>Choose your plan:</Text>
              {plans.map((plan) => (
                <TouchableOpacity
                  key={plan.id}
                  style={[
                    styles.packageOption,
                    selectedPlan?.id === plan.id && styles.selectedPackage,
                    plan.popular && styles.popularPackage,
                  ]}
                  onPress={() => setSelectedPlan(plan)}
                >
                  {plan.popular && (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularBadgeText}>Most Popular</Text>
                    </View>
                  )}
                  <View style={styles.packageInfo}>
                    <Text style={styles.packageTitle}>{plan.name}</Text>
                    <Text style={styles.packagePrice}>{plan.price}</Text>
                    {plan.features && (
                      <View style={styles.planFeatures}>
                        {plan.features
                          .slice(0, 3)
                          .map((feature: string, index: number) => (
                            <Text key={index} style={styles.planFeature}>
                              • {feature}
                            </Text>
                          ))}
                      </View>
                    )}
                  </View>
                  <View style={styles.radioButton}>
                    {selectedPlan?.id === plan.id && (
                      <View style={styles.radioButtonSelected} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <TouchableOpacity
            style={[styles.subscribeButton, isLoading && styles.disabledButton]}
            onPress={handlePurchase}
            disabled={isLoading || !selectedPlan}
          >
            {isWeb ? (
              <CreditCard size={20} color="#ffffff" style={styles.buttonIcon} />
            ) : (
              <Smartphone size={20} color="#ffffff" style={styles.buttonIcon} />
            )}
            <Text style={styles.subscribeButtonText}>
              {isLoading
                ? "Processing..."
                : isWeb
                  ? "Continue with Stripe"
                  : "Start Premium"}
            </Text>
          </TouchableOpacity>

          {!isWeb && (
            <TouchableOpacity
              style={styles.restoreButton}
              onPress={handleRestore}
            >
              <Text style={styles.restoreButtonText}>Restore Purchases</Text>
            </TouchableOpacity>
          )}

          <View style={styles.securitySection}>
            <Text style={styles.securityTitle}>🔒 Secure Payment</Text>
            <Text style={styles.securityText}>
              {isWeb
                ? "Payments processed securely by Stripe. Your payment information is encrypted and never stored on our servers."
                : "Payments processed through Apple App Store or Google Play. Cancel anytime from your device settings."}
            </Text>
          </View>

          <Text style={styles.disclaimer}>
            {isWeb
              ? "Cancel anytime from your account settings. No hidden fees or commitments."
              : "Subscription automatically renews unless auto-renew is turned off at least 24 hours before the end of the current period. Manage your subscription in your device settings."}
          </Text>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: "#1a1a1a",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  heroSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  starContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#fff8e1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#FFD60A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontFamily: "Inter-Bold",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#666666",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  featuresSection: {
    marginBottom: 32,
  },
  featuresTitle: {
    fontSize: 20,
    fontFamily: "Inter-SemiBold",
    color: "#1a1a1a",
    marginBottom: 20,
  },
  featuresGrid: {
    gap: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 4,
  },
  featureText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#1a1a1a",
    marginLeft: 12,
    flex: 1,
    lineHeight: 22,
  },
  pricingSection: {
    marginBottom: 24,
  },
  pricingTitle: {
    fontSize: 20,
    fontFamily: "Inter-SemiBold",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  packageOption: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderWidth: 2,
    borderColor: "#e9ecef",
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: "#ffffff",
  },
  selectedPackage: {
    borderColor: "#007AFF",
    backgroundColor: "#f0f8ff",
  },
  popularPackage: {
    borderColor: "#FFD60A",
    backgroundColor: "#fffbf0",
  },
  popularBadge: {
    position: "absolute",
    top: -8,
    left: 20,
    backgroundColor: "#FFD60A",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularBadgeText: {
    fontSize: 12,
    fontFamily: "Inter-SemiBold",
    color: "#1a1a1a",
  },
  packageInfo: {
    flex: 1,
  },
  packageTitle: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  packagePrice: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    color: "#007AFF",
    marginBottom: 8,
  },
  planFeatures: {
    gap: 4,
  },
  planFeature: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#666666",
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 16,
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#007AFF",
  },
  subscribeButton: {
    flexDirection: "row",
    height: 56,
    backgroundColor: "#007AFF",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
    shadowOpacity: 0,
  },
  subscribeButtonText: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: "#ffffff",
  },
  restoreButton: {
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  restoreButtonText: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: "#007AFF",
  },
  securitySection: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  securityTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  securityText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#666666",
    lineHeight: 20,
  },
  disclaimer: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#666666",
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 20,
  },
});
