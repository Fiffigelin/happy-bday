import { TestStackParamList } from "@/src/navigation/NavigationTypes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CredUser from "../screens/test-screens/CredUser";
import Main from "../screens/test-screens/Main";
import ShareImage from "../screens/SendMessage";

const Stack = createNativeStackNavigator<TestStackParamList>();

export default function TestStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="CredUser" component={CredUser} />
      <Stack.Screen name="Send" component={ShareImage} />
    </Stack.Navigator>
  );
}
