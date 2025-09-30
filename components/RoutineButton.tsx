import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/utils/colors";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { usePathname, useRouter } from "expo-router";

export const RoutineButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === "/routine";

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/routine");
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.85}
        style={styles.button}
        className="bg-main shadow-none"
      >
        <View className="bg-white rounded-full p-2">
          <Feather size={32} name="book-open" color={colors.main} />
        </View>
      </TouchableOpacity>
      <Text
        className={`text-center text-white mt-2 text-sm${isActive ? " pb-0" : " pb-2"}`}
      >
        Routine
      </Text>
      {isActive && (
        <View className="mt-0.5 w-5 h-0.5 bg-white rounded-[1px] mb-2" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 12, // distance from bottom tab bar
    left: "50%",
    transform: [{ translateX: -35 }],
    zIndex: 10,
    alignItems: "center",
  },
  button: {
    // backgroundColor: "#FFF",
    borderRadius: 70,
    width: 70,
    height: 70,
    justifyContent: "center",
    paddingVertical: 10,
    alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
    elevation: 5,
  },
});
