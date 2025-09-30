import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// import DatePicker from "react-native-date-picker";
import { MainView } from "@/components/CreateAccountMainView";
import { useKeyboard } from "@/hooks/useKeyboard";
import { colors } from "@/utils/colors";
import { placeholderColor } from "@/utils/constants";
import { assets } from "@/utils/images";
import cn from "clsx";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomizationScreen from "./customization";

const CreateAccountScreen = () => {
  const router = useRouter();
  const { keyboardOpen } = useKeyboard();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  // const [date, setDate] = useState(new Date());

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/auth/child-avatar");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
      case 3:
        return (
          <View>
            <MainView formData={formData} setFormData={setFormData} />
            {currentStep === 3 && (
              <Text className="font-inter-regular text-xl">
                By signing up, you agree to our{" "}
                <Text className="text-blue-500">
                  <Link href="/" className="text-blue-500">
                    Terms
                  </Link>
                </Text>
                ,{" "}
                <Text className="text-blue-500">
                  <Link href="/" className="text-blue-500">
                    Privacy Policy
                  </Link>{" "}
                </Text>
                and{" "}
                <Text className="text-blue-500">
                  <Link href="/" className="text-blue-500">
                    Cookie use
                  </Link>
                </Text>
                . App may use your contact information including your email
                address and phone number for purposes outlined in our Privacy
                Policy. <Text className="text-blue-500">Learn more</Text>
              </Text>
            )}
          </View>
        );
      case 2:
        return <CustomizationScreen />;
      case 4:
        return (
          <View className="mb-10">
            <Text className="text-xl text-center mb-6 font-inter-regular">
              Make sure it&apos;s 8 characters or more
            </Text>
            <View className="flex-row items-center rounded-lg border border-main">
              {formData.password && (
                <Text className="absolute px-2 text-main z-[999] bg-custom-100 -top-[6px] left-[20px] text-sm">
                  Password
                </Text>
              )}
              <TextInput
                className="flex-1 h-[50px] px-4 text-base font-inter-regular text-gray-900"
                value={formData.password}
                onChangeText={(text) =>
                  setFormData({ ...formData, password: text })
                }
                placeholder="Password"
                placeholderTextColor={placeholderColor}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                className="p-3.5"
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} color={colors.main} />
                ) : (
                  <Eye size={20} color={colors.main} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-custom-100 -pb">
      <StatusBar style={Platform.OS === "android" ? "dark" : "auto"} />

      <KeyboardAvoidingView
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : Platform.OS === "android" && keyboardOpen
              ? "height"
              : undefined
        }
        style={{
          flex: 1,
        }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 10}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
          }}
        >
          <View className="items-center mb-12">
            <Image source={assets.image.logoThin} className="size-32" />
          </View>
          <Text
            className={cn(
              "text-3xl text-center font-inter-bold mb-10",
              currentStep === 4 && "mb-2"
            )}
          >
            {currentStep === 2
              ? "Customize your experience"
              : currentStep === 4
                ? "You'll need a password"
                : "Create your account"}
          </Text>

          <View style={{ flex: 1 }}>{renderStep()}</View>

          <TouchableOpacity
            className="h-[50px] bg-main mt-6 rounded-3xl items-center justify-center"
            onPress={handleNext}
          >
            <Text className="text-lg font-inter-semibold text-white">Next</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* </View> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateAccountScreen;
