import { assets } from "@/utils/images";
import { AntDesign } from "@expo/vector-icons";
import cn from "clsx";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { memo, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  setupInterestTags,
  TOTAL_SELECTED_INTEREST,
} from "../../utils/constants";

interface ItemProps {
  title: string;
  index: number;
  state: number[];
  setState: React.Dispatch<React.SetStateAction<number[]>>;
}

const Item = memo(({ title, index, state, setState }: ItemProps) => {
  const isSelected = state.includes(index);

  const handlePress = () => {
    if (isSelected) {
      // Unselect
      setState((prev) => prev.filter((p) => p !== index));
    } else if (state.length >= 5) {
      // Prevent selecting more than 5
      Alert.alert(
        "Limit Reached",
        "You can only pick 5 items. Unselect one to choose another."
      );
    } else {
      setState((prev) => [...prev, index]);
    }
  };
  return (
    <Pressable onPress={handlePress} className="w-[48%] h-[90px] mb-4 mr-4">
      <View
        className={cn(
          "bg-custom-500 flex-1 rounded-lg border border-main justify-end pb-4 px-2",
          isSelected && "bg-main"
        )}
      >
        <Text
          className={cn(
            "text-2xl text-center text-wrap text-main font-workSans-medium",
            isSelected && "text-white"
          )}
        >
          {title}
        </Text>
        {isSelected && (
          <Animatable.View
            duration={200}
            animation="zoomIn"
            className="absolute top-2 right-2 z-10"
          >
            <AntDesign name="checkcircle" color="white" size={16} />
          </Animatable.View>
        )}
      </View>
    </Pressable>
  );
});

Item.displayName = "InterestItem";

const Interests = () => {
  const [selectedInterest, setSelectedInterest] = useState<number[]>([]);

  return (
    <SafeAreaView className="bg-custom-100 flex-1 h-full">
      <StatusBar style="dark" />

      {/* <View className="flex-1 justify-between items-center p-6"> */}
      <FlatList
        data={setupInterestTags}
        numColumns={2}
        keyExtractor={(item, index) => `${item}-${index}`}
        contentContainerClassName="px-6 gap-y-2 pb-32"
        extraData={selectedInterest}
        renderItem={({ item, index }) => (
          <Item
            title={item}
            index={index}
            state={selectedInterest}
            setState={setSelectedInterest}
          />
        )}
        ListHeaderComponent={() => (
          <View className="items-center">
            <Image source={assets.image.logoThin} className="size-32" />
            <Text className="text-3xl text-center mb-4 font-inter-bold">
              What do you want to see on the app?
            </Text>
            <Text className="text-xl text-center mb-10 font-poppins-regular">
              Let&apos;s make Zuri just right for you! Pick at least 3 things
              your child loves; this helps us show you the best content. Your
              choices will be part of your profile.
            </Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View className="flex-row items-center justify-between w-full">
            <Text className="flex-1 text-xl font-poppins-semibold">
              {selectedInterest.length} of {TOTAL_SELECTED_INTEREST} selected
            </Text>
            <TouchableOpacity
              disabled={selectedInterest.length < 3}
              className={cn(
                "h-[50px] rounded-[25px] items-center justify-center flex-1",
                selectedInterest.length < 3 ? "bg-main/60" : "bg-main"
              )}
              onPress={() => {
                if (selectedInterest.length >= 3) {
                  router.push("/auth/device-pairing");
                }
              }}
            >
              <Text className="text-lg text-white font-inter-semibold">
                Next
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {/* </View> */}
    </SafeAreaView>
  );
};

export default Interests;
