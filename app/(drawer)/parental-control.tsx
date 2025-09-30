import CustomConsent from "@/components/CustomConsent";
import { CustomHeader } from "@/components/CustomHeader";
import CustomSlider from "@/components/CustomSlider";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors } from "@/utils/colors";
import { consents } from "@/utils/constants";
import { formatHours } from "@/utils/utils";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const ParentControlScreen = () => {
  const [timeLimit, setTimeLimit] = useState(true);
  const [limit, setLimit] = useState(1);
  const [quietMode, setQuietMode] = useState(true);
  const [routineToggle, setRoutineToggle] = useState(true);

  const contentFilters = [
    { name: "Games", enabled: false },
    { name: "Stories", enabled: true },
    { name: "Prayer", enabled: false },
    { name: "Phonics", enabled: true },
    { name: "Reading", enabled: true },
    { name: "Numbers", enabled: true },
    { name: "Routine", enabled: true },
    { name: "Jokes", enabled: false },
    { name: "Bible Story", enabled: false },
    { name: "Words", enabled: true },
    { name: "Science", enabled: false },
    { name: "Affirmations", enabled: true },
  ];

  const routineOptions = [
    { name: "Morning", enabled: true },
    { name: "Afternoon", enabled: false },
    { name: "Night", enabled: true },
    { name: "Others", enabled: false },
  ];

  return (
    <ScreenWrapper>
      <SafeAreaView className="flex-1 bg-custom-100">
        <CustomHeader title="Parental Control" backAction />

        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-8 bg-main p-4 rounded-xl">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-medium text-white">Time Limit</Text>
              <Switch
                value={timeLimit}
                onValueChange={setTimeLimit}
                trackColor={{ true: "#FFF", false: colors.misc["900"] }}
                ios_backgroundColor={colors.misc["900"]}
                thumbColor={timeLimit ? colors.main : colors.misc["800"]}
              />
            </View>
            {/* {timeLimit && ( */}
            <View className="flex-row gap-x-16 items-center bg-white rounded-xl p-4">
              <Text>{formatHours(limit)}</Text>
              {/* <Slider
                value={limit}
                onValueChange={setLimit}
                minimumValue={0.5}
                maximumValue={6}
                step={0.5}
                disabled={timeLimit}
                minimumTrackTintColor={colors.main}
                maximumTrackTintColor={colors.misc["300"]}
                thumbTintColor="#FFF"
                style={{ flex: 1, height: 30 }}
              /> */}
              <View className="flex-1 mr-4">
                <CustomSlider
                  value={limit}
                  minimumValue={0.5}
                  maximumValue={6}
                  step={0.5}
                  onValueChange={setLimit}
                  disabled={!timeLimit}
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
            {/* )} */}
          </View>

          <View className="mb-8 bg-white p-4 rounded-xl justify-center">
            <View className="flex-row justify-between items-center">
              <View className="flex-row gap-x-4 items-center">
                <Text className="text-base font-medium text-misc-500">
                  Quiet Mode
                </Text>
                <Text className="text-base text-misc-100">9 pm - 7 am</Text>
              </View>
              <Switch
                value={quietMode}
                onValueChange={setQuietMode}
                trackColor={{
                  true: colors.misc["600"],
                  false: colors.misc["700"],
                }}
                ios_backgroundColor={colors.misc["700"]}
                thumbColor={quietMode ? colors.main : colors.misc["800"]}
              />
            </View>
          </View>

          <View className="mb-8 bg-main p-4 rounded-xl">
            <Text className="text-lg font-semibold text-white mb-4">
              Content Filter
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {contentFilters.map((filter, index) => (
                <TouchableOpacity
                  key={index}
                  className="w-[48%] flex-row items-center gap-x-2"
                >
                  {filter.enabled ? (
                    <MaterialIcons
                      name="check-box"
                      size={32}
                      color="white" // White tick
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="checkbox-blank"
                      size={32}
                      color="white"
                    />
                  )}

                  <Text className={`text-lg text-summary-500`}>
                    {filter.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="mb-8 bg-custom-300 p-4 rounded-xl">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-cl font-medium text-misc-500">
                Routine Toggle
              </Text>
              <Switch
                value={routineToggle}
                onValueChange={setRoutineToggle}
                trackColor={{
                  true: colors.misc["600"],
                  false: colors.misc["700"],
                }}
                ios_backgroundColor={colors.misc["700"]}
                thumbColor={routineToggle ? colors.main : colors.misc["800"]}
              />
            </View>
            <View className="flex-wrap flex-row gap-3 mt-2">
              {routineOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  className="w-[45%] flex-row items-center gap-x-2"
                >
                  <MaterialCommunityIcons
                    name={
                      option.enabled
                        ? "checkbox-marked-outline"
                        : "checkbox-blank-outline"
                    }
                    size={32}
                    color={colors.main} // White tick
                  />
                  <Text className={`text-lg`}>{option.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="mb-8">
            <View className="bg-main rounded-xl p-4">
              <View className="flex-row items-center">
                {/* <MaterialIcons name="security" size={24} color="white" /> */}
                <View className="ml-3 flex-1 gap-2">
                  <Text className="text-xl font-medium text-white">
                    Consent & Privacy Settings
                  </Text>
                  {consents.map((consent, index) => (
                    <CustomConsent
                      title={consent.title}
                      subTitle={consent.subTitle}
                      key={index}
                    />
                  ))}
                </View>
              </View>
            </View>
          </View>

          <View className="flex-row justify-between">
            <TouchableOpacity className="py-2 px-4 rounded-lg bg-main">
              <Text className="text-white text-xl">Pause all Interactions</Text>
            </TouchableOpacity>

            <TouchableOpacity className="py-2 px-4 rounded-lg bg-main">
              <Text className="text-white text-xl">Save Changes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default ParentControlScreen;
