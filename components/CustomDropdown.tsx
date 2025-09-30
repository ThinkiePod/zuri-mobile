import { colors } from "@/utils/colors";
import { MAIN, placeholderColor } from "@/utils/constants";
import { hexToHexWithAlpha } from "@/utils/utils";
import { Feather } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import cn from "clsx";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";

interface CustomItem {
  label: string;
  value: string | number;
}

interface Props extends Partial<DropdownProps<CustomItem>> {
  label: string;
  labelColor?: string;
  data: CustomItem[];
  labelState?:
    | "emptyStateLabel"
    | "noLabel"
    | "selectedStateLabel"
    | "allStateLabel";
  className?: string;
  showLeftIcon?: boolean;
}

export const CustomDropdown = ({
  label,
  labelColor,
  data,
  labelState,
  className,
  showLeftIcon,
  ...props
}: Props) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (labelState === "noLabel") return null;

    if (value || isFocus) {
      return (
        <Text
          className={cn(
            "absolute left-[22px] bg-custom-100 -top-[6px] z-[999] px-2 text-sm",
            isFocus && labelColor ? `text-[${labelColor}]` : "text-main"
          )}
        >
          {label}
        </Text>
      );
    }
    return null;
  };

  return (
    <View className={cn("bg-custom-100", className)}>
      {labelState === "emptyStateLabel" && (
        <Text className="text-lg font-inter-medium text-main mb-2 px-2">
          {label}
        </Text>
      )}

      {(labelState === "noLabel" || labelState === "selectedStateLabel") &&
        renderLabel()}

      {labelState === "allStateLabel" &&
        (!value ? (
          <Text className="text-lg font-inter-medium text-main mb-2 px-2">
            {label}
          </Text>
        ) : (
          renderLabel()
        ))}
      <Dropdown
        {...props}
        style={[styles.dropdown, isFocus && { borderColor: MAIN }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        containerStyle={{
          backgroundColor: colors.custom["100"],
          borderRadius: 16,
        }}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? `Select ${label}` : "..."}
        searchPlaceholder="Search..."
        searchPlaceholderTextColor={placeholderColor}
        value={value}
        activeColor={colors.custom["700"]}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() =>
          showLeftIcon ? (
            <AntDesign
              style={styles.icon}
              color={isFocus ? hexToHexWithAlpha(MAIN, 0.6) : MAIN}
              name="calendar"
              size={20}
            />
          ) : null
        }
        renderItem={(item) => {
          return (
            <View className="flex-row items-center justify-between p-4">
              <Text className="flex-1 text-lg font-inter-bold text-summary-400">
                {item.label}
              </Text>
              {item.value === value && (
                <Feather
                  style={styles.icon}
                  color={MAIN}
                  name="check-circle"
                  size={20}
                />
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4EDF8",
    padding: 16,
  },
  dropdown: {
    height: 52,
    borderColor: MAIN,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  placeholderStyle: {
    fontSize: 16,
    color: placeholderColor,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 25,
    borderColor: "#A367BB",
  },
});
