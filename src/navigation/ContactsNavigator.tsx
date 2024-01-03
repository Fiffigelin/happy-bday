import { ContactsStackParamList } from "@/src/navigation/NavigationTypes";
import ContactsHomeScreen from "@/src/screens/contacts/ContactsHomeScreen";
import ContactsScreen from "@/src/screens/contacts/HandleContact";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator<ContactsStackParamList>();

export default function ContactsStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContactsHomeStack"
        component={ContactsHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ContactStack" component={ContactsScreen} />
    </Stack.Navigator>
  );
}
