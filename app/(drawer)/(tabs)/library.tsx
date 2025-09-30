import { LibraryTabs } from "@/components/library/LibraryTabs";
import { colors } from "@/utils/colors";
import { Filter, Search } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LibraryScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-custom-100">
      {/* Header */}
      <View className="flex-row items-center justify-between p-5 bg-custom-100">
        <Text className="text-[22px] font-inter-bold">Content Library</Text>
        <View className="flex-row gap-3">
          <TouchableOpacity className="w-8 h-8 bg-custom-200 items-center rounded-full justify-center">
            <Search size={24} color={colors.custom["800"]} />
          </TouchableOpacity>
          <TouchableOpacity className="w-8 h-8 bg-custom-200 items-center rounded-full justify-center">
            <Filter size={24} color={colors.custom["800"]} />
          </TouchableOpacity>
        </View>
      </View>

      <LibraryTabs />
    </SafeAreaView>
  );
};

export default LibraryScreen;
