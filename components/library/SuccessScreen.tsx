import { colors } from "@/utils/colors";
import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CustomHeader } from "../CustomHeader";

const SuccessScreen = () => {
  const [addBedRoutine, setAddBedRoutine] = useState(false);
  const [favoriteAffirmation, setFavoriteAffirmation] = useState(false);

  const [schedule, setSchedule] = useState(0);

  return (
    <View>
      <CustomHeader title="Success" backAction />
      <View className="px-5 gap-y-8">
        <Text className="text-xl font-workSans-regular text-center">
          This affirmation has been sent to Zuri.
        </Text>

        <View className="bg-custom-300 rounded-xl px-2 py-4">
          <Text className="text-2xl font-poppins-medium mb-4">
            Optional Settings
          </Text>

          <TouchableOpacity
            className="flex-row items-center gap-x-2"
            onPress={() => setAddBedRoutine((prev) => !prev)}
          >
            <FontAwesome5
              name={addBedRoutine ? "check-square" : "square"}
              size={36}
              color={colors.main}
            />
            <Text className={`text-xl font-workSans-regular`}>
              Add to bedtime routine
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center gap-x-2 mt-2"
            onPress={() => setFavoriteAffirmation((prev) => !prev)}
          >
            <FontAwesome5
              name={favoriteAffirmation ? "check-square" : "square"}
              size={36}
              color={colors.main}
            />
            <Text className={`text-xl font-workSans-regular`}>
              Set as favorite affirmation.
            </Text>
          </TouchableOpacity>
        </View>

        <View className="bg-custom-200 rounded-xl px-2 py-4">
          <Text className="text-2xl font-poppins-medium mb-4">
            Delivery Options
          </Text>

          <TouchableOpacity
            className="flex-row items-center gap-x-2 mb-2"
            onPress={() => setSchedule(0)}
          >
            <MaterialIcons
              name={schedule === 0 ? "radio-button-on" : "radio-button-off"}
              size={36}
              color={colors.main}
            />
            <Text className={`text-xl font-workSans-regular`}>Send now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center gap-x-2"
            onPress={() => setSchedule(1)}
          >
            <MaterialIcons
              name={schedule === 1 ? "radio-button-on" : "radio-button-off"}
              size={36}
              color={colors.main}
            />
            <Text className={`text-xl font-workSans-regular`}>
              Schedule for later
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="flex-row items-center justify-between bg-main pl-4 pr-6 py-4 rounded-xl"
          // onPress={() => setSchedule(1)}
        >
          <Text className={`text-2xl font-workSans-regular text-white`}>
            Add a custom voice intro...
          </Text>
          <Feather name="mic" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center justify-center bg-main pl-4 pr-6 py-4 rounded-xl"
          // onPress={() => setSchedule(1)}
        >
          <Text className={`text-2xl font-workSans-regular text-white`}>
            Done
          </Text>
        </TouchableOpacity>

        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            className="flex-row items-center justify-center bg-main pl-4 pr-6 py-4 rounded-xl"
            // onPress={() => setSchedule(1)}
          >
            <Text className={`text-2xl font-workSans-regular text-white`}>
              Send Another
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-center bg-main pl-4 pr-6 py-4 rounded-xl"
            onPress={() => router.push("/routine")}
          >
            <Text className={`text-2xl font-workSans-regular text-white`}>
              Go to Routines
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SuccessScreen;
