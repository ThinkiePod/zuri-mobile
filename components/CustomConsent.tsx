import { Text, View } from "react-native";

const CustomConsent = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <View className="bg-custom-500 rounded-lg p-2 flex-row gap-4">
      <View className="rounded-full size-10 border-2 border-main justify-center items-center p-2">
        <View className="rounded-full size-6 bg-main" />
      </View>
      <View className="flex-1 gap-2">
        <Text className="text-wrap text-lg font-workSans-medium">{title}</Text>
        <Text className="text-wrap text-sm font-workSans-regular">{`"${subTitle}"`}</Text>
      </View>
    </View>
  );
};

export default CustomConsent;
