import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import {
  DEVICE_STATUS,
  RECENT_ACTIVITIES,
  STORIES,
  type Activity,
} from "@/data/mockData";
import { router } from "expo-router";
import { Battery, BookOpen, Clock, Heart, Sparkles } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OnboardingScreen = () => {
  const { colors } = useTheme();
  const { user, child } = useAuth();
  const [greeting, setGreeting] = useState("Good morning");
  const [deviceStatus, setDeviceStatus] = useState(DEVICE_STATUS);
  const [recentActivities, setRecentActivities] = useState(
    RECENT_ACTIVITIES.slice(0, 3)
  );
  const [todayHighlight, setTodayHighlight] = useState(STORIES[0]);
  const [unreadMessages, setUnreadMessages] = useState(2);

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }

    // Simulate battery drain over time
    const interval = setInterval(() => {
      setDeviceStatus((prev) => ({
        ...prev,
        batteryLevel: Math.max(5, prev.batteryLevel - Math.random() * 2),
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getBatteryColor = (level: number) => {
    if (level > 50) return colors.success;
    if (level > 20) return colors.warning;
    return colors.error;
  };

  const getBatteryIcon = (level: number) => {
    return <Battery size={20} color={getBatteryColor(level)} />;
  };

  const quickActions = [
    {
      id: "story",
      title: "Play Story",
      icon: <BookOpen size={24} color="white" />,
      color: colors.primary,
      onPress: () => router.push("/library"),
    },
    {
      id: "affirmation",
      title: "Daily Affirmation",
      icon: <Heart size={24} color="white" />,
      color: colors.secondary,
      onPress: () => {
        Alert.alert(
          "Playing Affirmation",
          'Starting "I Am Smart" affirmation...'
        );
      },
    },
    {
      id: "phonics",
      title: "Phonics Game",
      icon: <Sparkles size={24} color="white" />,
      color: colors.accent,
      onPress: () => {
        Alert.alert("Starting Game", "Loading CVC Words game...");
      },
    },
    {
      id: "routine",
      title: "Start Routine",
      icon: <Clock size={24} color="white" />,
      color: colors.tertiary,
      onPress: () => {
        const hour = new Date().getHours();
        const routineType =
          hour < 12 ? "Morning" : hour > 19 ? "Bedtime" : "After-School";
        Alert.alert("Starting Routine", `Beginning ${routineType} routine...`);
      },
    },
  ];

  const handleActivityPress = (activity: Activity) => {
    Alert.alert(
      `Resume ${activity.type}`,
      `Continue with "${activity.title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Resume",
          onPress: () => console.log("Resuming activity:", activity.id),
        },
      ]
    );
  };

  const handleDeviceSettings = () => {
    router.push("/customize");
  };

  const handleMessages = () => {
    Alert.alert("Messages", "Opening conversation with Zuri...");
    setUnreadMessages(0);
  };
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <ScrollView>
        <Text>Edit app/index.tsx to edit this screen.</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  greeting: {
    fontFamily: "Quicksand-Regular",
    fontSize: 16,
    marginBottom: 4,
  },
  childName: {
    fontFamily: "Nunito-Bold",
    fontSize: 24,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontFamily: "Nunito-Bold",
  },
  avatarContainer: {
    marginLeft: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  deviceStatus: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  deviceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  deviceTitleContainer: {
    flex: 1,
  },
  deviceTitle: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 16,
    marginBottom: 4,
  },
  connectionIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  connectionText: {
    fontFamily: "Quicksand-Bold",
    fontSize: 12,
    marginLeft: 4,
  },
  statusDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    fontFamily: "Quicksand-Medium",
    fontSize: 14,
    marginLeft: 6,
  },
  quickActionsContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
  },
  seeAllText: {
    fontFamily: "Quicksand-Bold",
    fontSize: 14,
  },
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionButton: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  actionIcon: {
    marginRight: 12,
  },
  actionText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 14,
    color: "white",
    flex: 1,
  },
  todayHighlightsContainer: {
    marginBottom: 24,
  },
  highlightCard: {
    flexDirection: "row",
    borderRadius: 16,
    overflow: "hidden",
    height: 160,
  },
  highlightContent: {
    flex: 3,
    padding: 16,
    justifyContent: "center",
  },
  highlightTitle: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
    marginBottom: 8,
  },
  highlightText: {
    fontFamily: "Quicksand-Regular",
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  playButtonText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 14,
    marginLeft: 4,
  },
  highlightImage: {
    flex: 2,
    height: "100%",
    resizeMode: "cover",
  },
  streakContainer: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  streakContent: {
    alignItems: "center",
  },
  streakTitle: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
    marginBottom: 4,
    textAlign: "center",
  },
  streakText: {
    fontFamily: "Quicksand-Regular",
    fontSize: 14,
    textAlign: "center",
  },
  recentActivityContainer: {
    marginBottom: 24,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  activityImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 14,
    marginBottom: 4,
  },
  activityMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  activityTime: {
    fontFamily: "Quicksand-Regular",
    fontSize: 12,
  },
  summaryContainer: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  summaryTitle: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center",
  },
  summaryStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontFamily: "Nunito-Bold",
    fontSize: 20,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: "Quicksand-Regular",
    fontSize: 12,
    textAlign: "center",
  },
  viewInsightsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  viewInsightsText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 14,
    marginRight: 4,
  },
});

export default OnboardingScreen;
