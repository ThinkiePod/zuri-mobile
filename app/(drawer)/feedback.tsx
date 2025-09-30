import ScreenWrapper from "@/components/ScreenWrapper";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FeedbackScreen = () => {
  return (
    <ScreenWrapper>
      <SafeAreaView className="flex-1 bg-custom-100 h-full">
        <Text>FeedbackScreen</Text>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default FeedbackScreen;
