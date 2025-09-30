import { Slot } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";

const AuthLayout = () => {
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "android" ? 0 : 10}
    >
      <Slot />
    </KeyboardAvoidingView>
  );
};

export default AuthLayout;
