import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export async function scheduleLearningReminder(childName: string, time: Date) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Learning Time! 📚",
      body: `${childName} is ready for their learning session with Zuri!`,
      data: { type: "learning_reminder" },
    },
    trigger: {
      // date: time,
      hour: time.getHours(),
      minute: time.getMinutes(),
      // repeats: true,
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
    },
  });
}

export async function sendDeviceStatusNotification(status: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Zuri Device Update",
      body: status,
      data: { type: "device_status" },
    },
    trigger: null,
  });
}
