import { HomeStackParamList } from "@/src/navigation/NavigationTypes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CustomStackHeader from "../components/stack-header/customStackHeader";
import CreateMessage from "../screens/home/CreateMessage";
import HomeScreen from "../screens/home/HomeScreen";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <CustomStackHeader />,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="CreateMessage" component={CreateMessage} />
    </Stack.Navigator>
  );
}
