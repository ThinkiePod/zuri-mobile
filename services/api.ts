import { useAuth } from "@clerk/clerk-expo";
import React from "react";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000";

interface User {
  id: string;
  clerk_id: string;
  email: string;
  first_name: string;
  last_name: string;
  subscription_tier: string;
  created_at: string;
}

interface Device {
  device_id: string;
  device_name: string;
  device_type: string;
  firmware_version: string;
  user_id?: string;
  last_seen?: string;
  is_online: boolean;
  battery_level: number;
  location?: string;
  paired_at?: string;
  settings?: any;
}

interface ChildProfile {
  id: string;
  user_id: string;
  name: string;
  age: number;
  avatar_id: number;
  preferences?: any;
  created_at: string;
}

interface Content {
  content_id: string;
  title: string;
  type: string;
  age_range_min: number;
  age_range_max: number;
  duration: number;
  file_url: string;
  thumbnail_url?: string;
  is_premium: boolean;
  description?: string;
}

class ApiClient {
  private getToken: () => Promise<string | null>;

  constructor(getToken: () => Promise<string | null>) {
    this.getToken = getToken;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = await this.getToken();

    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(`${API_URL}${endpoint}`, config);

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ detail: "Unknown error" }));
      throw new Error(error.detail || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // User endpoints
  async getCurrentUser() {
    return this.request<User>("/auth/me");
  }

  async updateSubscription(tier: "basic" | "premium" | "family") {
    return this.request<User>("/auth/subscription", {
      method: "PUT",
      body: JSON.stringify({ tier }),
    });
  }

  // Device endpoints
  async pairDevice(deviceId: string, pairingCode: string) {
    return this.request<Device>("/devices/pair", {
      method: "POST",
      body: JSON.stringify({ device_id: deviceId, pairing_code: pairingCode }),
    });
  }

  async getUserDevices() {
    return this.request<Device[]>("/devices");
  }

  async getDevice(deviceId: string) {
    return this.request<Device>(`/devices/${deviceId}`);
  }

  async updateDevice(deviceId: string, data: Partial<Device>) {
    return this.request<Device>(`/devices/${deviceId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async unpairDevice(deviceId: string) {
    return this.request(`/devices/${deviceId}`, { method: "DELETE" });
  }

  async sendDeviceCommand(deviceId: string, action: string, params?: any) {
    return this.request(`/devices/${deviceId}/remote-control`, {
      method: "POST",
      body: JSON.stringify({ action, params }),
    });
  }

  // Child profile endpoints
  async createChildProfile(data: {
    name: string;
    age: number;
    avatar_id: number;
  }) {
    return this.request<ChildProfile>("/children", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getChildProfiles() {
    return this.request<ChildProfile[]>("/children");
  }

  async updateChildProfile(childId: string, data: Partial<ChildProfile>) {
    return this.request<ChildProfile>(`/children/${childId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteChildProfile(childId: string) {
    return this.request(`/children/${childId}`, { method: "DELETE" });
  }

  // Content endpoints
  async getContentLibrary(filters?: { age?: number; type?: string }) {
    const params = new URLSearchParams();
    if (filters?.age) params.append("age", filters.age.toString());
    if (filters?.type) params.append("type", filters.type);

    return this.request<Content[]>(`/content?${params}`);
  }

  async getPremiumContent() {
    return this.request<Content[]>("/content/premium");
  }

  // Analytics endpoints
  async getAnalyticsSummary(days: number = 7) {
    return this.request(`/analytics/summary?days=${days}`);
  }

  async getDeviceAnalytics(deviceId: string, days: number = 7) {
    return this.request(`/analytics/devices/${deviceId}?days=${days}`);
  }
}

// Hook to use API client
export function useApi() {
  const { getToken } = useAuth();

  // Create memoized API client
  const api = React.useMemo(() => new ApiClient(getToken), [getToken]);

  return api;
}
