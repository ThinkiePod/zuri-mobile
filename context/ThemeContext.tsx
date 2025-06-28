import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

interface Colors {
  primary: string;
  primaryLight: string;
  secondary: string;
  secondaryLight: string;
  accent: string;
  accentLight: string;
  tertiary: string;
  tertiaryLight: string;
  background: string;
  backgroundLight: string;
  cardBackground: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  successLight: string;
  warning: string;
  error: string;
  disabledButton: string;
}

interface ThemeContextType {
  colors: Colors;
  isDark: boolean;
  toggleTheme: () => void;
}

const lightColors: Colors = {
  primary: "#5E9CF3",
  primaryLight: "#E3F2FD",
  secondary: "#8A64EC",
  secondaryLight: "#F3E5F5",
  accent: "#F97066",
  accentLight: "#FFEBEE",
  tertiary: "#F9A826",
  tertiaryLight: "#FFF8E1",
  background: "#FFFFFF",
  backgroundLight: "#F8F9FA",
  cardBackground: "#FFFFFF",
  text: "#1A1A1A",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  success: "#10B981",
  successLight: "#D1FAE5",
  warning: "#F59E0B",
  error: "#EF4444",
  disabledButton: "#9CA3AF",
};

const darkColors: Colors = {
  primary: "#5E9CF3",
  primaryLight: "#1E3A8A",
  secondary: "#8A64EC",
  secondaryLight: "#4C1D95",
  accent: "#F97066",
  accentLight: "#7F1D1D",
  tertiary: "#F9A826",
  tertiaryLight: "#92400E",
  background: "#111827",
  backgroundLight: "#1F2937",
  cardBackground: "#374151",
  text: "#F9FAFB",
  textSecondary: "#9CA3AF",
  border: "#4B5563",
  success: "#10B981",
  successLight: "#065F46",
  warning: "#F59E0B",
  error: "#EF4444",
  disabledButton: "#6B7280",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme) {
        setIsDark(savedTheme === "dark");
      }
    } catch (error) {
      console.error("Error loading theme:", error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDark;
      setIsDark(newTheme);
      await AsyncStorage.setItem("theme", newTheme ? "dark" : "light");
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ colors, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a Theme provider");
  }

  return context;
};
