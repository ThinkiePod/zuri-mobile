import CustomSlider from "@/components/CustomSlider";
import { useStoryStore } from "@/stores/storyStore";
import { colors } from "@/utils/colors";
import { assets } from "@/utils/images";
import { convertDuration, formatDuration } from "@/utils/utils";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const ContentScreen = () => {
  // const { id } = useLocalSearchParams();
  const [fav, setFav] = useState(false);
  const [brokenImage, setBrokenImage] = useState(false);

  const story = useStoryStore((state) => state.globalSelectedStory);

  useEffect(() => {
    if (!story?.image) {
      setBrokenImage(true);
      return;
    }

    Image.prefetch(story.image)
      .then(() => setBrokenImage(false))
      .catch(() => setBrokenImage(true));
  }, [story?.image]);

  if (story == null) return null;

  return (
    <View className="flex-1 bg-custom-100">
      {/* <StatusBar style="light" /> */}
      {/* Header */}
      <View className="flex-row justify-between items-end px-5 pt-5 pb-4 mb-4 bg-main h-[120px]">
        <TouchableOpacity onPress={() => router.push("/library")}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white">{story?.title}</Text>
        <View className="w-6" />
      </View>

      <View className="px-4">
        <View className="rounded-xl h-[280px] bg-custom-500 overflow-hidden">
          <View className="flex-1">
            <Image
              source={
                brokenImage ? assets.image.encourage : { uri: story.image }
              }
              className="size-full"
              resizeMode="cover"
            />
          </View>
          <View className="h-16 bg-main/60 flex-row items-center gap-2 px-2">
            {/* <Text className="text-lg font-workSans-medium mt-0.5">
                {(0).toFixed(2)}
              </Text> */}
            {/* <Slider
                value={Number(story.duration.replace(" mins", ""))}
                onValueChange={() => {}}
                minimumValue={0}
                maximumValue={convertDuration(story.duration)}
                minimumTrackTintColor="#A367BB"
                maximumTrackTintColor="#FCFCFE"
                thumbTintColor="#FCFCFE"
                style={{ flex: 1, height: 40 }}
              /> */}

            {/* <CustomSlider
              value={Number(story.duration.replace(" mins", ""))}
              onValueChange={() => {}}
              maximumValue={convertDuration(story.duration)}
              trackHeight={10}
              thumbSize={24}
              minimumTrackColor={colors.main}
              maximumTrackColor={colors.custom["500"]}
              thumbColor={colors.main}
              showLabels
              showTicks
              numberOfTicks={0}
              style={{ flex: 1 }}
            /> */}

            <CustomSlider
              value={Number(story.duration.replace(" mins", ""))}
              maximumValue={convertDuration(story.duration)}
              onValueChange={() => {}}
              labelFormatter={formatDuration}
              minimumTrackColor={colors.main}
              maximumTrackColor={colors.custom["700"]}
              thumbColor={colors.custom["500"]}
              thumbSize={24}
              // showCurrentValue={true}
              // currentValuePosition="top"
            />

            {/* <Text className="text-lg font-workSans-medium mt-0.5">
                {Number(story.duration.replace(" mins", "")).toFixed(2)}
              </Text> */}
          </View>
        </View>

        <View className="rounded-xl bg-custom-200 mt-4 p-2">
          <Text className="text-2xl font-workSans-medium">Description</Text>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            nisi laborum error sequi neque natus quos earum commodi delectus
            possimus fugit reiciendis, tempora sapiente odio veniam sed culpa
            minima temporibus.
          </Text>
          <Text>{story.category}</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity className="rounded-lg bg-main px-8 py-2">
              <Text className="text-white text-lg font-poppins-regular">
                Send to Zuri
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="rounded-lg px-8 py-2"
              onPress={() => setFav((prev) => !prev)}
            >
              {!fav ? (
                <AntDesign name="hearto" size={24} color={colors.main} />
              ) : (
                <AntDesign name="heart" size={24} color={colors.main} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ContentScreen;
