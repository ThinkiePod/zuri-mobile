import { CustomDropdown } from "@/components/CustomDropdown";
import { useKeyboard } from "@/hooks/useKeyboard";
import { ageRanges, MAIN, placeholderColor } from "@/utils/constants";
import { assets } from "@/utils/images";
import { FontAwesome } from "@expo/vector-icons";

import cn from "clsx";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
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
import { SafeAreaView } from "react-native-safe-area-context";

const ChildProfileScreen = () => {
  const router = useRouter();
  const { keyboardOpen } = useKeyboard();

  const [childName, setChildName] = useState("");
  const [childUserName, setChildUserName] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-custom-100">
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : Platform.OS === "android" && keyboardOpen
              ? "height"
              : undefined
        }
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View className="flex-1">
            <View className="items-center mb-2">
              <Image source={assets.image.logoThin} className="size-32" />
            </View>
            <View className="flex-1 p-6">
              <Text className="text-3xl mb-2 font-inter-bold text-center">
                Create your child&apos;s Profile
              </Text>
              <Text className="text-xl mb-8 font-poppins-regular text-center">
                Your username is unique. You can always change it later.
              </Text>

              <View className="mb-8 mt-8">
                <Text
                  className={cn(
                    "absolute px-2 text-main z-[999] bg-custom-100",
                    childName
                      ? "-top-[6px] left-[20px] text-sm"
                      : "-top-[30px] text-lg font-inter-medium"
                  )}
                >
                  Name
                </Text>

                <View className="flex-row items-center border border-main rounded-lg">
                  <TextInput
                    className="flex-1 h-[50px] px-4 text-base font-inter-regular"
                    value={childName}
                    onChangeText={setChildName}
                    placeholder="Child's name"
                    placeholderTextColor={placeholderColor}
                  />
                  {childName.trim() !== "" && (
                    <View className="p-3">
                      <FontAwesome name="check-circle" size={20} color={MAIN} />
                    </View>
                  )}
                </View>
              </View>

              <View className={cn("mb-8", !childUserName && "mt-8")}>
                <Text
                  className={cn(
                    "absolute px-2 text-main z-[999] bg-custom-100",
                    childUserName
                      ? "-top-[6px] left-[20px] text-sm"
                      : "-top-[30px] text-lg font-inter-medium"
                  )}
                >
                  Username
                </Text>
                <View className="flex-row items-center border border-main rounded-lg">
                  <TextInput
                    className="flex-1 h-[50px] px-4 text-base font-inter-regular"
                    value={childUserName}
                    onChangeText={setChildUserName}
                    placeholder="Unique username"
                    placeholderTextColor={placeholderColor}
                  />
                  {childUserName.trim() !== "" && (
                    <View className="p-3">
                      <FontAwesome name="check-circle" size={20} color={MAIN} />
                    </View>
                  )}
                </View>
              </View>

              <CustomDropdown
                label="Age"
                data={ageRanges}
                labelState="allStateLabel"
                showLeftIcon
              />
            </View>
          </View>
          <View className="flex-row gap-3 px-6">
            <TouchableOpacity
              className="bg-main h-[50px] rounded-[25px] items-center justify-center flex-1"
              onPress={() => router.push("/auth/notifications")}
            >
              <Text className="text-white text-base font-inter-semibold">
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChildProfileScreen;
