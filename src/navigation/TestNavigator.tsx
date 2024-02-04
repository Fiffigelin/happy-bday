import { TestStackParamList } from "@/src/navigation/NavigationTypes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../screens/test-screens/Login";
import Main from "../screens/test-screens/Main";
import Test from "../screens/test-screens/Test";
import CredUser from "../screens/test-screens/CredUser";

const Stack = createNativeStackNavigator<TestStackParamList>();

export default function TestStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CredUser" component={CredUser} />
    </Stack.Navigator>
  );
}