// import { WelcomeCarousel } from "@/components/welcome/WelcomeCarousel";
import { RenderWelcome } from "@/components/welcome/RenderWelcome";
import { theme, WelcomeImageKey, WelcomeProps } from "@/utils/constants";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const welcomeVariants: { style: theme; image: WelcomeImageKey }[] = [
  { style: "light", image: "greyZuri" },
  { style: "dark", image: "purpleZuri" },
  { style: "dark", image: "purpleZuriBack" },
];

const WelcomeScreen = () => {
  const onboardingComplete = false;

  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useAnimatedRef<FlatList<WelcomeProps>>();
  const x = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  useEffect(() => {
    if (currentIndex === welcomeVariants.length - 1) {
      // Final screen reached — transition after short delay
      const timeout = setTimeout(() => {
        router.replace(onboardingComplete ? "/auth/intro" : "/onboarding");
      }, 1500);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: currentIndex + 1,
          animated: true,
        });
      }, 2400);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  if (onboardingComplete) return null;

  // return <WelcomeCarousel onboardingComplete={onboardingComplete} />;

  return (
    <View className="flex-1">
      <StatusBar
        style={
          welcomeVariants[currentIndex].style === "light" ? "light" : "dark"
        }
      />

      <Animated.FlatList
        ref={flatListRef}
        onScroll={onScroll}
        data={welcomeVariants}
        renderItem={({ item, index }) => {
          return <RenderWelcome item={item} index={index} x={x} />;
        }}
        keyExtractor={(item) => item.image}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />
    </View>
  );
};

export default WelcomeScreen;
