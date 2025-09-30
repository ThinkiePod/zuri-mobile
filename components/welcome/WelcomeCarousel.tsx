import { colors as themeColors } from "@/utils/colors";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { InitialWelcomeScreen } from "./InitialWelcome";
import { InitialWelcomeScreenV2 } from "./InitialWelcomeV2";
import { InitialWelcomeScreenV3 } from "./InitialWelcomeV3";

const screens = [
  InitialWelcomeScreen,
  InitialWelcomeScreenV2,
  InitialWelcomeScreenV3,
];

const colors = [
  themeColors.main,
  themeColors.custom["700"],
  themeColors.custom["200"],
];

export const WelcomeCarousel = ({
  onboardingComplete,
}: {
  onboardingComplete: boolean;
}) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const bgAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.parallel([
        // Fade out current screen
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500, // fade out duration
          useNativeDriver: true,
        }),
        Animated.timing(bgAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: false,
        }),
      ]).start(() => {
        const next = currentIndex + 1;

        if (next < screens.length) {
          setCurrentIndex(nextIndex);
          setNextIndex(next + 1);

          fadeAnim.setValue(0);
          bgAnim.setValue(0);

          Animated.parallel([
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(bgAnim, {
              toValue: 1,
              duration: 400,
              useNativeDriver: false,
            }),
          ]).start();
        } else {
          clearInterval(interval);

          router.replace(onboardingComplete ? "/auth/intro" : "/onboarding");
        }
      });
    }, 2400); // show each screen for 2s total (including fade time)

    return () => clearInterval(interval);
  }, [currentIndex]);

  const ScreenComponent = screens[currentIndex];

  const interpolatedBg = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      colors[currentIndex],
      colors[nextIndex] || colors[currentIndex],
    ],
  });

  return (
    <Animated.View
      style={[styles.container, { backgroundColor: interpolatedBg }]}
    >
      <Animated.View style={[styles.screen, { opacity: fadeAnim }]}>
        <ScreenComponent />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
});
