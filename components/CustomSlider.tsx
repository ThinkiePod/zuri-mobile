import { colors } from "@/utils/colors";
import { hexToRgba } from "@/utils/utils";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  LayoutChangeEvent,
  PanResponder,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

type SliderMode = "single" | "range";
type LabelFormatter = (value: number) => string;

type CustomSliderProps = {
  // Core functionality
  value?: number;
  lowValue?: number;
  highValue?: number;
  mode?: SliderMode;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  onValuesChange?: (low: number, high: number) => void;

  // Appearance
  trackHeight?: number;
  minimumTrackColor?: string;
  maximumTrackColor?: string;
  rangeTrackColor?: string;
  thumbSize?: number;
  thumbColor?: string;
  secondThumbColor?: string;
  style?: ViewStyle;

  // Labels and formatting
  showLabels?: boolean;
  labelFormatter?: LabelFormatter;
  showCurrentValue?: boolean;
  currentValuePosition?: "top" | "bottom" | "none";

  // Ticks and marks
  showTicks?: boolean;
  numberOfTicks?: number;
  tickColor?: string;
  showStepMarkers?: boolean;

  // Behavior
  disabled?: boolean;
  allowCross?: boolean; // For range mode: allow thumbs to cross each other
  snapToStep?: boolean;

  // Accessibility
  accessibilityLabel?: string;
  minimumAccessibilityLabel?: string;
  maximumAccessibilityLabel?: string;
};

