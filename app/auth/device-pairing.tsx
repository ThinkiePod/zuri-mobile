import { colors } from "@/utils/colors";
import { assets } from "@/utils/images";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { BluetoothSearching, RadioTower, Smile } from "lucide-react-native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DevicePairingScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-custom-100">
      <StatusBar style="dark" />

      <View className="flex-1 items-center p-6">
        <Image source={assets.image.logoThin} className="size-32" />
        <Text className="text-3xl font-inter-bold mb-16">Pair Device</Text>

        <View className="flex-row items-center mb-10 gap-x-4">
          <View style={styles.deviceIcon}>
            <Smile size={80} color={colors.main} strokeWidth={1} />
          </View>

          <View className="flex-row gap-x-4">
            <RadioTower size={30} color={colors.main} strokeWidth={1} />
            <BluetoothSearching size={40} color={colors.main} strokeWidth={1} />
          </View>
        </View>

        <Text className="text-xl font-poppins-regular text-center mb-10 leading-[22px]">
          To pair with Zuri, turn it on and select your device below
        </Text>

        <View className="w-full gap-3">
          <TouchableOpacity style={styles.connectButton}>
            <Text style={styles.connectButtonText}>Connect</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.push("/(drawer)/(tabs)")}
          >
            <Text className="font-inter-medium text-base">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    padding: 16,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    color: "#1a1a1a",
    marginBottom: 60,
  },
  deviceContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  deviceIcon: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#F4EDF8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#A367BB",
  },
  statusIcons: {
    flexDirection: "row",
    gap: 16,
  },
  instructions: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#666666",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
  },
  connectButton: {
    height: 50,
    backgroundColor: "#A367BB",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  connectButtonText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#ffffff",
  },
  cancelButton: {
    height: 50,
    borderWidth: 1,
    borderColor: "#A367BB",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: "#1a1a1a",
  },
});

export default DevicePairingScreen;
