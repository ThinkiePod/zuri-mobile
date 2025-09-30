import ScreenWrapper from "@/components/ScreenWrapper";
import { colors } from "@/utils/colors";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { Entypo, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsScreen = () => {
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useClerk();

  const menuItems = [
    {
      icon: "chat",
      label: "Chat Box",
      onPress: () => router.push("/(drawer)/(tabs)/chat"),
    },
    { icon: "settings", label: "Parental Control", onPress: () => {} },
    { icon: "settings-applications", label: "Settings", onPress: () => {} },
    { icon: "person-add", label: "Multiple Profile", onPress: () => {} },
    { icon: "language", label: "Language Settings", onPress: () => {} },
    { icon: "notifications", label: "Notification Center", onPress: () => {} },
    { icon: "tune", label: "Customization", onPress: () => {} },
    { icon: "privacy-tip", label: "Privacy & Consent", onPress: () => {} },
    { icon: "help", label: "Feedback & Help", onPress: () => {} },
  ];

  return (
    <ScreenWrapper>
      <SafeAreaView className="flex-1 bg-custom-100">
        <View className="px-5 pt-5 pb-3">
          <Text className="text-3xl font-bold text-gray-800 text-center font-poppins-medium">
            Settings & Support
          </Text>
        </View>

        <ScrollView className="px-5" showsVerticalScrollIndicator={false}>
          <View className="mt-6 bg-white p-2 rounded-xl">
            <Text className="text-xl font-medium text-gray-800 mb-3 font-poppins-medium">
              Device Info & Status
            </Text>
            <View className="bg-main rounded-lg gap-4">
              <View className="border-b border-white pt-2">
                <View className="flex-1 p-2 flex-row items-center justify-between">
                  <Text className="text-lg font-poppins-medium text-white">
                    Battery
                  </Text>
                  <Ionicons name="battery-charging" size={24} color="white" />
                </View>
              </View>

              <View className="border-b border-white">
                <View className="flex-1 p-2 flex-row items-center justify-between">
                  <Text className="text-lg font-poppins-medium text-white">
                    Firmware Version
                  </Text>
                  <Text className="text-lg font-poppins-medium text-white">
                    1.0.3
                  </Text>
                </View>
              </View>

              <View className="border-b border-white">
                <View className="flex-1 p-2 flex-row items-center justify-between">
                  <Text className="text-lg font-poppins-medium text-white">
                    Device Location
                  </Text>
                  <TouchableOpacity>
                    <Text className="text-lg text-white font-poppins-medium underline">
                      Track device
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View className="p-2 flex-row items-center justify-between">
                <Text className="text-lg font-poppins-medium text-white">
                  Last Sync
                </Text>
                <Text className="text-lg font-poppins-medium text-white">
                  Today, 9:20 AM
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity className="rounded-xl bg-white p-4 flex-row items-center justify-between my-3">
            <Text className="text-xl text-main font-poppins-medium">
              Firmware Update
            </Text>
            <Entypo name="chevron-right" size={24} color={colors.main} />
          </TouchableOpacity>

          {/* Menu Items */}
          <View className="bg-main rounded-xl p-2 mb-3">
            <Text className="text-xl font-medium text-white mb-3 font-poppins-medium">
              Help & FAQ
            </Text>

            <TouchableOpacity className="rounded-xl bg-white p-4 flex-row items-center justify-between mb-3">
              <Text className="text-xl font-poppins-medium">
                Contact Support
              </Text>
              <Entypo name="chevron-right" size={24} color={colors.main} />
            </TouchableOpacity>

            <TouchableOpacity className="rounded-xl border border-white p-4 items-center">
              <Text className="text-xl text-white font-poppins-medium">
                Feedback Form
              </Text>
            </TouchableOpacity>
          </View>

          <View className="bg-custom-200 rounded-xl p-2 mb-3">
            <Text className="text-2xl font-medium mb-3 font-poppins-medium">
              Privacy Setting & Data Consent
            </Text>

            <TouchableOpacity className="rounded-xl p-4 flex-row items-center gap-4">
              <FontAwesome6
                name={true ? "square" : "check-square"}
                size={32}
                color={colors.main}
              />
              <Text className="text-xl font-poppins-medium text-gray-700">
                Delete all Data
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="rounded-xl p-4 flex-row items-center gap-4">
              <FontAwesome6
                name={true ? "square" : "check-square"}
                size={32}
                color={colors.main}
              />
              <Text className="text-xl font-poppins-medium text-gray-700">
                Consent Form
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="rounded-xl p-4 flex-row items-center gap-4">
              <FontAwesome6
                name={true ? "square" : "check-square"}
                size={32}
                color={colors.main}
              />
              <Text className="text-xl font-poppins-medium text-gray-700">
                Store recorded data
              </Text>
            </TouchableOpacity>
          </View>

          <View className="bg-custom-500 rounded-xl p-2 mb-3">
            <Text className="text-2xl font-medium mb-3 font-poppins-medium">
              App Feedback
            </Text>

            <View className="bg-main rounded-xl px-2 py-4">
              <TouchableOpacity className="rounded-xl p-4 flex-row items-center justify-between gap-4">
                <Text className="text-xl font-poppins-medium text-white">
                  Report Bug
                </Text>
                <View className="bg-custom-200 rounded-xl px-4 py-2">
                  <Text className="font-poppins-bold text-gray-700">Click</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity className="rounded-xl p-4 flex-row items-center justify-between gap-4">
                <Text className="text-xl font-poppins-medium text-white">
                  Suggest Features
                </Text>
                <View className="bg-custom-200 rounded-xl px-4 py-2">
                  <Text className="font-poppins-bold text-gray-700">Click</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Logout */}
          <View className="items-end mb-8">
            <TouchableOpacity
              className="bg-custom-500 rounded-lg py-4 px-8 items-center border border-main"
              onPress={() => signOut()}
            >
              <Text className="text-main text-xl font-poppins-bold">
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default SettingsScreen;
