import BirthdaysMessagesStackNavigator from "@/src/navigation/BirthdayMessagesNavigator";
import ContactsStackNavigator from "@/src/navigation/ContactsNavigator";
import { RootTabsParamList } from "@/src/navigation/NavigationTypes";
import HomeScreen from "@/src/screens/HomeScreen";
import ProfileScreen from "@/src/screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Test from "../screens/test-screens/Test";
import TestStackNavigator from "./TestNavigator";

const Tab = createBottomTabNavigator<RootTabsParamList>();

export default function TabNavigator() {
  // // Hårdkoda testanvändarens UID
  // const firebaseapp = app;
  // const testUserId = "SLEqB0RUaFNzw9BtNsG3MOU2M2f2";

  // // Logga in testanvändaren med hårdkodat UID
  // const signInTestUser = async () => {
  //   try {
  //     await auth().signInWithEmailAndPassword(
  //       testUserId + "test@gmail.com",
  //       "password123"
  //     );
  //     // Användaren är nu inloggad med det hårdkodade UID
  //   } catch (error) {
  //     console.error("Inloggningsfel:", error);
  //   }
  // };

  // useEffect(() => {
  //   signInTestUser();
  //   console.log();
  // });

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
        <Tab.Screen name="TestTab" component={TestStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
