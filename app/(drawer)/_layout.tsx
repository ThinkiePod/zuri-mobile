// app/(drawer)/_layout.tsx
import {
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: "#A367B8",
          drawerHideStatusBarOnOpen: true,
          drawerStyle: {
            backgroundColor: "#F4EDF8",
          },
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: "bold",
          },
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Home",
            title: "Home",
            drawerIcon: ({ color }) => (
              <FontAwesome size={28} name="home" color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="library"
          options={{
            drawerLabel: "Library",
            title: "Library",
            drawerIcon: ({ color }) => (
              <Ionicons size={28} name="library" color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="customize"
          options={{
            drawerLabel: "Customize",
            drawerIcon: ({ color }) => (
              <MaterialIcons
                size={28}
                name="dashboard-customize"
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="onboarding/index"
          options={{
            drawerLabel: "Onboarding",
            drawerIcon: ({ color }) => (
              <FontAwesome5 size={28} name="handshake" color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="onboarding/child-profile"
          options={{
            drawerLabel: "Child Profile",
            drawerIcon: ({ color }) => (
              <FontAwesome6 size={28} name="child" color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
            drawerIcon: ({ color }) => (
              <MaterialIcons size={28} name="settings" color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
