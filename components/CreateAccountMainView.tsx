import { colors } from "@/utils/colors";
import { placeholderColor } from "@/utils/constants";
import { FontAwesome } from "@expo/vector-icons";
import cn from "clsx";
import { Text, TextInput, View } from "react-native";

interface Props {
  formData: {
    name: string;
    phone: string;
    dateOfBirth: string;
  };
  setFormData: (data: any) => void;
}

export const MainView = ({ formData, setFormData }: Props) => {
  return (
    <>
      <View className={cn("mb-10", !formData.name && "mt-8")}>
        <Text
          className={cn(
            "absolute px-2 text-main z-[999] bg-custom-100",
            formData.name
              ? "-top-[6px] left-[20px] text-sm"
              : "-top-[30px] text-lg font-inter-medium"
          )}
        >
          Name
        </Text>
        <View className="flex-row items-center border border-main rounded-lg">
          <TextInput
            className="flex-1 h-[50px] px-4 text-base font-inter-regular"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Enter your name"
            placeholderTextColor={placeholderColor}
          />
          {formData.name.trim() !== "" && (
            <View className="p-3">
              <FontAwesome name="check-circle" size={20} color={colors.main} />
            </View>
          )}
        </View>
      </View>

      <View className={cn("mb-10", !formData.phone && "mt-8")}>
        <Text
          className={cn(
            "absolute px-2 text-main z-[999] bg-custom-100",
            formData.phone
              ? "-top-[6px] left-[20px] text-sm"
              : "-top-[30px] text-lg font-inter-medium"
          )}
        >
          Phone/Email
        </Text>
        {/* <Text className="text-base mb-2 font-inter-medium">Phone/Email</Text> */}
        <View className="flex-row items-center border border-main rounded-lg">
          <TextInput
            className="flex-1 h-[50px]  px-4 text-base font-inter-regular"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            placeholder="Enter phone or email"
            placeholderTextColor={placeholderColor}
            keyboardType="email-address"
          />
          {formData.phone.trim() !== "" && (
            <View className="p-3">
              <FontAwesome name="check-circle" size={20} color={colors.main} />
            </View>
          )}
        </View>
      </View>

      <View className={cn("mb-10", !formData.dateOfBirth && "mt-8")}>
        <Text
          className={cn(
            "absolute px-2 text-main z-[999] bg-custom-100",
            formData.dateOfBirth
              ? "-top-[6px] left-[20px] text-sm"
              : "-top-[30px] text-lg font-inter-medium"
          )}
        >
          Date of birth
        </Text>
        {/* <Text className="text-base mb-2 font-inter-medium">Date of birth</Text> */}
        <View className="flex-row items-center border border-main rounded-lg">
          <TextInput
            className="flex-1 h-[50px]  px-4 text-base font-inter-regular"
            value={formData.dateOfBirth}
            onChangeText={(text) =>
              setFormData({ ...formData, dateOfBirth: text })
            }
            placeholder="DD/MM/YYYY"
            placeholderTextColor={placeholderColor}
          />
          {/* <DatePicker date={date} onDateChange={setDate} /> */}
          {formData.dateOfBirth.trim() !== "" && (
            <View className="p-3">
              <FontAwesome name="check-circle" size={20} color={colors.main} />
            </View>
          )}
        </View>
      </View>
    </>
  );
};
