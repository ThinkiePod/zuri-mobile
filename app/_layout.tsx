// app/_layout.tsx

import { AppProvider } from "@/context/AppContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { useFrameworkReady } from "@/hooks/useFrameworkReady";
import { tokenCache } from "@/lib/clerk";
import { ClerkProvider } from "@clerk/clerk-expo";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import {
  WorkSans_400Regular,
  WorkSans_500Medium,
  WorkSans_600SemiBold,
  WorkSans_700Bold,
  WorkSans_900Black,
} from "@expo-google-fonts/work-sans";
import { Stack, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "../global.css";

const onBoardingComplete = true;
const isLoggedIn = true;

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  // const [showSplashScreen, setShowSplashScreen] = useState(true);

  const pathname = usePathname();

  const [fontsLoaded] = useFonts({
    // Inter
    "Inter-Regular": Inter_400Regular,
    "Inter-Medium": Inter_500Medium,
    "Inter-SemiBold": Inter_600SemiBold,
    "Inter-Bold": Inter_700Bold,

    // Poppins
    "Poppins-Light": Poppins_300Light,
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-Medium": Poppins_500Medium,
    "Poppins-Semibold": Poppins_600SemiBold,
    "Poppins-Bold": Poppins_700Bold,

    // WorkSans
    "WorkSans-Regular": WorkSans_400Regular,
    "WorkSans-Medium": WorkSans_500Medium,
    "WorkSans-Semibold": WorkSans_600SemiBold,
    "WorkSans-Bold": WorkSans_700Bold,
    "WorkSans-Black": WorkSans_900Black,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setShowSplashScreen(false);
  //   }, 3000);

  //   return () => clearTimeout(timeout);
  // }, []);

  if (!fontsLoaded) return null;

  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <ThemeProvider>
        <AppProvider>
          {/* {showSplashScreen ? (
            <WelcomeCarousel onboardingComplete={onBoardingComplete} />
          ) : (
          )} */}
          <StatusBar
            style={pathname.startsWith("/content/") ? "light" : "dark"}
          />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { zIndex: 10 },
            }}
          >
            <Stack.Protected guard={!isLoggedIn}>
              <Stack.Screen name="welcome" />
              <Stack.Protected guard={!onBoardingComplete}>
                <Stack.Screen name="onboarding" />
              </Stack.Protected>
              <Stack.Screen name="auth" />
            </Stack.Protected>

            <Stack.Protected guard={isLoggedIn}>
              {/* <Stack.Screen name="(tabs)" /> */}
              <Stack.Screen name="(drawer)" />
            </Stack.Protected>
            <Stack.Screen name="+not-found" />
          </Stack>
        </AppProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}
