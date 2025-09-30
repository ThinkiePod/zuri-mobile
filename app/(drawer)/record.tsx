import CustomSlider from "@/components/CustomSlider";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors } from "@/utils/colors";
import { convertDuration, formatDuration } from "@/utils/utils";
import {
  Entypo,
  Feather,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const RecordScreen = () => {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const animatedOpacity = useRef(new Animated.Value(1)).current;
  const animation = useRef<Animated.CompositeAnimation | null>(null);

  const recordings = [
    {
      title: "Zuri Voice Preview",
      duration: "1:59",
      date: "Jan",
      type: "face-smile",
    },
    {
      title: "Mummy's bedtime prayer",
      duration: "1:59",
      date: "Jan",
      type: "pray",
    },
    {
      title: "Princess Story by mummy",
      duration: "2:59",
      date: "Jan",
      type: "book",
    },
    {
      title: "Mummy's goodtime prayer",
      duration: "5:40",
      date: "Jan",
      type: "pray",
    },
    {
      title: "Daddy's evening song",
      duration: "5:30",
      date: "Jan",
      type: "music",
    },
  ];

  const toggleRecording = () => {
    setIsRecording((prev) => !prev);
  };

  // Start/stop animation based on isRecording
  useEffect(() => {
    if (isRecording) {
      animation.current = Animated.loop(
        Animated.sequence([
          Animated.timing(animatedOpacity, {
            toValue: 0.5,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animatedOpacity, {
            toValue: 1,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      animation.current.start();
    } else {
      if (animation.current) {
        animation.current.stop();
        animation.current = null;
      }
      // Reset opacity when not recording
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isRecording]);

  return (
    <ScreenWrapper>
      <SafeAreaView className="flex-1 bg-custom-100">
        {/* Header */}
        <View className="flex-row justify-between items-center px-5 pt-5 pb-3">
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.main} />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-800">
            Voice Recording
          </Text>
          <View className="w-6" />
        </View>

        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
        >
          {/* Saved Recordings */}
          <View className="mb-8 bg-main rounded-xl p-4 gap-y-6">
            {recordings.map((recording, index) => (
              <View
                key={index}
                className="flex-row items-center py-3 px-2 bg-white rounded-lg"
              >
                <View className="w-10 h-10 rounded-full justify-center items-center mr-3">
                  {recording.type === "music" ? (
                    <Ionicons
                      name="musical-notes-outline"
                      size={32}
                      color={colors.main}
                    />
                  ) : recording.type === "pray" ? (
                    <MaterialCommunityIcons
                      name="hands-pray"
                      size={32}
                      color={colors.main}
                    />
                  ) : recording.type === "book" ? (
                    <Entypo name="open-book" size={32} color={colors.main} />
                  ) : (
                    <FontAwesome6
                      name="face-smile"
                      size={32}
                      color={colors.main}
                    />
                  )}
                </View>
                <View className="flex-1">
                  <Text className="text-base font-medium text-gray-800">
                    {recording.title}
                  </Text>
                  <View className="flex-row items-center gap-2">
                    <View
                      style={{ flex: 1, height: 30, justifyContent: "center" }}
                    >
                      {/* <Slider
                        value={Number(recording.duration.replace(":", "."))}
                        onValueChange={() => {}}
                        minimumValue={0}
                        maximumValue={convertDuration(recording.duration)}
                        minimumTrackTintColor={colors.main}
                        maximumTrackTintColor={colors.misc["300"]}
                        thumbTintColor={colors.main}
                        style={{ flex: 1, height: 30 }}
                        // className="flex-1 h-10"
                      /> */}

                      <CustomSlider
                        value={Number(recording.duration.replace(":", "."))}
                        maximumValue={convertDuration(recording.duration)}
                        onValueChange={() => {}}
                        labelFormatter={formatDuration}
                        minimumTrackColor={colors.main}
                        maximumTrackColor={colors.custom["700"]}
                        thumbColor={colors.custom["500"]}
                        thumbSize={24}
                        // showCurrentValue={true}
                        // currentValuePosition="top"
                      />
                    </View>
                  </View>
                </View>

                <View className="w-10 h-10 rounded-full justify-center items-center mr-3">
                  <Feather name="play-circle" size={32} color={colors.main} />
                </View>
              </View>
            ))}
          </View>

          {/* Recording Section */}
          <View className="bg-transparent rounded-2xl p-6 mb-8">
            {/* Start Preview */}
            {/* <View className="flex-row items-center bg-white/20 rounded-lg p-4 mb-6">
              <MaterialIcons name="mic" size={24} color="#fff" />
              <Text className="ml-3 text-base text-white font-medium">
                Start Voice Preview
              </Text>
            </View> */}

            {/* Recording Controls */}
            <View className="items-center mb-6">
              <View className="w-32 h-32 border-8 rounded-full justify-center border-main p-2 items-center">
                <Animated.View
                  style={{ opacity: animatedOpacity }}
                  className={`items-center`}
                >
                  <TouchableOpacity
                    className={`w-20 h-20 bg-white border-8 rounded-full justify-center items-center ${
                      isRecording ? "border-main/40" : "border-main/60"
                    }`}
                    onPress={toggleRecording}
                  >
                    {isRecording ? (
                      <MaterialIcons
                        name={"stop"}
                        size={32}
                        color={colors.summary["600"]}
                      />
                    ) : (
                      <Feather name={"mic"} size={32} color={colors.main} />
                    )}
                  </TouchableOpacity>
                </Animated.View>
              </View>

              <Text className="text-base font-semibold mt-2">
                {isRecording ? "Recording..." : "Tap to record"}
              </Text>
            </View>

            {/* Save Button */}
            <TouchableOpacity className="bg-main rounded-lg py-4 items-center">
              <Text className="text-white text-lg font-semibold">
                Save Recording
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default RecordScreen;
