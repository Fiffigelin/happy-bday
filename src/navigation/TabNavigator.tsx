import BirthdaysMessagesStackNavigator from "@/src/navigation/BirthdayMessagesNavigator";
import ContactsStackNavigator from "@/src/navigation/ContactsNavigator";
import { RootTabsParamList } from "@/src/navigation/NavigationTypes";
import HomeScreen from "@/src/screens/HomeScreen";
import ProfileScreen from "@/src/screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

const Tab = createBottomTabNavigator<RootTabsParamList>();

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: false, tabBarShowLabel: false }}
      >
        <Tab.Screen name="HomeTab" component={HomeScreen} />
        <Tab.Screen name="ContactsTab" component={ContactsStackNavigator} />
        <Tab.Screen
          name="BirthdaysTab"
          component={BirthdaysMessagesStackNavigator}
        />
        <Tab.Screen name="ProfileTab" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
