import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import TabNavigator from "src/navigation/TabNavigator";
import store from "./src/features/store";

export default function App() {
  return (
    <SafeAreaProvider testID="safe-area-provider">
      <Provider store={store}>
        <TabNavigator />
      </Provider>
    </SafeAreaProvider>
  );
}
