import { router } from "expo-router";
import { Alert } from "react-native";

export function handleApiError(error: any) {
  if (error.message.includes("401")) {
    // Unauthorized - token expired
    Alert.alert("Session Expired", "Please sign in again", [
      { text: "OK", onPress: () => router.replace("/auth/login") },
    ]);
  } else if (error.message.includes("403")) {
    // Forbidden - insufficient permissions
    Alert.alert("Access Denied", "You do not have permission for this action");
  } else if (error.message.includes("404")) {
    // Not found
    Alert.alert("Not Found", "The requested resource was not found");
  } else if (error.message.includes("network")) {
    // Network error
    Alert.alert("Network Error", "Please check your connection and try again");
  } else {
    // Generic error
    Alert.alert("Error", error.message || "Something went wrong");
  }
}
