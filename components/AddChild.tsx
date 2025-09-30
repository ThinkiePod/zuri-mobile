import { colors } from "@/utils/colors";
import { ageRanges, placeholderColor } from "@/utils/constants";
import { assets } from "@/utils/images";
import { avataaars, dylan, lorelei } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import cn from "clsx";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomDropdown } from "./CustomDropdown";

type AvatarStyle = typeof lorelei | typeof dylan | typeof avataaars;

const generateAvatars = (seed: string) => {
  const styles: AvatarStyle[] = [lorelei, dylan, avataaars];
  const selectedStyle = styles[
    Math.floor(Math.random() * styles.length)
  ] as any;

  return createAvatar(selectedStyle, {
    seed,
    scale: selectedStyle !== lorelei ? 50 : 80,
    radius: selectedStyle === dylan ? 50 : 0,
  }).toString();
};

const avatars = [
  { id: 1, icon: generateAvatars("👦") },
  { id: 2, icon: generateAvatars("👧") },
  { id: 3, icon: generateAvatars("🧒") },
  { id: 4, icon: generateAvatars("👶") },
  { id: 5, icon: generateAvatars("🧑") },
  { id: 6, icon: generateAvatars("👦") },
  { id: 7, icon: generateAvatars("👧") },
  { id: 8, icon: generateAvatars("🧒") },
];

const interestTags = [
  "Reading",
  "Math",
  "Science",
  "Music",
  "Animals",
  "Sports",
  "Art",
  "Cooking",
  "Games",
  "Nature",
];

const AddChildProfile = () => {
  const router = useRouter();
  const [childName, setChildName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    await ImagePicker.requestCameraPermissionsAsync();

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-custom-100">
      <StatusBar style="dark" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-end mb-4">
          <TouchableOpacity onPress={() => router.push("/account")}>
            <MaterialIcons name="arrow-back" size={24} color={colors.main} />
          </TouchableOpacity>
          <Text className="text-3xl font-bold">Add A Child</Text>
          <View className="w-6" />
        </View>

        <View className="mb-3 bg-custom-400 rounded-xl p-4">
          <Text className="mb-3 font-inter-medium text-xl text-main">Name</Text>
          <TextInput
            className="h-[50px] border border-main font-inter-regular rounded-lg px-4 text-lg"
            value={childName}
            onChangeText={setChildName}
            placeholder="Child's name"
            placeholderTextColor={placeholderColor}
          />
        </View>

        <View className="mb-3 bg-custom-400 rounded-xl p-4">
          <CustomDropdown
            label="Age"
            data={ageRanges}
            labelState="emptyStateLabel"
            className="bg-transparent"
          />
        </View>

        <View className="mb-8 bg-main rounded-xl p-4">
          <Text className="text-white text-xl font-inter-medium mb-2">
            Avatar
          </Text>
          <View className="flex-row gap-4">
            <View className="justify-center">
              <TouchableOpacity
                className={cn(
                  "bg-custom-400 rounded-xl items-center justify-center p-8 size-[80px]",
                  selectedAvatar && "bg-transparent"
                )}
                onPress={pickImage}
              >
                {image ? (
                  <Image
                    source={{ uri: image }}
                    className="size-[80px] rounded-xl"
                    resizeMode="cover"
                  />
                ) : selectedAvatar ? (
                  <Image
                    source={
                      assets.avatar[
                        selectedAvatar as keyof typeof assets.avatar
                      ]
                    }
                    alt={selectedAvatar}
                    className="size-[90px] rounded-xl"
                    resizeMode="cover"
                  />
                ) : (
                  <AntDesign name="plus" color={colors.main} size={28} />
                )}
              </TouchableOpacity>
            </View>
            <View className="flex-1 flex-row flex-wrap gap-2">
              {avatars.map((avatar) => {
                const avatarName =
                  `avatar${avatar.id}` as keyof typeof assets.avatar;
                return (
                  <TouchableOpacity
                    key={avatar.id}
                    className={cn(
                      "size-16 rounded-full bg-[#f8f9fa] items-center justify-center border-2 border-transparent",
                      selectedAvatar === avatarName &&
                        "border-[#007AFF] bg-[#e3f2fd] size-20"
                    )}
                    onPress={() => {
                      setSelectedAvatar(avatarName);
                      setImage(null);
                    }}
                  >
                    <Image
                      source={assets.avatar[avatarName]}
                      alt={avatar.icon}
                      className="size-full"
                    />
                    {/* <Text className="text-2xl">
                    <SvgXml xml={avatar.icon} />
                  </Text> */}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        <View className="mb-8 bg-custom-400 rounded-xl p-4">
          <Text className="text-main text-lg mb-3 font-inter-medium">
            Learning Level (optional)
          </Text>
          <TextInput
            // style={styles.input}
            className="h-[50px] border border-main text-lg px-4 rounded-lg font-inter-regular"
            placeholder="Select level (pre-k, k, etc.)"
            placeholderTextColor={placeholderColor}
          />
        </View>

        <View className="mb-5">
          <Text className="mb-3 text-xl font-poppins-medium">
            Interest Tags
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {interestTags.map((tag) => (
              <TouchableOpacity
                key={tag}
                className={cn(
                  "px-4 py-2 rounded-2xl bg-summary-700 border border-summary-800"
                )}
                // style={[
                //   styles.tag,
                //   selectedInterests.includes(tag) && styles.selectedTag,
                // ]}
                onPress={() => toggleInterest(tag)}
              >
                <Text
                  style={[
                    styles.tagText,
                    selectedInterests.includes(tag) && styles.selectedTagText,
                  ]}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="flex-row gap-4 my-8">
          <TouchableOpacity className="h-[50px] flex-1 border border-main rounded-3xl items-center justify-center">
            <Text className="text-xl font-inter-semibold text-main">
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // style={styles.saveButton}
            className="h-[50px] flex-1 bg-main rounded-3xl items-center justify-center"
            onPress={() => router.push("/auth/notifications")}
          >
            <Text className="text-xl font-inter-semibold text-white">Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    padding: 16,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#666666",
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#A367BB",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  avatarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  avatarButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedAvatar: {
    borderColor: "#007AFF",
    backgroundColor: "#e3f2fd",
  },
  avatarEmoji: {
    fontSize: 24,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  selectedTag: {
    backgroundColor: "#A367BB",
    borderColor: "#A367BB",
  },
  tagText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#1a1a1a",
  },
  selectedTagText: {
    color: "#ffffff",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 32,
    marginBottom: 32,
  },
  cancelButton: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#A367BB",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: "#1a1a1a",
  },
  saveButton: {
    flex: 1,
    height: 50,
    backgroundColor: "#A367BB",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#ffffff",
  },
});

export default AddChildProfile;
