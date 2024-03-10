import { ContactsStackParamList } from "@/src/navigation/NavigationTypes";
import ContactsHomeScreen from "@/src/screens/contacts/ContactsHomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AddEditContactScreen from "../screens/contacts/AddEditContactScreen";

const Stack = createNativeStackNavigator<ContactsStackParamList>();

export default function ContactsStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContactsHomeStack"
        component={ContactsHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddEditContactStack"
        component={AddEditContactScreen}
      />
    </Stack.Navigator>
  );
}
