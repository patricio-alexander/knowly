import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useFonts } from "@expo-google-fonts/inter/useFonts";

import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_400Regular_Italic,
  Inter_500Medium_Italic,
  Inter_600SemiBold_Italic,
  Inter_700Bold_Italic,
} from "@expo-google-fonts/inter";
import { View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import AuthProvider from "@/context/AuthContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { GestureHandlerRootView } from "react-native-gesture-handler";
export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const color = useThemeColor();

  const queryClient = new QueryClient();

  let [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_400Regular_Italic,
    Inter_500Medium_Italic,
    Inter_600SemiBold_Italic,
    Inter_700Bold_Italic,
    Roboto_Medium: require("assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
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
            >
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="modal"
                options={{ presentation: "modal", title: "Modal" }}
              />

              <Stack.Screen name="(generation)/audio-to-notes" />
              <Stack.Screen name="(generation)/pdf-to-questions" />
              <Stack.Screen name="(generation)/[type]/[id]" />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
