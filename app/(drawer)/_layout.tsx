// app/(drawer)/drawer.tsx
import { colors } from "@/utils/colors";
import {
  AntDesign,
  Feather,
  FontAwesome6,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

const drawerColors = {
  100: "#FFF",
  200: "#666",
  300: "#333",
};

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const drawerStatus = useDrawerStatus();

  return (
    <>
      <StatusBar style={drawerStatus === "open" ? "light" : "dark"} />
      <View
        style={{
          opacity: 0.9,
        }}
        className={`justify-end pb-3 px-4 h-[140px] w-[${width}px] bg-main`}
      >
        <View className="flex-row items-center">
          <Pressable
            className="flex-[20%]"
            onPress={() => {
              props.navigation.closeDrawer();
            }}
          >
            <AntDesign name="closecircleo" size={24} color="white" />
          </Pressable>
          <Text className="text-white text-[24px] font-poppins-medium flex-[80%]">
            Zuri is sleeping
          </Text>
        </View>
      </View>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 4 }}
      >
        {props.state.routes.map((route, index) => {
          if (route.name === "(tabs)") return null;

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
                  : drawerColors["100"],
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
                      ? options.drawerActiveTintColor || colors.main
                      : options.drawerInactiveTintColor || drawerColors["200"],
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
                    ? options.drawerActiveTintColor || colors.main
                    : options.drawerInactiveTintColor || drawerColors["200"],
                }}
              >
                {typeof options.drawerLabel === "function"
                  ? options.drawerLabel({
                      color: drawerColors["300"],
                      focused: isFocused,
                    })
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
          drawerActiveTintColor: colors.main,
          drawerStyle: {
            width: width,
            backgroundColor: colors.custom["100"],
          },
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: "bold",
          },
        }}
      >
        {/* <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: () => null,
            title: "Home",
            swipeEnabled: false,
            // drawerIcon: ({ color }) => (
            //   <FontAwesome size={28} name="home" color={color} />
            // ),
            // drawerItemStyle: { height: 0, overflow: "hidden" },
          }}
        /> */}
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
        <Drawer.Screen
          name="insight"
          options={{
            drawerLabel: "Insight",
            title: "Insight",
            drawerIcon: ({ color }) => (
              <FontAwesome6 size={28} name="chart-line" color={color} />
            ),
          }}
        />

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
              <MaterialIcons
                size={28}
                name="dashboard-customize"
                color={color}
              />
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
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
