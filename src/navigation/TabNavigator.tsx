import { auth } from "@/firebase.config";
import BirthdaysMessagesStackNavigator from "@/src/navigation/BirthdayMessagesNavigator";
import ContactsStackNavigator from "@/src/navigation/ContactsNavigator";
import { RootTabsParamList } from "@/src/navigation/NavigationTypes";
import HomeScreen from "@/src/screens/HomeScreen";
import ProfileScreen from "@/src/screens/ProfileScreen";
import { AuthUser } from "@/types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../features/store";
import { setActiveUser } from "../features/user/user.slice";
import MainScreen from "../screens/UserAuth/MainScreen";
import TestStackNavigator from "./TestNavigator";

const Tab = createBottomTabNavigator<RootTabsParamList>();
const Stack = createNativeStackNavigator<AuthStackParamList>();

export type AuthStackParamList = {
  Main: undefined;
};

export default function TabNavigator() {
  const [isLoading, setIsLoading] = useState(false);

  const [isUserFetched, setUserFetched] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (response) => {
      if (response) {
        const fetchedUser: AuthUser = {
          uid: response.uid,
          email: response.email as string,
        };
        dispatch(setActiveUser(fetchedUser));
      } else {
        dispatch(setActiveUser(undefined));
      }
      setUserFetched(true);
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <NavigationContainer>
      {!user ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainScreen} />
        </Stack.Navigator>
      ) : (
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
      )}
    </NavigationContainer>
  );
}
