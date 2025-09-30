import { colors } from "@/utils/colors";
import React, { useState } from "react";
import { Switch, Text, View } from "react-native";

const CustomizationScreen = () => {
  const [receiveEmail, setReceiveEmail] = useState(false);
  const [connect, setConnect] = useState(false);

  return (
    <View className="flex-1">
      <View className="mb-8">
        <Text className="font-bold mb-4 text-2xl">Get more out of the App</Text>
        <View className="flex-row items-center justify-between">
          <Text className="flex-1 font-poppins-regular text-lg">
            Receive email about your activity and recommendations.
          </Text>
          <Switch
            value={receiveEmail}
            onValueChange={setReceiveEmail}
            trackColor={{ true: "#fff", false: colors.misc["700"] }}
            ios_backgroundColor={colors.misc["700"]}
            thumbColor={receiveEmail ? colors.main : "#fff"}
            className="border border-main"
          />
        </View>
      </View>

      <View className="mb-8">
        <Text className="font-bold mb-4 text-2xl">
          Connect with people you know
        </Text>
        <View className="flex-row items-center justify-between">
          <Text className="flex-1 font-poppins-regular text-lg">
            Let others find your account by your email address.
          </Text>
          <Switch
            value={connect}
            onValueChange={setConnect}
            trackColor={{ true: "#fff", false: colors.misc["700"] }}
            ios_backgroundColor={colors.misc["700"]}
            thumbColor={connect ? colors.main : "#fff"}
            className="border border-main"
          />
        </View>
      </View>
    </View>
  );
};

export default CustomizationScreen;
