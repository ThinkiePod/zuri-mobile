import { colors } from "@/utils/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

interface CustomHeaderProps {
  title: string;
  backAction?: boolean;
}

export const CustomHeader = ({ title, backAction }: CustomHeaderProps) => {
  return (
    <View className="flex-row justify-between items-center px-5 pt-5 pb-2 mb-4">
      {backAction && (
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.main} />
        </TouchableOpacity>
      )}
      <Text className="text-2xl font-bold text-gray-900">{title}</Text>
      <View className="w-6" />
    </View>
  );
};
