import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function ProfileStack() {
  const color = useThemeColor();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerBackground: () => (
          <View
            style={{
              backgroundColor: color.background,
              flex: 1,
              borderBottomColor: color.border,
              borderBottomWidth: 1,
            }}
          />
        ),
      }}
    />
  );
}
