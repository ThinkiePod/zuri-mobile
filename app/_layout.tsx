// app/_layout.tsx

import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          {/* <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          /> */}
          <Stack.Screen
            name="(drawer)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="onboarding/child-profile"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="onboarding/index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}
