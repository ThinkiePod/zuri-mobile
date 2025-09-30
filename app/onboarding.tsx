import { colors } from "@/utils/colors";
import { welcomeImages } from "@/utils/constants";
import cn from "clsx";
import { useRouter } from "expo-router";

import { Image, Text, TouchableOpacity, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

interface DoneNextSkipButtonProps {
  nextLabel?: string | React.JSX.Element;
  skipLabel?: string | React.JSX.Element;
  allowFontScaling: boolean;
  onPress: () => any;
}

type Props = DoneNextSkipButtonProps & { isLight: boolean };

const OnboardingScreen = () => {
  const router = useRouter();

  const handleDone = () => {
    router.push("/auth/intro");
  };

  const DoneNextButton = ({ isLight, ...props }: Props) => {
    const { nextLabel, onPress } = props;
    return (
      <TouchableOpacity
        onPress={onPress}
        className={cn(
          "p-4 rounded-tl-3xl rounded-bl-xl",
          isLight ? "bg-main" : "bg-custom-200"
        )}
      >
        <Text
          className={cn(
            "text-lg font-bold font-inter-semibold",
            isLight && "text-white"
          )}
        >
          {nextLabel ?? "Get Started"}
        </Text>
      </TouchableOpacity>
    );
  };

  const SkipButton = ({ isLight, ...props }: Props) => {
    const { skipLabel, onPress } = props;
    return (
      <TouchableOpacity
        onPress={onPress}
        className={cn(
          "p-4 rounded-tr-3xl rounded-br-xl",
          isLight ? "bg-main" : "bg-custom-200"
        )}
      >
        <Text
          className={cn(
            "text-lg font-bold font-inter-semibold",
            isLight && "text-white"
          )}
        >
          {skipLabel}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1">
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        bottomBarHighlight={false}
        DotComponent={({ selected, isLight }) => {
          return (
            <View
              className={cn(
                "size-4 rounded-full mx-1",
                isLight && selected
                  ? "bg-main"
                  : isLight && !selected
                    ? "bg-main opacity-60"
                    : !isLight && selected
                      ? "bg-white"
                      : "bg-black/55"
              )}
            />
          );
        }}
        DoneButtonComponent={({ isLight, ...props }) => (
          <DoneNextButton isLight={isLight} {...props} />
        )}
        NextButtonComponent={({ isLight, ...props }) => (
          <DoneNextButton isLight={isLight} {...props} />
        )}
        SkipButtonComponent={({ isLight, ...props }) => (
          <SkipButton isLight={isLight} {...props} />
        )}
        pages={[
          {
            backgroundColor: colors.main,
            titleStyles: {
              fontSize: 32,
              fontFamily: "Inter-Bold",
            },
            subTitleStyles: {
              fontSize: 20,
              fontWeight: "600",
              textAlign: "center",
              fontFamily: "Inter-Medium",
            },
            image: <Image source={welcomeImages.greyZuri} />,
            title: "Friendly & Reassuring",
            subtitle: `"Say hello to Zuri, your little one's new reading buddy! From affirmations to storytelling, Zuri is here to inspire confidence, one joyful interaction at a time."`,
          },
          {
            backgroundColor: colors.custom["300"],
            titleStyles: {
              fontSize: 32,
              fontFamily: "Inter-Bold",
            },
            subTitleStyles: {
              fontSize: 20,
              fontWeight: "600",
              textAlign: "center",
              fontFamily: "Inter-Medium",
            },
            image: <Image source={welcomeImages.greyZuri} />,
            title: "Empowering & Educational",
            subtitle: `"Welcome to Zuri’s world, where reading meets encouragement. Whether it’s learning new words or practicing sounds, Zuri is ready to grow with your child every step of the way."`,
          },
          {
            backgroundColor: colors.custom["200"],
            titleStyles: {
              fontSize: 32,
              fontFamily: "Inter-Bold",
            },
            subTitleStyles: {
              fontSize: 20,
              fontWeight: "600",
              textAlign: "center",
              fontFamily: "Inter-Medium",
            },
            image: <Image source={welcomeImages.greyZuri} />,
            title: "Warm & Nurturing",
            subtitle: `"You’re all set! Zuri is now part of your family’s learning journey, bringing comfort, fun, and mindful moments your child will love."`,
          },
        ]}
      />
    </View>
  );
};

export default OnboardingScreen;
