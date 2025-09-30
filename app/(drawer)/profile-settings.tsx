import SuccessScreen from "@/components/library/SuccessScreen";
import ScreenWrapper from "@/components/ScreenWrapper";

// import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileSettingsScreen = () => {
  return (
    <ScreenWrapper>
      <SafeAreaView className="flex-1 bg-custom-100 h-full">
        {/* <Text>ProfileSettingsScreen</Text> */}
        <SuccessScreen />
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default ProfileSettingsScreen;
