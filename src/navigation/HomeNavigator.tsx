import { HomeStackParamList } from "@/src/navigation/NavigationTypes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CreateMessage from "../screens/home/CreateMessage";
import HandleMessage from "../screens/home/HandleMessage";
import HomeScreen from "../screens/home/HomeScreen";

export type HomeStack = {
  Home: undefined;
  CreateMessage: { id: string };
  HandleMessage: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="CreateMessage" component={CreateMessage} />
      <Stack.Screen name="HandleMessage" component={HandleMessage} />
    </Stack.Navigator>
  );
}
