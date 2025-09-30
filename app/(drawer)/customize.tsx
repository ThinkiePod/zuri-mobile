import CustomSlider from "@/components/CustomSlider";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors } from "@/utils/colors";
import { MAIN } from "@/utils/constants";
import { getAlphaValue, hexToHexWithAlpha } from "@/utils/utils";
// import { useRouter } from "expo-router";
import cn from "clsx";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const Customize = () => {
  // const router = useRouter();
  const [voiceTone, setVoiceTone] = useState("Calm");
  const [speed, setSpeed] = useState(0.5);
  const [volume, setVolume] = useState(0.7);
  const [touchSensitivity, setTouchSensitivity] = useState(0.6);
  const [responseDelay, setResponseDelay] = useState(0.4);
  const [nameRecognition, setNameRecognition] = useState("");

  const voiceTones = ["Calm", "Playful", "Friendly"];

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Adjust if needed
      >
        <SafeAreaView className="flex-1 bg-custom-100">
          {/* Header */}
          <View className="flex-row justify-center items-center px-5 pt-5 pb-3">
            {/* <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity> */}
            <Text className="text-3xl font-bold text-gray-800 text-center">
              Customization
            </Text>
            <View className="w-6" />
          </View>

          <ScrollView
            className="flex-1 px-5"
            showsVerticalScrollIndicator={false}
          >
            {/* Voice & Tone Settings */}
            <View className="mb-8 bg-main p-4 rounded-xl">
              <Text className="text-2xl font-bold text-white mb-4">
                Voice & Tone Settings
              </Text>
              <View className="flex-row gap-x-2">
                {voiceTones.map((tone) => {
                  const selected = voiceTone === tone;

                  return (
                    <TouchableOpacity
                      key={tone}
                      className={cn(
                        "px-5 py-2 rounded-xl border",
                        selected ? "border-violet-500" : "border-transparent",
                        tone === "Calm"
                          ? "bg-calm"
                          : tone === "Friendly"
                            ? "bg-friendly"
                            : "bg-playful"
                      )}
                      onPress={() => setVoiceTone(tone)}
                    >
                      <Text
                        className={cn(
                          "text-sm",
                          selected && " font-medium",
                          tone === "Friendly" && "text-white"
                        )}
                      >
                        {tone}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* LED Color Settings */}
            <View className="mb-8 bg-white p-3 rounded-lg">
              <Text className="text-2xl font-bold text-gray-800 mb-4">
                LED Color Settings
              </Text>
              <View className="mb-4 flex-row items-center justify-between">
                <Text className="text-xl font-medium text-gray-800 mb-3 flex-[30%]">
                  Speed
                </Text>
                <View className="flex-row gap-x-4 mb-4 flex-[50%]">
                  {Array.from({ length: 4 }, (_, i) => i + 1).map((index) => {
                    const speedValue = index / 4;
                    const isCurrentSpeed = speedValue <= speed;
                    return (
                      <TouchableOpacity
                        key={`volume-${index}`}
                        className="w-12 h-12 rounded-full border-2 border-gray-200"
                        style={{
                          backgroundColor: `${hexToHexWithAlpha(MAIN, isCurrentSpeed ? getAlphaValue(4 - index) : 0)}`,
                        }}
                        onPress={() => setSpeed(speedValue)}
                      />
                    );
                  })}
                </View>
              </View>
              <View className="flex-row items-center gap-x-8">
                <Text className="text-xl font-medium text-gray-800 mb-3 flex-[30%]">
                  Volume
                </Text>
                <View className="flex-[50%] flex-row gap-2 items-center">
                  {/* <Slider
                    value={volume}
                    onValueChange={setVolume}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor={MAIN}
                    maximumTrackTintColor={colors.misc["300"]}
                    thumbTintColor="#FFF"
                    style={{
                      height: 40,
                      paddingVertical: 10,
                    }}
                  /> */}

                  <View className="flex-1 mr-4">
                    <CustomSlider
                      value={volume}
                      minimumValue={0}
                      maximumValue={1}
                      step={0.1}
                      onValueChange={setVolume}
                      labelFormatter={(val) => `${Math.round(val * 100)}%`}
                      thumbSize={24}
                      // showCurrentValue={true}
                      showLabels={false}
                      maximumTrackColor={colors.misc["700"]}
                      thumbColor={colors.custom["500"]}
                      style={{ flex: 1 }}
                    />
                  </View>
                  <Text className="text-sm font-medium text-gray-800">
                    {Math.round(volume * 100)}%
                  </Text>
                </View>
              </View>
            </View>

            {/* Interaction Settings */}
            <View className="mb-8 bg-custom-600 p-3 rounded-lg">
              <Text className="text-2xl font-bold text-gray-800 mb-4">
                Interaction Settings
              </Text>

              <View className="mb-6 flex-row items-center gap-8">
                <Text className="text-xl font-medium text-gray-800 mb-3">
                  Touch Sensitivity
                </Text>
                <View className="flex-1 mr-4">
                  {/* <Slider
                    value={touchSensitivity}
                    onValueChange={setTouchSensitivity}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor={MAIN}
                    maximumTrackTintColor={colors.misc["300"]}
                    thumbTintColor="#FFF"
                    className="w-full h-10"
                  /> */}
                  <CustomSlider
                    value={touchSensitivity}
                    minimumValue={0}
                    maximumValue={1}
                    step={0.1}
                    onValueChange={setTouchSensitivity}
                    // labelFormatter={(val) => `${Math.round(val * 100)}%`}
                    thumbSize={24}
                    // showCurrentValue={true}
                    showLabels={false}
                    maximumTrackColor={colors.misc["700"]}
                    thumbColor={colors.custom["500"]}
                    style={{ flex: 1 }}
                  />
                </View>
              </View>

              <View className="mb-6 flex-row items-center gap-8">
                <Text className="text-xl font-medium text-gray-800 mb-3">
                  Response Delay
                </Text>
                <View className="flex-1 mr-4">
                  {/* <Slider
                    value={responseDelay}
                    onValueChange={setResponseDelay}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor={MAIN}
                    maximumTrackTintColor={colors.misc["300"]}
                    thumbTintColor="#FFF"
                    className="w-full h-10"
                  /> */}
                  <CustomSlider
                    value={responseDelay}
                    minimumValue={0}
                    maximumValue={1}
                    step={0.1}
                    onValueChange={setResponseDelay}
                    // labelFormatter={(val) => `${Math.round(val * 100)}%`}
                    thumbSize={24}
                    // showCurrentValue={true}
                    showLabels={false}
                    maximumTrackColor={colors.misc["700"]}
                    thumbColor={colors.custom["500"]}
                    style={{ flex: 1 }}
                  />
                </View>
              </View>
            </View>

            {/* Name Recognition */}
            <View className="mb-8">
              <Text className="text-lg font-bold text-gray-800 mb-4">
                Name Recognition
              </Text>
              <TextInput
                className="border border-main rounded-lg px-4 py-4 text-base mb-3"
                placeholder="Learn names"
                value={nameRecognition}
                onChangeText={setNameRecognition}
                placeholderTextColor={colors.misc["100"]}
              />
              <TouchableOpacity className="w-full bg-main rounded-lg px-6 py-3">
                <Text className="text-white text-lg font-medium self-center">
                  Preview
                </Text>
              </TouchableOpacity>
            </View>

            {/* Final Input (appears to be duplicate?) */}
            <View className="mb-8">
              <Text className="text-lg font-bold text-gray-800 mb-4">
                Name Recognition
              </Text>
              <TextInput
                className="border border-main rounded-lg px-4 py-4 text-base mb-3"
                placeholder="Learn names"
                value={nameRecognition}
                onChangeText={setNameRecognition}
                placeholderTextColor={colors.misc["100"]}
              />
            </View>

            {/* Save / Reset Buttons */}
            <View className="flex-row gap-x-8 mb-10">
              <TouchableOpacity className="flex-1 border border-main rounded-lg py-4 items-center">
                <Text className="text-main text-xl font-medium">Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-main rounded-lg py-4 items-center">
                <Text className="text-white text-xl font-semibold">Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default Customize;
