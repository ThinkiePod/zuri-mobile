// app/(drawer)/_layout.tsx
import {
  Feather,
  FontAwesome,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const drawerStatus = useDrawerStatus();

  return (
    <>
      <StatusBar style={drawerStatus === "open" ? "light" : "auto"} />
      <View
        style={{
          backgroundColor: "#A367B8",
          opacity: 0.9,
          flex: 0.2,
          width: width,
        }}
      />
      <DrawerContentScrollView {...props}>
        {props.state.routes.map((route, index) => {
          const { options } = props.descriptors[route.key];
          const isFocused = props.state.index === index;

          return (
            <TouchableOpacity
              key={route.key}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: isFocused
                  ? "rgba(163, 103, 184, 0.3)"
                  : "#FFF",
                borderRadius: 12,
                paddingVertical: 16,
                paddingHorizontal: 16,
                marginVertical: 4,
              }}
              onPress={() => props.navigation.navigate(route.name)}
            >
              <View style={{ width: 32, alignItems: "center" }}>
                {options.drawerIcon &&
                  options.drawerIcon({
                    color: isFocused
                      ? options.drawerActiveTintColor || "#A367B8"
                      : options.drawerInactiveTintColor || "#666",
                    size: 24,
                    focused: isFocused,
                  })}
              </View>
              <Text
                style={{
                  marginLeft: 12,
                  fontSize: 16,
                  fontWeight: "bold",
                  color: isFocused
                    ? options.drawerActiveTintColor || "#A367B8"
                    : options.drawerInactiveTintColor || "#666",
                }}
              >
                {typeof options.drawerLabel === "function"
                  ? options.drawerLabel({ color: "#333", focused: isFocused })
                  : options.drawerLabel || options.title || route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </DrawerContentScrollView>
    </>
  );
};

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          headerShown: false,
          drawerPosition: "right",
          drawerType: "front",
          drawerActiveTintColor: "#A367B8",
          drawerStyle: {
            width: width,
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
          name="record"
          options={{
            drawerLabel: "Record",
            title: "Record",
            drawerIcon: ({ color }) => (
              <Feather size={28} name="mic" color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="account"
          options={{
            drawerLabel: "My Account",
            title: "Account",
            drawerIcon: ({ color }) => (
              <Feather size={28} name="user" color={color} />
            ),
          }}
        />
        {/* <Drawer.Screen
          name="(tabs)/insight.tsx"
          options={{
            drawerLabel: "Insight",
            title: "Insight",
            drawerIcon: ({ color }) => (
              <FontAwesome6 size={28} name="chart-line" color={color} />
            ),
          }}
        /> */}
        <Drawer.Screen
          name="parental-control"
          options={{
            drawerLabel: "Parental Control",
            title: "Parental Control",
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons
                size={28}
                name="account-supervisor-circle-outline"
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
            drawerIcon: ({ color }) => (
              <Ionicons size={28} name="settings-outline" color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="library"
          options={{
            drawerLabel: "Library",
            title: "Library",
            drawerIcon: ({ color }) => (
              <Ionicons size={28} name="library-outline" color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="profile-settings"
          options={{
            drawerLabel: "Multiple Profile",
            drawerIcon: ({ color }) => (
              <Ionicons size={24} name="people-outline" color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="language-settings"
          options={{
            drawerLabel: "Language Settings",
            drawerIcon: ({ color }) => (
              <Fontisto size={24} name="world-o" color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="notification-center"
          options={{
            drawerLabel: "Notification Center",
            drawerIcon: ({ color }) => (
              <Feather size={24} name="bell" color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="customize"
          options={{
            drawerLabel: "Customization",
            drawerIcon: ({ color }) => (
              <Ionicons size={28} name="settings-outline" color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="privacy-consent"
          options={{
            drawerLabel: "Privacy & Consent",
            drawerIcon: ({ color }) => (
              <SimpleLineIcons size={28} name="lock" color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="feedback"
          options={{
            drawerLabel: "Feedback & Help",
            drawerIcon: ({ color }) => (
              <SimpleLineIcons size={28} name="question" color={color} />
            ),
            drawerStyle: {
              display: "none",
            },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
