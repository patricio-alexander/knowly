import { Redirect, Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/ui/haptic-tab";
import { Icon } from "@/components/ui/Icon";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { Content } from "@/components/ui/Content";

export default function TabLayout() {
  const color = useThemeColor();
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Content style={{ justifyContent: "center" }}>
        <ActivityIndicator size="large" color={color.primary} />
      </Content>
    );
  }

  if (!session) {
    return <Redirect href="/signin" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: color.primary,
        tabBarInactiveTintColor: color.tabIconDefault,
        tabBarBackground: () => (
          <View
            style={{
              backgroundColor: color.background,
              flex: 1,
              borderTopColor: color.border,
              borderTopWidth: 0.5,
            }}
          />
        ),

        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <Icon name="house" color={color} size={20} />
          ),
        }}
      />

      <Tabs.Screen
        name="library"
        options={{
          title: "Biblioteca",
          tabBarIcon: ({ color }) => (
            <Icon name="folder-open" color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="subject"
        options={{
          title: "Materias",
          tabBarIcon: ({ color }) => (
            <Icon name="graduation-cap" color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <Icon name="user-large" color={color} size={20} />
          ),
        }}
      />
    </Tabs>
  );
}
