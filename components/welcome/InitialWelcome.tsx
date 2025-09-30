import { assets } from "@/utils/images";
import { scaleFont } from "@/utils/utils";
import { StatusBar } from "expo-status-bar";
import { Dimensions, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export const InitialWelcomeScreen = () => {
  return (
    // <SafeAreaView className="bg-main flex-1 p-6 pt-20">
    <SafeAreaView className="bg-transparent flex-1 p-6 pt-20">
      <StatusBar style="light" />
      <View className="items-start mb-12">
        <Text
          className="font-inter-bold text-white mb-2"
          style={[{ fontSize: scaleFont(52, width) }]}
        >
          Zuri is Ready
        </Text>
        <Text
          className="font-inter-bold text-white"
          style={[{ fontSize: scaleFont(44, width) }]}
        >
          When you are!
        </Text>
      </View>

      <View className="w-full h-[400px] items-center justify-center p-2 rounded-xl">
        <Image
          source={assets.image.zuriGrey}
          className="size-full"
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};
