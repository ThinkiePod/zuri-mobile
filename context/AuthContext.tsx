import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface Child {
  id: string;
  name: string;
  age: number;
  avatar: string;
  parentId: string;
}

interface AuthContextType {
  user: User | null;
  child: Child | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  authenticateWithBiometrics: () => Promise<void>;
  createChildProfile: (
    name: string,
    age: number,
    avatar: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for testing
const MOCK_USERS = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    password: "password123",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    password: "password123",
    createdAt: "2024-01-10T08:30:00Z",
  },
];

// Mock child data
const MOCK_CHILDREN = [
  {
    id: "1",
    name: "Emily",
    age: 5,
    avatar:
      "https://images.pexels.com/photos/1654489/pexels-photo-1654489.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    parentId: "1",
  },
  {
    id: "2",
    name: "Alex",
    age: 4,
    avatar:
      "https://images.pexels.com/photos/1912176/pexels-photo-1912176.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    parentId: "2",
  },
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [child, setChild] = useState<Child | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      const childData = await AsyncStorage.getItem("child");

      if (userData) {
        setUser(JSON.parse(userData));
      }

      if (childData) {
        setChild(JSON.parse(childData));
      }
    } catch (error) {
      console.error("Error checking auth state:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (!mockUser) {
        throw new Error("Invalid credentials");
      }

      const userData = {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        createdAt: mockUser.createdAt,
      };

      const childData = MOCK_CHILDREN.find((c) => c.parentId === mockUser.id);

      await AsyncStorage.setItem("user", JSON.stringify(userData));
      if (childData) {
        await AsyncStorage.setItem("child", JSON.stringify(childData));
        setChild(childData);
      }

      setUser(userData);

      // Navigate to main app
      router.replace("/(tabs)");
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if user already exists
      const existingUser = MOCK_USERS.find((u) => u.email === email);
      if (existingUser) {
        throw new Error("User already exists");
      }

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        createdAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);

      // Don't navigate here, let the signup flow continue to child profile
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.multiRemove(["user", "child"]);
      setUser(null);
      setChild(null);
      router.replace("/onboarding");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const authenticateWithBiometrics = async () => {
    try {
      const isAvailable = await LocalAuthentication.hasHardwareAsync();
      if (!isAvailable) {
        throw new Error("Biometric authentication not available");
      }

      const savedCredentials = await LocalAuthentication.isEnrolledAsync();
      if (!savedCredentials) {
        throw new Error("No biometric credentials saved");
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with biometrics",
        fallbackLabel: "Use password instead",
      });

      if (result.success) {
        // For demo purposes, sign in with the first mock user
        const mockUser = MOCK_USERS[0];
        const userData = {
          id: mockUser.id,
          name: mockUser.name,
          email: mockUser.email,
          createdAt: mockUser.createdAt,
        };

        const childData = MOCK_CHILDREN.find((c) => c.parentId === mockUser.id);

        await AsyncStorage.setItem("user", JSON.stringify(userData));
        if (childData) {
          await AsyncStorage.setItem("child", JSON.stringify(childData));
          setChild(childData);
        }

        setUser(userData);
        router.replace("/(tabs)");
      }
    } catch (error) {
      throw error;
    }
  };

  const createChildProfile = async (
    name: string,
    age: number,
    avatar: string
  ) => {
    try {
      if (!user) {
        throw new Error("User not authenticated");
      }

      const newChild = {
        id: Date.now().toString(),
        name,
        age,
        avatar,
        parentId: user.id,
      };

      await AsyncStorage.setItem("child", JSON.stringify(newChild));
      setChild(newChild);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        child,
        isLoading,
        signIn,
        signUp,
        signOut,
        authenticateWithBiometrics,
        createChildProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
