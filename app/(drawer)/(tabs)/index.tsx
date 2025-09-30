import { colors } from "@/utils/colors";
import { assets } from "@/utils/images";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BatteryFullIcon, Bell, Book, Heart, Send } from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });

  const data = [
    { value: 2, label: "4" },
    { value: 4, label: "5" },
    { value: 8, label: "6" },
    { value: 10, label: "7" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-custom-100 h-full">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ overflow: "visible" }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-5">
          <View className="flex-row items-center">
            <View className="size-16 items-center justify-center mr-3 rounded-full bg-main">
              <Text className="text-base text-white font-inter-semibold">
                B
              </Text>
            </View>
            <Text className="text-lg text-custom-800 font-inter-semibold">
              Bembem
            </Text>
          </View>
          <TouchableOpacity className="bg-white p-2 rounded-full">
            <Bell size={24} color={colors.custom["800"]} />
          </TouchableOpacity>
        </View>

        {/* Status Card */}
        <View
          className="bg-custom-400 m-5 p-5 rounded-2xl shadow-md elevation-4 relative"
          // style={{ overflow: "visible" }}
        >
          <Image
            resizeMode="contain"
            source={assets.image.zuri}
            // style={{ width: 50, height: 50 }}
            className="absolute -top-4 -left-6 size-56 z-20"
          />
          <View style={styles.statusHeader}>
            <View className="gap-4 ml-auto">
              <Text style={styles.statusText} className="text-2xl">
                Zuri is Active
              </Text>
              <View className="items-start gap-4 bg-main p-4 rounded-lg">
                <View className="flex-row items-center gap-2">
                  <BatteryFullIcon size={32} color="#FFFFFF" />
                  <Text
                    style={styles.batteryText}
                    className="text-xl font-extrabold text-white"
                  >
                    90%
                  </Text>
                </View>
                <Text className="text-white" style={styles.lastInteraction}>
                  Last interaction 1:54 PM
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Daily Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Summary</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryCard} className="bg-summary-100">
              <Book size={24} color="#000000" />
              <Text style={styles.summaryLabel}>Stories Played</Text>
              <Text style={styles.summaryNumber}>2</Text>
            </View>
            <View style={styles.summaryCard} className="bg-summary-200">
              <MaterialCommunityIcons
                name="hands-pray"
                size={24}
                color="#000000"
              />
              <Text style={styles.summaryLabel}>Affirmations Said</Text>
              <Text style={styles.summaryNumber}>3</Text>
            </View>
            <View style={styles.summaryCard} className="bg-summary-300">
              <Ionicons
                name="extension-puzzle-outline"
                size={24}
                color="#FFFFFF"
              />
              <Text style={styles.summaryLabel} className="text-white">
                Learning Activities
              </Text>
              <Text style={styles.summaryNumber} className="text-white">
                2
              </Text>
            </View>
            <View style={styles.summaryCard} className="bg-summary-400">
              <MaterialCommunityIcons name="alarm" size={24} color="#FFFFFF" />
              <Text style={styles.summaryLabel} className="text-white">
                Routines Completed
              </Text>
              <Text style={styles.summaryNumber} className="text-white">
                1
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View className="flex-row gap-4 items-center h-64">
            <View className="gap-4 p-2 bg-main rounded-lg h-full justify-center">
              <TouchableOpacity className="flex-row px-4 py-3 items-center">
                <Ionicons name="play-circle" size={32} color="white" />
                <Text className="font-poppins-medium text-lg ml-2 text-white">
                  Play Story
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row px-4 py-3 items-center">
                <MaterialCommunityIcons
                  name="hands-pray"
                  size={32}
                  color="white"
                />
                <Text className="font-poppins-medium text-lg ml-2 text-white">
                  Say Affirmation
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row px-4 py-3 items-center">
                <Send size={24} color="white" />
                <Text className="font-poppins-medium text-lg ml-2 text-white">
                  Send Message
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-1 bg-custom-200 rounded-lg gap-4 h-full p-2">
              <Text className="text-lg font-poppins-medium">Reading</Text>
              <View className="flex-1 bg-custom-500 rounded-md p-2 gap-y-2">
                <Text className="font-poppins-medium">Reading Streak</Text>

                <View
                  className="flex-1"
                  onLayout={(e) => {
                    const { width, height } = e.nativeEvent.layout;
                    setChartDimensions({
                      width: width - 20,
                      height: height - 20,
                    });
                  }}
                >
                  <LineChart
                    data={data}
                    areaChart
                    initialSpacing={0}
                    maxValue={12}
                    showVerticalLines
                    verticalLinesColor="rgba(252, 252, 254, 0.5)"
                    verticalLinesZIndex={1}
                    verticalLinesThickness={2}
                    yAxisThickness={0}
                    hideYAxisText
                    xAxisThickness={0}
                    endFillColor={colors.custom["700"]}
                    startFillColor={colors.custom["700"]}
                    xAxisLabelTextStyle={{
                      fontFamily: "Poppins-Regular",
                      fontSize: 12,
                      fontWeight: "500",
                    }}
                    color={colors.custom["700"]}
                    hideRules={true}
                    dataPointsRadius={4}
                    width={chartDimensions.width}
                    height={chartDimensions.height}
                    spacing={chartDimensions.width / data.length + 10}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={[styles.section]}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Book size={16} color="#007AFF" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>
                  Just started school feelings
                </Text>
                <Text style={styles.activityTime}>37 mins ago</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.viewButton}>View</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.activityItem, { zIndex: 1000 }]}>
              <View style={styles.activityIcon}>
                <Heart size={16} color="#FF3B30" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>
                  Just played &ldquo;The Little Bird&ldquo;
                </Text>
                <Text style={styles.activityTime}>59 mins ago</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.viewButton}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    // fontSize: 16,
    // color: "#ffffff",
    fontFamily: "Inter-SemiBold",
  },
  username: {
    fontSize: 18,
    color: "#1a1a1a",
    fontFamily: "Inter-SemiBold",
  },
  statusCard: {
    backgroundColor: "#ffffff",
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    // fontSize: 16,
    // color: "#1a1a1a",
    // marginLeft: 8,
    fontFamily: "Inter-SemiBold",
  },
  batteryText: {
    // fontSize: 14,
    // color: "#4CAF50",
    fontFamily: "Inter-Medium",
  },
  lastInteraction: {
    fontSize: 16,
    // color: "#666666",
    fontFamily: "Inter-Regular",
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  summaryCard: {
    // backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    flex: 1,
    minWidth: "20%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryNumber: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    // color: "#1a1a1a",
    marginTop: 8,
  },
  summaryLabel: {
    fontSize: 10,
    textAlign: "center",
    fontFamily: "Inter-Medium",
    // color: "#666666",
    marginTop: 4,
  },
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  quickAction: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#1a1a1a",
    marginLeft: 8,
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f0f8ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#666666",
  },
  viewButton: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#007AFF",
  },
});

export default HomeScreen;
