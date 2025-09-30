import { assets } from "@/utils/images";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NotificationsScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="bg-custom-100 flex-1">
      <StatusBar style="dark" />

      <View className="flex-1 justify-between items-center p-6">
        <View>
          <Pressable onPress={() => router.push("/auth/interest")}>
            <Text className="absolute right-2 font-poppins-regular text-main underline">
              Skip
            </Text>
          </Pressable>
          <View className="mb-8 items-center">
            <Image source={assets.image.logoThin} className="size-32" />
            <Text className="text-3xl text-center mb-4 font-inter-bold">
              Turn on notifications
            </Text>
            <Text className="text-xl text-center mb-10 font-poppins-regular">
              Get the most out of the app by signing up to date with what&apos;s
              happening
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="bg-main h-[50px] rounded-[25px] items-center justify-center w-full"
          onPress={() => router.push("/auth/interest")}
        >
          <Text className="text-lg text-white font-inter-semibold">
            Allow Notifications
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NotificationsScreen;
