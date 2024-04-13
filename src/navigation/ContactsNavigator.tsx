import { ContactsStackParamList } from "@/src/navigation/NavigationTypes";
import ContactsHomeScreen from "@/src/screens/contacts/ContactsHomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CustomStackHeader from "../components/stack-header/customStackHeader";
import HandleContactScreen from "../screens/contacts/HandleContactScreen";

const Stack = createNativeStackNavigator<ContactsStackParamList>();

export default function ContactsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <CustomStackHeader />,
      }}
    >
      <Stack.Screen
        name="ContactsHomeStack"
        component={ContactsHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="HandleContactStack" component={HandleContactScreen} />
    </Stack.Navigator>
  );
}
