import ScreenWrapper from "@/components/ScreenWrapper";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PrivacyConsentScreen = () => {
  return (
    <ScreenWrapper>
      <SafeAreaView className="flex-1 bg-custom-100 h-full">
        <Text>PrivacyConsentScreen</Text>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default PrivacyConsentScreen;
