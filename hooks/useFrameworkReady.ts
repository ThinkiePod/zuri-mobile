// hooks/useFrameworkReady.ts

import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { useEffect } from "react";

export function useFrameworkReady() {
  const { user, child, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      try {
        if (!user) {
          // User not authenticated, redirect to onboarding
          router.replace("/onboarding");
        } else if (user && child) {
          // User and child profile exist, go to main app
          router.replace("/");
        } else if (user && !child) {
          // User exists but no child profile, continue onboarding
          router.replace("/onboarding/child-profile");
        }
      } catch (error) {
        console.error("Navigation failed:", error);
      }
    }
  }, [user, child, isLoading]);
}
