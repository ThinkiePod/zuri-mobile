import { analytics } from "@/lib/analytics";
import { registerForPushNotificationsAsync } from "@/lib/notifications";
import { modernPayments as payments } from "@/lib/payments";
import { Child, Profile, supabase } from "@/lib/superbase";
import { useAuth } from "@clerk/clerk-expo";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AppContextType {
  profile: Profile | null;
  children: Child[];
  selectedChild: Child | null;
  isLoading: boolean;
  isPremium: boolean;
  pushToken: string | null;
  setSelectedChild: (child: Child | null) => void;
  refreshData: () => Promise<void>;
  createChildProfile: (childData: Partial<Child>) => Promise<Child | null>;
  updateChildProfile: (
    childId: string,
    updates: Partial<Child>
  ) => Promise<boolean>;
  deleteChildProfile: (childId: string) => Promise<boolean>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { userId, isSignedIn } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [childrenList, setChildrenList] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [pushToken, setPushToken] = useState<string | null>(null);

  useEffect(() => {
    if (isSignedIn && userId) {
      initializeApp();
    } else {
      resetState();
    }
  }, [isSignedIn, userId]);

  const initializeApp = async () => {
    try {
      setIsLoading(true);

      // Initialize services
      await Promise.all([
        loadProfile(),
        loadChildren(),
        initializePushNotifications(),
        initializePayments(),
        checkPremiumStatus(),
      ]);

      // Set analytics user
      if (userId) {
        analytics.setUserProperties(userId, {
          signed_in: true,
          platform: "mobile",
        });
      }
    } catch (error) {
      console.error("App initialization error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setProfile(null);
    setChildrenList([]);
    setSelectedChild(null);
    setIsPremium(false);
    setPushToken(null);
    setIsLoading(false);
  };

  const loadProfile = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Load profile error:", error);
        return;
      }

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error("Load profile error:", error);
    }
  };

  const loadChildren = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from("children")
        .select("*")
        .eq("parent_id", userId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Load children error:", error);
        return;
      }

      setChildrenList(data || []);

      // Set first child as selected if none selected
      if (data && data.length > 0 && !selectedChild) {
        setSelectedChild(data[0]);
      }
    } catch (error) {
      console.error("Load children error:", error);
    }
  };

  const initializePushNotifications = async () => {
    try {
      const token = await registerForPushNotificationsAsync();
      setPushToken(token || null);

      // Save token to profile
      if (token && userId) {
        await supabase.from("profiles").upsert({
          user_id: userId,
          push_token: token,
          updated_at: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Push notifications error:", error);
    }
  };

  const initializePayments = async () => {
    if (userId) {
      await payments.initialize(userId);
    }
  };

  const checkPremiumStatus = async () => {
    try {
      const isSubscribed = await payments.checkSubscriptionStatus();
      setIsPremium(isSubscribed);
    } catch (error) {
      console.error("Check premium status error:", error);
    }
  };

  const refreshData = async () => {
    await Promise.all([loadProfile(), loadChildren(), checkPremiumStatus()]);
  };

  const createChildProfile = async (
    childData: Partial<Child>
  ): Promise<Child | null> => {
    if (!userId) return null;

    try {
      const newChild = {
        ...childData,
        parent_id: userId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("children")
        .insert(newChild)
        .select()
        .single();

      if (error) {
        console.error("Create child error:", error);
        return null;
      }

      // Update local state
      setChildrenList((prev) => [...prev, data]);

      // Set as selected if first child
      if (childrenList.length === 0) {
        setSelectedChild(data);
      }

      // Track analytics
      analytics.trackChildProfileCreated(
        data.id,
        data.age,
        data.interests || []
      );

      return data;
    } catch (error) {
      console.error("Create child error:", error);
      return null;
    }
  };

  const updateChildProfile = async (
    childId: string,
    updates: Partial<Child>
  ): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("children")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", childId);

      if (error) {
        console.error("Update child error:", error);
        return false;
      }

      // Update local state
      setChildrenList((prev) =>
        prev.map((child) =>
          child.id === childId ? { ...child, ...updates } : child
        )
      );

      // Update selected child if it's the one being updated
      if (selectedChild?.id === childId) {
        setSelectedChild((prev) => (prev ? { ...prev, ...updates } : null));
      }

      return true;
    } catch (error) {
      console.error("Update child error:", error);
      return false;
    }
  };

  const deleteChildProfile = async (childId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("children")
        .delete()
        .eq("id", childId);

      if (error) {
        console.error("Delete child error:", error);
        return false;
      }

      // Update local state
      setChildrenList((prev) => prev.filter((child) => child.id !== childId));

      // Clear selected child if it was deleted
      if (selectedChild?.id === childId) {
        const remainingChildren = childrenList.filter(
          (child) => child.id !== childId
        );
        setSelectedChild(
          remainingChildren.length > 0 ? remainingChildren[0] : null
        );
      }

      return true;
    } catch (error) {
      console.error("Delete child error:", error);
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        children: childrenList,
        selectedChild,
        isLoading,
        isPremium,
        pushToken,
        setSelectedChild,
        refreshData,
        createChildProfile,
        updateChildProfile,
        deleteChildProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
