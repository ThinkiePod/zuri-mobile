// app/(tabs)/_layout.tsx

import {
  Feather,
  FontAwesome,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { Tabs, useNavigation } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

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
          backgroundColor: "#A367B8",
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
      }}
      tabBar={(props) => {
        const { state, descriptors, navigation } = props;

        return (
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#A367B8",
              height: 80,
              paddingBottom: 20,
            }}
          >
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const label = options.tabBarLabel || options.title || route.name;
              const isFocused = state.index === index;

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
                    {label as string}
                  </Text>
                </TouchableOpacity>
              );
            })}
            <MenuButton />
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
        name="insight"
        options={{
          title: "Insight",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={28} name="chart-line" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="routine"
        options={{
          title: "Routine",
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="book-open" color={color} />
          ),
        }}
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
    </Tabs>
  );
};

export default TabLayout;
