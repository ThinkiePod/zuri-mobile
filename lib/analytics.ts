import * as Amplitude from "@amplitude/analytics-react-native";

class AnalyticsService {
  // private amplitude: typeof Amplitude;

  constructor() {
    Amplitude.init(process.env.EXPO_PUBLIC_AMPLITUDE_API_KEY!);
  }

  // User events
  trackUserSignUp(userId: string, method: string) {
    Amplitude.logEvent("user_sign_up", {
      user_id: userId,
      method,
      timestamp: new Date().toISOString(),
    });
  }

  trackUserSignIn(userId: string) {
    Amplitude.logEvent("user_sign_in", {
      user_id: userId,
      timestamp: new Date().toISOString(),
    });
  }

  // Child profile events
  trackChildProfileCreated(childId: string, age: number, interests: string[]) {
    Amplitude.logEvent("child_profile_created", {
      child_id: childId,
      age,
      interests_count: interests.length,
      timestamp: new Date().toISOString(),
    });
  }

  // Learning events
  trackStoryCompleted(childId: string, storyId: string, duration: number) {
    Amplitude.logEvent("story_completed", {
      child_id: childId,
      story_id: storyId,
      duration_seconds: duration,
      timestamp: new Date().toISOString(),
    });
  }

  trackPhonicsGameCompleted(childId: string, gameId: string, score: number) {
    Amplitude.logEvent("phonics_game_completed", {
      child_id: childId,
      game_id: gameId,
      score,
      timestamp: new Date().toISOString(),
    });
  }

  trackEmotionCheckIn(childId: string, emotion: string) {
    Amplitude.logEvent("emotion_check_in", {
      child_id: childId,
      emotion,
      timestamp: new Date().toISOString(),
    });
  }

  // Device events
  trackDevicePaired(deviceId: string) {
    Amplitude.logEvent("device_paired", {
      device_id: deviceId,
      timestamp: new Date().toISOString(),
    });
  }

  trackDeviceInteraction(deviceId: string, interactionType: string) {
    Amplitude.logEvent("device_interaction", {
      device_id: deviceId,
      interaction_type: interactionType,
      timestamp: new Date().toISOString(),
    });
  }

  // Subscription events
  trackSubscriptionStarted(userId: string, plan: string) {
    Amplitude.logEvent("subscription_started", {
      user_id: userId,
      plan,
      timestamp: new Date().toISOString(),
    });
  }

  trackSubscriptionCancelled(userId: string, plan: string) {
    Amplitude.logEvent("subscription_cancelled", {
      user_id: userId,
      plan,
      timestamp: new Date().toISOString(),
    });
  }

  // Set user properties
  setUserProperties(userId: string, properties: Record<string, any>) {
    Amplitude.setUserId(userId);
    const identityObj = new Amplitude.Identify();
    // Amplitude.setUserProperties(properties);
    Object.entries(properties).forEach(([k, v]) => {
      identityObj.set(k, v);
    });
    Amplitude.identify(identityObj);
  }
}

export const analytics = new AnalyticsService();
