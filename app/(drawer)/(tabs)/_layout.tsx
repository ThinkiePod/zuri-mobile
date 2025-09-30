// app/(tabs)/_layout.tsx

import { HapticTab } from "@/components/HapticTab";
import { RoutineButton } from "@/components/RoutineButton";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { Tabs, useNavigation } from "expo-router";
import { BookOpen } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../utils/colors";

const TabLayout = () => {
  const navigation = useNavigation();

  const MenuButton = () => (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
      }}
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
    >
      <Feather size={28} name="menu" color="#FFF" />
      <Text style={{ color: "#FFF", fontSize: 12, marginTop: 2 }}>Menu</Text>
    </TouchableOpacity>
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFF",
        tabBarInactiveTintColor: "#FFF",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.main,
        },
        tabBarButton: HapticTab,
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
        // animation: "shift",
      }}
      tabBar={(props) => {
        const { state, descriptors, navigation } = props;

        return (
          <View className="relative">
            <View
              style={{
                flexDirection: "row",
                backgroundColor: colors.main,
                height: 80,
                // paddingBottom: 20,
                position: "relative",
              }}
            >
              {/* Main tab bar background with cutout */}
              {/* <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 80,
                  backgroundColor: "#A367B8",
                }}
              /> */}

              {/* Left cutout */}
              <View
                style={{
                  position: "absolute",
                  top: -15,
                  left: "50%",
                  transform: [{ translateX: -62 }],
                  width: 30,
                  height: 15, // Half height for bottom half
                  backgroundColor: colors.custom["100"],
                  borderBottomLeftRadius: 30,
                  borderBottomRightRadius: 30,
                  zIndex: 5,
                }}
              />

              {/* Right cutout */}
              <View
                style={{
                  position: "absolute",
                  top: -15,
                  left: "50%",
                  transform: [{ translateX: 32 }],
                  width: 30,
                  height: 15,
                  backgroundColor: colors.custom["100"],
                  borderBottomLeftRadius: 30,
                  borderBottomRightRadius: 30,
                  zIndex: 5,
                }}
              />

              {/* Center raised section */}
              <View
                style={{
                  position: "absolute",
                  top: -20,
                  left: "50%",
                  transform: [{ translateX: -50 }],
                  width: 100,
                  height: 40,
                  backgroundColor: colors.main,
                  borderTopLeftRadius: 50,
                  borderTopRightRadius: 50,
                  zIndex: 3,
                }}
              />

              {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;
                const label =
                  typeof options.tabBarLabel === "function"
                    ? options.tabBarLabel({
                        color: "#FFF",
                        focused: isFocused,
                        position: options.tabBarLabelPosition ?? "below-icon",
                        children: "",
                      })
                    : options.tabBarLabel || options.title || route.name;

                const onPress = () => {
                  const event = navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                  });

                  if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                  }
                };

                // Optional: Hide the "routine" tab if you're floating it
                if (route.name === "routine") {
                  return <View key="routine-spacer" className="flex-1" />;
                }

                if (["content/[id]", "add-child"].includes(route.name))
                  return null;

                return (
                  <TouchableOpacity
                    key={route.key}
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingVertical: 10,
                    }}
                    onPress={onPress}
                  >
                    {options.tabBarIcon &&
                      options.tabBarIcon({
                        color: isFocused ? "#FFF" : "#FFF",
                        focused: isFocused,
                        size: 28,
                      })}
                    <Text
                      style={{
                        color: isFocused ? "#FFF" : "#FFF",
                        fontSize: 12,
                        marginTop: 2,
                      }}
                    >
                      {label}
                    </Text>
                    {isFocused && (
                      <View
                        style={{
                          width: 20,
                          height: 2,
                          backgroundColor: "#FFF",
                          marginTop: 4,
                          borderRadius: 1,
                        }}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
              <MenuButton />
            </View>
            <RoutineButton />
          </View>
        );
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarIcon: ({ size, color }) => (
            <BookOpen size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="routine"
        options={{
          title: "Routine",
          // tabBarIcon: ({ color }) => (
          //   <Feather size={28} name="book-open" color={color} />
          // ),
          // tabBarButton: RoutineButton,
          tabBarLabelStyle: {
            display: "none",
          },
        }}
        // listeners={{
        //   tabPress: (e) => {
        //     e.preventDefault();
        //   },
        // }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="chat-bubble-outline" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="content/[id]"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="add-child"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
