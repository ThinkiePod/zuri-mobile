import {
  Feather,
  FontAwesome,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

interface ScreenWrapperProps {
  children: React.ReactNode;
  activeTab?: string;
}

const ScreenWrapper = ({ children, activeTab }: ScreenWrapperProps) => {
  const navigation = useNavigation();
  const router = useRouter();

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

  const TabButton = ({
    name,
    title,
    icon,
    onPress,
    isActive,
  }: {
    name: string;
    title: string;
    icon: React.ReactNode;
    onPress: () => void;
    isActive: boolean;
  }) => (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
      }}
      onPress={onPress}
    >
      {icon}
      <Text
        style={{
          color: "#FFF",
          fontSize: 12,
          marginTop: 2,
          fontWeight: isActive ? "bold" : "normal",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Main content */}
      <View style={{ flex: 1 }}>{children}</View>

      {/* Tab bar */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#A367B8",
          height: 80,
          paddingBottom: 20,
        }}
      >
        <TabButton
          name="home"
          title="Home"
          icon={<FontAwesome size={28} name="home" color="#FFF" />}
          onPress={() => router.push("/(drawer)/(tabs)")}
          isActive={activeTab === "home"}
        />
        <TabButton
          name="insight"
          title="Insight"
          icon={<FontAwesome6 size={28} name="chart-line" color="#FFF" />}
          onPress={() => router.push("/(drawer)/(tabs)/insight")}
          isActive={activeTab === "insight"}
        />
        <TabButton
          name="routine"
          title="Routine"
          icon={<Feather size={28} name="book-open" color="#FFF" />}
          onPress={() => router.push("/(drawer)/(tabs)/routine")}
          isActive={activeTab === "routine"}
        />
        <TabButton
          name="chat"
          title="Chat"
          icon={
            <MaterialIcons size={28} name="chat-bubble-outline" color="#FFF" />
          }
          onPress={() => router.push("/(drawer)/(tabs)/chat")}
          isActive={activeTab === "profile"}
        />
        <MenuButton />
      </View>
    </View>
  );
};

export default ScreenWrapper;
