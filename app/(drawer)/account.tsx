import ScreenWrapper from "@/components/ScreenWrapper";
import { colors } from "@/utils/colors";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const AccountScreen = () => {
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
          <Text className="text-2xl font-bold text-gray-800 text-center">
            My Account
          </Text>
        </View>

        <ScrollView className="px-5" showsVerticalScrollIndicator={false}>
          {/* Profile Section */}
          <View className="mb-8">
            <View className="flex-row items-center p-4 bg-custom-600 rounded-lg mb-3">
              <MaterialIcons
                name="person"
                size={24}
                color={colors.misc["100"]}
              />
              <View className="ml-3 flex-1">
                <Text className="text-base font-medium text-gray-800">
                  Brenda
                </Text>
                <Text className="text-sm text-gray-500">
                  {user?.emailAddresses[0]?.emailAddress ||
                    "brenda@example.com"}
                </Text>
              </View>
            </View>

            {/* Child Profile */}
            <View className="mt-6 bg-main p-2 rounded-xl">
              <Text className="text-xl font-medium text-white mb-3">
                Child Profile
              </Text>
              <View className="flex-row items-center p-4 bg-gray-100 rounded-lg mb-3">
                <MaterialIcons
                  name="child-care"
                  size={24}
                  color={colors.misc["100"]}
                />
                <View className="ml-3 flex-1">
                  <Text className="text-base font-medium text-gray-800">
                    Bembem
                  </Text>
                  <Text className="text-sm text-gray-500">Age 6</Text>
                </View>
                <TouchableOpacity className="rounded-full bg-custom-600 p-2">
                  <FontAwesome name="pencil" size={24} color={colors.main} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                className="flex-row items-center py-4 px-4 bg-white rounded-lg"
                onPress={() => router.push("/add-child")}
              >
                <MaterialIcons
                  name="add-circle"
                  size={32}
                  color={colors.main}
                />
                <Text className="ml-2 text-lg font-medium">
                  Add Another Child
                </Text>
              </TouchableOpacity>
            </View>

            {/* Subscription */}
            <View className="mt-6 bg-white p-2 rounded-xl">
              <Text className="text-xl font-medium text-gray-800 mb-3">
                Subscription
              </Text>
              <View className="flex-row justify-between items-center p-4 bg-main rounded-lg">
                <Text className="text-lg font-medium text-white">
                  Standard Plan
                </Text>
                <TouchableOpacity className="rounded-xl bg-white px-4 py-2">
                  <Text className="text-sm">Manage Subscription</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Menu Items */}
          <View className="bg-gray-100 rounded-xl px-2 py-1 mb-8">
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="flex-row items-center py-4 px-3"
                onPress={item.onPress}
              >
                <MaterialIcons
                  name={item.icon as keyof typeof MaterialIcons.glyphMap}
                  size={24}
                  color={colors.misc["100"]}
                />
                <Text className="flex-1 ml-3 text-base text-gray-800">
                  {item.label}
                </Text>
                <MaterialIcons
                  name="chevron-right"
                  size={20}
                  color={colors.misc["200"]}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout */}
          <TouchableOpacity
            className="bg-custom-500 border border-main rounded-lg py-4 items-center mb-8"
            onPress={() => signOut()}
          >
            <Text className="text-main text-xl font-poppins-bold">Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default AccountScreen;
