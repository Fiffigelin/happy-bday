import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TabNavigator from "src/navigation/TabNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <TabNavigator />
    </SafeAreaProvider>
  );
}
