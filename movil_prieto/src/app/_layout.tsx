import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useTheme } from "../hooks/useTheme";

const client = new QueryClient();

export default function RootLayout() {
  const { colors, isDark } = useTheme();

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <QueryClientProvider client={client}>
        <View
          style={{ flex: 1, alignItems: "stretch", backgroundColor: colors.background }}
        >
          <StatusBar style={isDark ? "light" : "dark"} />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.background }
            }}
          />
        </View>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
