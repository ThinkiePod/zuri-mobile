import { welcomeImages, WelcomeProps } from "@/utils/constants";
import { scaleFont } from "@/utils/utils";
import cn from "clsx";
import { Dimensions, Image, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

interface Props {
  item: WelcomeProps;
  index: number;
  x: SharedValue<number>;
}

export const RenderWelcome = ({ index, x, item: { style, image } }: Props) => {
  const imageAnimation = useAnimatedStyle(() => {
    const translateAnimation = interpolate(
      x.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [150, 0, -150],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      x.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.3, 1, 0.3],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY: translateAnimation }],
      opacity,
    };
  });

  return (
    <SafeAreaView
      className={cn(
        "flex-1 p-6 pt-20",
        index % 3 === 0
          ? "bg-main"
          : index % 3 === 1
            ? "bg-custom-700"
            : "bg-custom-200"
      )}
      style={{
        width,
      }}
    >
      <View className="items-start mb-12">
        <Text
          className={cn(
            "font-inter-bold mb-2",
            style === "light" && "text-white"
          )}
          style={[{ fontSize: scaleFont(52, width) }]}
        >
          Zuri is Ready
        </Text>
        <Text
          className={cn("font-inter-bold", style === "light" && "text-white")}
          style={[{ fontSize: scaleFont(44, width) }]}
        >
          When you are!
        </Text>
      </View>

      <Animated.View
        className="w-full h-[400px] items-center justify-center p-2 rounded-xl"
        style={imageAnimation}
      >
        <Image
          source={welcomeImages[image]}
          className="size-full"
          resizeMode="contain"
        />
      </Animated.View>
    </SafeAreaView>
  );
};
