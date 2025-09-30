import { colors } from "@/utils/colors";
import { dummyRoutines } from "@/utils/constants";
import {
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectDropdown from "react-native-select-dropdown";

const RoutineScreen = () => {
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useState("Morning");
  // const [routineSteps, setRoutineSteps] = useState(dummyRoutines);

  const routineSteps = dummyRoutines.filter(
    (step) => step.timeOfDay === selectedTime
  );

  const timeOptions = ["Morning", "Afternoon", "Evening"];

  const recordings = [
    { title: "Dad telling bed-time story", duration: "4:23", icon: "👨‍💼" },
    { title: "Princess Story by mummy", duration: "2:23", icon: "👸" },
    { title: "Mummy's bedtime song", duration: "4:59", icon: "🎵" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-custom-100">
      {/* Header */}
      <View className="flex-row justify-between items-center px-5 pt-5 pb-2 mb-4">
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.main} />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900">Routine Builder</Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Time Selector */}
        <View className="bg-main p-3 rounded-lg mb-6 gap-y-4">
          <SelectDropdown
            data={timeOptions}
            onSelect={(selectedItem) => setSelectedTime(selectedItem)}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View className="w-[200px] h-[50px] bg-white rounded-xl flex-row justify-between items-center px-3">
                  <View className="flex-1 flex-row items-center gap-2">
                    {selectedTime === "Afternoon" && (
                      <MaterialIcons
                        name="sunny"
                        size={18}
                        color={colors.sunny}
                      />
                    )}

                    {selectedTime === "Morning" && (
                      <Feather
                        name={"sun"}
                        size={18}
                        color={colors.sunny}
                        fill={colors.sunny}
                      />
                    )}

                    {selectedTime === "Evening" && (
                      <Ionicons
                        name={"moon"}
                        size={18}
                        color={colors.evening}
                        fill={colors.evening}
                      />
                    )}
                    <Text className="text-lg font-medium">
                      {selectedTime || selectedItem || "Select time period"}
                    </Text>
                  </View>
                  <Ionicons
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={colors.main}
                    size={24}
                  />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  className={`${isSelected || item === selectedTime ? "bg-custom-500" : "bg-gray-900/50"} w-full flex-row px-3 justify-center items-center py-2`}
                >
                  {item === "Afternoon" && (
                    <MaterialIcons
                      name="sunny"
                      size={18}
                      color={colors.sunny}
                      className="mr-2"
                    />
                  )}

                  {item === "Morning" && (
                    <Feather
                      name={"sun"}
                      size={18}
                      color={colors.sunny}
                      fill={colors.sunny}
                      className="mr-2"
                    />
                  )}

                  {item === "Evening" && (
                    <Ionicons
                      name={"moon"}
                      size={18}
                      color={colors.evening}
                      fill={colors.evening}
                      className="mr-2"
                    />
                  )}
                  <Text className="flex-1 text-lg font-medium text-black">
                    {item}
                  </Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={{
              backgroundColor: colors.custom["100"],
              borderRadius: 8,
            }}
          />

          {/* Routine Steps */}
          <View className="rounded-xl mb-4 gap-y-4">
            {routineSteps.map((step) => (
              <View
                key={step.id}
                className="flex-row items-center py-3 px-4 bg-white rounded-xl"
              >
                <View className="w-10 h-10 rounded-full bg-transparent justify-center items-center mr-3">
                  {step.icon === "favorite" ? (
                    <FontAwesome5
                      name="hand-holding-heart"
                      size={24}
                      color={colors.main}
                    />
                  ) : (
                    <MaterialIcons
                      name={step.icon}
                      size={24}
                      color={colors.main}
                    />
                  )}
                </View>
                <View className="flex-1">
                  <Text className="text-base font-medium">{step.title}</Text>
                  <Text className="text-sm mt-1">{step.description}</Text>
                </View>
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="lead-pencil"
                    size={28}
                    color={colors.main}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Add Button */}
        <TouchableOpacity className="flex-row justify-center items-center border border-main border-dashed bg-gray-50 rounded-lg py-4 mb-4">
          <MaterialIcons name="add" size={20} color={colors.main} />
          <Text className="ml-2 text-main text-base font-medium">
            Add Content
          </Text>
        </TouchableOpacity>

        {/* Save Button */}
        <TouchableOpacity className="bg-main rounded-lg py-4 items-center mb-8">
          <Text className="text-white text-base font-semibold">Save</Text>
        </TouchableOpacity>

        {/* Record Section */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            New record your session
          </Text>
          <TouchableOpacity className="flex-row justify-center items-center border border-main bg-gray-50 rounded-lg py-4">
            <Feather name="mic" size={20} color={colors.main} />
            <Text className="ml-2 text-main text-base font-medium">
              New recording
            </Text>
          </TouchableOpacity>
        </View>

        {/* Saved Recordings */}
        <View className="mb-10">
          {recordings.map((recording, index) => (
            <View
              key={index}
              className="flex-row items-center py-3 border-b border-gray-200"
            >
              <Text className="text-2xl mr-3">{recording.icon}</Text>
              <View className="flex-1">
                <Text className="text-base font-medium text-gray-900">
                  {recording.title}
                </Text>
                <Text className="text-sm text-gray-500 mt-1">
                  {recording.duration}
                </Text>
              </View>
              <TouchableOpacity>
                <MaterialIcons
                  name="play-arrow"
                  size={24}
                  color={colors.main}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RoutineScreen;
