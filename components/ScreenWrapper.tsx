import { colors } from "@/utils/colors";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation, useRouter, useSegments } from "expo-router";
import { BookOpen } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { RoutineButton } from "./RoutineButton";

type TabName = "home" | "library" | "routine" | "chat";

interface ScreenWrapperProps {
  children: React.ReactNode;
  activeTab?: string;
}

const TAB_ICON_COLOR = "#FFF";
const TAB_ICON_SIZE = 28;

const ScreenWrapper = ({ children, activeTab }: ScreenWrapperProps) => {
  const navigation = useNavigation();
  const router = useRouter();
  const segments = useSegments();
  const active = segments[segments.length - 1];

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
      <Feather size={28} name="menu" color={TAB_ICON_COLOR} />
      <Text style={{ color: TAB_ICON_COLOR, fontSize: 12, marginTop: 2 }}>
        Menu
      </Text>
    </TouchableOpacity>
  );

  const TabButton = ({
    name,
    title,
    icon,
  }: {
    name: TabName;
    title: string;
    icon: React.ReactNode;
  }) => {
    const isActive = active === name;

    return (
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 20,
        }}
        onPress={() =>
          router.push(
            name === "home" ? "/(drawer)/(tabs)" : `/(drawer)/(tabs)/${name}`
          )
        }
      >
        {icon}
        <Text
          style={{
            color: TAB_ICON_COLOR,
            fontSize: 12,
            marginTop: 2,
            fontWeight: isActive ? "bold" : "normal",
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Main content */}
      <View style={{ flex: 1 }}>{children}</View>

      {/* Tab bar */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: colors.main,
          height: 80,
          paddingBottom: 20,
        }}
      >
        <TabButton
          name="home"
          title="Home"
          icon={
            <FontAwesome
              size={TAB_ICON_SIZE}
              name="home"
              color={TAB_ICON_COLOR}
            />
          }
        />
        <TabButton
          name="library"
          title="Library"
          icon={<BookOpen size={TAB_ICON_SIZE} color={TAB_ICON_COLOR} />}
        />
        {/* <TabButton
          name="routine"
          title="Routine"
          icon={
            <Feather
              size={TAB_ICON_SIZE}
              name="book-open"
              color={TAB_ICON_COLOR}
            />
          }
          onPress={() => router.push("/(drawer)/(tabs)/routine")}
          isActive={activeTab === "routine"}
        /> */}
        <View className="flex-1" />
        {/* Left cutout - using background color to create the curve */}
        {/* <View
          style={{
            position: "absolute",
            top: -30,
            left: "50%",
            transform: [{ translateX: -62 }],
            width: 30,
            height: 30,
            backgroundColor: colors.custom["100"], // Use your screen background color
            // backgroundColor: "red", // Use your screen background color
            borderRadius: 15,
            zIndex: 5,
          }}
        /> */}

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

        <TabButton
          name="chat"
          title="Chat"
          icon={
            <MaterialIcons
              size={TAB_ICON_SIZE}
              name="chat-bubble-outline"
              color={TAB_ICON_COLOR}
            />
          }
        />
        <MenuButton />
      </View>
      <RoutineButton />
    </View>
  );
};

export default ScreenWrapper;