const CustomSlider: React.FC<CustomSliderProps> = ({
  // Core functionality
  value = 0,
  lowValue = 0,
  highValue = 100,
  mode = "single",
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  onValueChange,
  onValuesChange,

  // Appearance
  trackHeight = 8,
  minimumTrackColor = colors.main,
  maximumTrackColor = "#ccc",
  rangeTrackColor = colors.main,
  thumbSize = 20,
  thumbColor = colors.main,
  secondThumbColor = colors.main,
  style,

  // Labels and formatting
  showLabels = true,
  labelFormatter = (val) => val.toString(),
  showCurrentValue = false,
  currentValuePosition = "top",

  // Ticks and marks
  showTicks = false,
  numberOfTicks = 5,
  tickColor = "#999",
  showStepMarkers = false,

  // Behavior
  disabled = false,
  allowCross = true,
  snapToStep = true,

  // Accessibility
  accessibilityLabel,
  minimumAccessibilityLabel,
  maximumAccessibilityLabel,
}) => {
  const panX = useRef(new Animated.Value(0)).current;
  const panX2 = useRef(new Animated.Value(0)).current; // For range mode
  const trackWidth = useRef(0);
  const currentValue = useRef(mode === "single" ? value : lowValue);
  const currentHighValue = useRef(highValue);
  const [activeThumb, setActiveThumb] = useState<"low" | "high" | null>(null);

  // Snap value to step if enabled
  const snapValue = (val: number) => {
    if (!snapToStep || step <= 0) return val;
    const stepped =
      Math.round((val - minimumValue) / step) * step + minimumValue;
    return Math.min(Math.max(stepped, minimumValue), maximumValue);
  };

  const getPositionForValue = (val: number) => {
    const range = maximumValue - minimumValue;
    return ((val - minimumValue) / range) * trackWidth.current;
  };

  const getValueForPosition = (position: number) => {
    const range = maximumValue - minimumValue;
    const percent = Math.min(Math.max(position / trackWidth.current, 0), 1);
    const rawValue = minimumValue + percent * range;
    return snapValue(rawValue);
  };

  // Default label formatter based on use case
  const getDefaultFormatter = (): LabelFormatter => {
    if (maximumValue <= 1) {
      return (val) => `${Math.round(val * 100)}%`;
    }
    if (maximumValue > 1000) {
      return (val) => `${Math.round(val / 1000)}k`;
    }
    if (step < 1) {
      return (val) => val.toFixed(1);
    }
    return (val) => Math.round(val).toString();
  };

  const formatLabel = labelFormatter || getDefaultFormatter();

  let gestureStartX = 0;
  let gestureStartX2 = 0;

  // Single thumb pan responder
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: () => {
        if (mode === "range") {
          setActiveThumb("low");
        }
        panX.stopAnimation((val) => {
          gestureStartX = val;
        });
      },
      onPanResponderMove: (_, gestureState) => {
        const newX = Math.min(
          Math.max(gestureStartX + gestureState.dx, 0),
          trackWidth.current
        );
        panX.setValue(newX);
        const newValue = getValueForPosition(newX);

        if (mode === "single") {
          currentValue.current = newValue;
          onValueChange?.(newValue);
        } else {
          // Range mode - handle low value
          if (allowCross || newValue <= currentHighValue.current) {
            currentValue.current = newValue;
            onValuesChange?.(newValue, currentHighValue.current);
          }
        }
      },
      onPanResponderRelease: () => {
        setActiveThumb(null);
        const finalValue =
          mode === "single" ? currentValue.current : currentValue.current;
        Animated.spring(panX, {
          toValue: getPositionForValue(finalValue),
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  // Second thumb pan responder (for range mode)
  const panResponder2 = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled && mode === "range",
      onPanResponderGrant: () => {
        setActiveThumb("high");
        panX2.stopAnimation((val) => {
          gestureStartX2 = val;
        });
      },
      onPanResponderMove: (_, gestureState) => {
        const newX = Math.min(
          Math.max(gestureStartX2 + gestureState.dx, 0),
          trackWidth.current
        );
        panX2.setValue(newX);
        const newValue = getValueForPosition(newX);

        if (allowCross || newValue >= currentValue.current) {
          currentHighValue.current = newValue;
          onValuesChange?.(currentValue.current, newValue);
        }
      },
      onPanResponderRelease: () => {
        setActiveThumb(null);
        Animated.spring(panX2, {
          toValue: getPositionForValue(currentHighValue.current),
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  // Update positions when values change
  useEffect(() => {
    if (trackWidth.current) {
      if (mode === "single") {
        Animated.timing(panX, {
          toValue: getPositionForValue(value),
          duration: 200,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.timing(panX, {
          toValue: getPositionForValue(lowValue),
          duration: 200,
          useNativeDriver: false,
        }).start();
        Animated.timing(panX2, {
          toValue: getPositionForValue(highValue),
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    }
  }, [value, lowValue, highValue, maximumValue, minimumValue, mode]);

  const onLayoutTrack = (event: LayoutChangeEvent) => {
    trackWidth.current = event.nativeEvent.layout.width;
    if (mode === "single") {
      panX.setValue(getPositionForValue(currentValue.current));
    } else {
      panX.setValue(getPositionForValue(currentValue.current));
      panX2.setValue(getPositionForValue(currentHighValue.current));
    }
  };

  const renderTicks = () => {
    if (!showTicks && !showStepMarkers) return null;
    const ticks = [];

    if (showTicks && numberOfTicks >= 2) {
      for (let i = 0; i <= numberOfTicks - 1; i++) {
        ticks.push(
          <View
            key={`tick-${i}`}
            style={{
              position: "absolute",
              left: `${(i / (numberOfTicks - 1)) * 100}%`,
              width: 2,
              height: trackHeight + 6,
              backgroundColor: tickColor,
              transform: [{ translateX: -1 }],
            }}
          />
        );
      }
    }

    if (showStepMarkers && step > 0) {
      const stepCount = Math.floor((maximumValue - minimumValue) / step);
      for (let i = 0; i <= stepCount; i++) {
        const stepValue = minimumValue + i * step;
        const position =
          ((stepValue - minimumValue) / (maximumValue - minimumValue)) * 100;
        ticks.push(
          <View
            key={`step-${i}`}
            style={{
              position: "absolute",
              left: `${position}%`,
              width: 1,
              height: trackHeight + 3,
              backgroundColor: tickColor,
              opacity: 0.6,
              transform: [{ translateX: -0.5 }],
            }}
          />
        );
      }
    }

    return ticks;
  };

  const renderCurrentValue = () => {
    if (!showCurrentValue || currentValuePosition === "none") return null;

    const isTop = currentValuePosition === "top";
    const containerStyle = {
      position: "absolute" as const,
      [isTop ? "bottom" : "top"]: thumbSize + 18,
      left: 0,
      right: 0,
      alignItems: "center" as const,
    };

    return (
      <View style={containerStyle}>
        {mode === "single" ? (
          <Animated.View
            style={{
              transform: [
                {
                  translateX: Animated.add(panX, new Animated.Value(-80)),
                },
              ],
              backgroundColor: hexToRgba(colors.main, 0.8),
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 4,
            }}
          >
            <Text style={{ color: "white", fontSize: 12 }}>
              {formatLabel(currentValue.current)}
            </Text>
          </Animated.View>
        ) : (
          <>
            <Animated.View
              style={{
                position: "absolute",
                transform: [
                  {
                    translateX: Animated.add(panX, new Animated.Value(-80)),
                  },
                ],
                backgroundColor: hexToRgba(colors.main, 0.8),
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 4,
              }}
            >
              <Text style={{ color: "white", fontSize: 12 }}>
                {formatLabel(currentValue.current)}
              </Text>
            </Animated.View>
            <Animated.View
              style={{
                position: "absolute",
                transform: [
                  {
                    translateX: Animated.add(panX2, new Animated.Value(-80)),
                  },
                ],
                backgroundColor: hexToRgba(colors.main, 0.8),
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 4,
              }}
            >
              <Text style={{ color: "white", fontSize: 12 }}>
                {formatLabel(currentHighValue.current)}
              </Text>
            </Animated.View>
          </>
        )}
      </View>
    );
  };

  const renderRangeTrack = () => {
    if (mode !== "range") return null;

    return (
      <Animated.View
        style={[
          styles.rangeTrack,
          {
            backgroundColor: rangeTrackColor,
            height: trackHeight,
            left: panX,
            width: Animated.subtract(panX2, panX),
          },
        ]}
      />
    );
  };

  return (
    <View
      style={[{ width: "100%" }, style]}
      className="flex-row gap-2 items-center"
    >
      {showLabels && (
        <Text className="text-lg font-workSans-medium mr-4">
          {formatLabel(minimumValue)}
        </Text>
      )}

      <View
        style={[
          styles.container,
          { height: thumbSize + (showCurrentValue ? 40 : 0), flex: 1 },
        ]}
      >
        {renderCurrentValue()}

        <View
          style={[
            styles.track,
            {
              height: trackHeight,
              backgroundColor: maximumTrackColor,
              opacity: disabled ? 0.5 : 1,
            },
          ]}
          onLayout={onLayoutTrack}
        >
          {mode === "single" ? (
            <Animated.View
              style={[
                styles.minimumTrack,
                {
                  backgroundColor: minimumTrackColor,
                  width: panX,
                  height: trackHeight,
                },
              ]}
            />
          ) : (
            renderRangeTrack()
          )}

          {renderTicks()}

          {/* Primary thumb */}
          <Animated.View
            style={[
              styles.thumb,
              {
                backgroundColor: thumbColor,
                width: thumbSize,
                height: thumbSize,
                borderRadius: thumbSize / 2,
                opacity: disabled ? 0.5 : 1,
                transform: [
                  {
                    translateX: Animated.add(
                      panX,
                      new Animated.Value(-thumbSize / 2)
                    ),
                  },
                  {
                    scale:
                      activeThumb === "low" ||
                      (activeThumb === null && mode === "single")
                        ? 1.2
                        : 1,
                  },
                ],
              },
            ]}
            {...(!disabled ? panResponder.panHandlers : {})}
          />

          {/* Secondary thumb for range mode */}
          {mode === "range" && (
            <Animated.View
              style={[
                styles.thumb,
                {
                  backgroundColor: secondThumbColor,
                  width: thumbSize,
                  height: thumbSize,
                  borderRadius: thumbSize / 2,
                  opacity: disabled ? 0.5 : 1,
                  transform: [
                    {
                      translateX: Animated.add(
                        panX2,
                        new Animated.Value(-thumbSize / 2)
                      ),
                    },
                    {
                      scale: activeThumb === "high" ? 1.2 : 1,
                    },
                  ],
                },
              ]}
              {...(!disabled ? panResponder2.panHandlers : {})}
            />
          )}
        </View>
      </View>

      {showLabels && (
        <Text className="text-lg font-workSans-medium ml-4">
          {formatLabel(maximumValue)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: "100%",
    position: "relative",
  },
  track: {
    width: "100%",
    borderRadius: 999,
    backgroundColor: "#ccc",
    position: "relative",
  },
  minimumTrack: {
    position: "absolute",
    left: 0,
    top: 0,
    borderRadius: 999,
  },
  rangeTrack: {
    position: "absolute",
    top: 0,
    borderRadius: 999,
  },
  thumb: {
    position: "absolute",
    top: "50%",
    marginTop: -12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default CustomSlider;
