import { MAIN } from "@/utils/constants";
import { assets } from "@/utils/images";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const ChildProfileAvatar = () => {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);

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
    <SafeAreaView className="bg-custom-100 flex-1">
      <StatusBar style="dark" />

      <View className="flex-1 justify-between items-center p-6">
        <View className="mb-8 items-center">
          <Image source={assets.image.logoThin} className="size-32" />
          <Text className="text-3xl text-center mb-4 font-inter-bold">
            Pick child profile picture
          </Text>
          <Text className="text-xl text-center mb-10 font-poppins-regular">
            Have a favorite selfie? Upload it now
          </Text>

          <TouchableOpacity onPress={pickImage}>
            {image == null ? (
              <View className="bg-main rounded-full size-[200px] relative">
                <View className="absolute inset-0 flex items-center justify-center bg-white rounded-full size-[100px] top-1/2 left-1/2">
                  <Entypo name="circle-with-plus" size={60} color={MAIN} />
                </View>
              </View>
            ) : (
              <Image
                source={{ uri: image }}
                className="size-[200px] rounded-full"
                resizeMode="cover"
              />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="bg-main h-[50px] rounded-[25px] items-center justify-center w-full"
          onPress={() => router.push("/auth/child-profile")}
        >
          <Text className="text-lg text-white font-inter-semibold">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
