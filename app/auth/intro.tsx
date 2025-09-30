import { colors } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const IntroScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-main/90">
      <View className="flex-1 p-6">
        <View className="items-center my-12">
          <Image
            source={require("../../assets/icons/splash-icon-light-thin.png")}
            className="size-32"
          />
        </View>

        <Text className="text-4xl font-inter-bold mb-10 text-center text-white font-bold">
          Let&apos;s get Started
        </Text>

        <View className="mb-6">
          <TouchableOpacity className="h-[50px] rounded-[25px] bg-custom-500 items-center justify-center mb-3 flex-row gap-x-2">
            <Ionicons name="logo-google" size={24} color={colors.main} />
            <Text className="text-lg font-inter-medium text-main">
              Continue with Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="h-[50px] rounded-[25px] bg-custom-500 items-center justify-center mb-3 flex-row gap-x-2">
            <Ionicons name="logo-apple" size={24} color={colors.main} />
            <Text className="text-lg font-inter-medium text-main">
              Continue with Apple
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center my-6">
          <View className="flex-1 h-[2px] opacity-[0.5] bg-white" />
          <Text className="text-lg mx-4 font-inter-regular text-white">or</Text>
          <View className="flex-1 h-[2px] opacity-[0.5] bg-white" />
        </View>

        <TouchableOpacity
          // style={styles.createButton}
          className="bg-custom-500 h-[50px] rounded-[25px] items-center justify-center mb-6 flex-row gap-x-2"
          onPress={() => router.push("/auth/create-account")}
        >
          <Ionicons name="mail" size={24} color={colors.main} />
          <Text className="text-xl font-inter-semibold font-semibold text-main">
            Create Account
          </Text>
        </TouchableOpacity>

        <View className="items-center">
          <Text className="text-lg font-inter-regular text-center mb-24 text-white">
            By signing up, you agree to our Terms, Privacy Policy and Cookie use
          </Text>
          <TouchableOpacity onPress={() => router.push("/auth/login")}>
            <Text className="text-lg font-inter-medium text-white">
              Have an account already?{" "}
              <Text className="text-lg font-inter-medium text-amber-200 underline">
                Log In
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default IntroScreen;
