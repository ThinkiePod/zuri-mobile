import ScreenWrapper from "@/components/ScreenWrapper";
import { colors } from "@/utils/colors";
import { hexToRgba } from "@/utils/utils";
import { MaterialIcons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const Insight = () => {
  // const router = useRouter();

  const emotionData = [
    {
      alt: "😃",
      uri: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f600/512.gif",
    },
    {
      alt: "🤩",
      uri: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f929/512.gif",
    },
    {
      alt: "🥴",
      uri: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f974/512.gif",
    },
    {
      alt: "🥳",
      uri: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f973/512.gif",
    },
    {
      alt: "😀",
      uri: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f605/512.gif",
    },
    {
      alt: "😉",
      uri: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f609/512.gif",
    },
    {
      alt: "😍",
      uri: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f60d/512.gif",
    },
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <ScreenWrapper>
      <SafeAreaView className="flex-1 bg-custom-100">
        <View className="flex-row justify-center items-center px-5 pt-5 pb-3">
          <Text className="text-3xl font-bold text-gray-800">Insight</Text>
          <View className="w-6" />
        </View>

        <ScrollView
          className="px-5 flex-1"
          showsVerticalScrollIndicator={false}
        >
          {/* Time Spent */}
          <View className="items-center mb-8">
            <View className="items-center bg-white py-4 px-16 rounded-xl">
              <Text className="text-2xl font-bold text-gray-800 mb-4">
                Time Spent Learning
              </Text>
              <AnimatedCircularProgress
                size={200}
                width={25}
                fill={75}
                rotation={-360}
                tintColor={colors.main}
                backgroundColor={hexToRgba(colors.main, 0.3)}
                lineCap="round"
              >
                {() => (
                  <View className="justify-center items-center mb-2">
                    <Text className="text-4xl font-bold text-gray-800">
                      120
                    </Text>
                    <Text className="text-base font-semibold text-gray-500">
                      Mins
                    </Text>
                  </View>
                )}
              </AnimatedCircularProgress>
              <Text className="text-base font-bold text-gray-500">
                This week
              </Text>
            </View>
          </View>

          {/* Emotions */}
          <View className="mb-8 bg-main/90 p-4 rounded-xl">
            <Text className="text-2xl font-bold text-white mb-4">
              Emotions This Week
            </Text>
            <View className="flex-row justify-between">
              {emotionData.map((emotion, index) => (
                <View key={index} className="items-center">
                  <Text className="text-lg text-white mb-2">{days[index]}</Text>
                  <Image
                    source={{
                      uri: emotion.uri,
                    }}
                    alt={emotion.alt}
                    className="size-10"
                  />
                </View>
              ))}
            </View>
          </View>

          {/* This Week Stats */}
          <View className="mb-8 bg-white p-4 rounded-xl">
            <Text className="text-2xl font-bold text-gray-800 mb-4">
              This Week
            </Text>
            <View className="flex-row justify-between gap-x-2">
              <View className="items-center justify-center flex-1 bg-main/90 p-3 rounded-lg">
                <Text className="text-3xl font-bold text-white">50 mins</Text>
                {/* <Text className="text-sm text-gray-500">mins</Text> */}
                <Text className="text-xl text-white text-center mt-1">
                  Time Spent
                </Text>
              </View>
              <View className="items-center justify-center flex-1 bg-custom-200 p-3 rounded-lg">
                <Text className="text-3xl font-bold">5</Text>
                {/* <Text className="text-sm text-gray-500" /> */}
                <Text className="text-xl text-center mt-1">Stories Played</Text>
              </View>
              <View className="items-center justify-center flex-1 bg-main/90 p-3 rounded-lg">
                <Text className="text-3xl font-bold text-white">8</Text>
                {/* <Text className="text-sm text-gray-500" /> */}
                <Text className="text-xl text-white text-center mt-1">
                  Emotion Check-in
                </Text>
              </View>
            </View>
          </View>

          {/* Streaks */}
          <View className="mb-8 bg-custom-600 p-4 rounded-xl">
            <Text className="text-2xl font-bold text-gray-800 mb-4">
              Streaks
            </Text>
            <View className="flex-row items-center bg-yellow-100 px-4 py-3 rounded-lg">
              <MaterialIcons
                name="local-fire-department"
                size={24}
                color={colors.misc["400"]}
              />
              <Text className="ml-2 text-base text-yellow-900 font-medium">
                5 days learning streak
              </Text>
            </View>
          </View>

          {/* Download Report */}
          <TouchableOpacity className="bg-main rounded-lg py-4 items-center mb-8">
            <Text className="text-white text-base font-semibold">
              Download Report
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default Insight;
