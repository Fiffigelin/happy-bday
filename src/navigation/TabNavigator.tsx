import { auth } from "@/firebase.config";
// import BirthdaysMessagesStackNavigator from "@/src/navigation/BirthdayMessagesNavigator";
import ContactsStackNavigator from "@/src/navigation/ContactsNavigator";
import { RootTabsParamList } from "@/src/navigation/NavigationTypes";
import ProfileScreen from "@/src/screens/ProfileScreen";
import { AuthUser } from "@/types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { fetchContactsAPI } from "../features/contact/contact.slice";
import { fetchImagesAPI } from "../features/image/image.slice";
import { fetchMessagesAPI } from "../features/message/message.slice";
import { useAppDispatch, useAppSelector } from "../features/store";
import { setActiveUser } from "../features/user/user.slice";
import MainScreen from "../screens/UserAuth/MainScreen";
import HomeStackNavigator from "./HomeNavigator";
import TestStackNavigator from "./TestNavigator";

const Tab = createBottomTabNavigator<RootTabsParamList>();
const Stack = createNativeStackNavigator<AuthStackParamList>();

export type AuthStackParamList = {
  Main: undefined;
};

export default function TabNavigator() {
  const [hasLoaded, setLoaded] = useState(false);

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

      // const fetchData = async () => {
      //   if (isUserFetched) {
      //     await dispatch(fetchImagesAPI());
      //     await dispatch(fetchContactsAPI(user!.id as string));
      //     await dispatch(fetchMessagesAPI(user!.id as string));
      //   }
      // };

      // fetchData();

      const checkStatusAndDoSomething = async () => {
        const isActionFulfilled = (action: any) =>
          action.meta.requestStatus === "fulfilled";
        const imagesAction = await dispatch(fetchImagesAPI());
        const contactsAction = await dispatch(
          fetchContactsAPI(user!.id as string)
        );
        const messagesAction = await dispatch(
          fetchMessagesAPI(user!.id as string)
        );

        if (
          isActionFulfilled(imagesAction) &&
          isActionFulfilled(contactsAction) &&
          isActionFulfilled(messagesAction)
        ) {
          console.log("Alla action har slutförts utan problem");
          setLoaded(true);
        } else {
          console.log("Något gick fel");
        }
      };

      if (user) {
        checkStatusAndDoSomething();
      }
    });

    return unsubscribe;
  }, [dispatch, user]);

  return (
    <NavigationContainer>
      {!user && !hasLoaded ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainScreen} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={{ headerShown: false, tabBarShowLabel: false }}
        >
          <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
          <Tab.Screen name="ContactsTab" component={ContactsStackNavigator} />
          {/* <Tab.Screen
            name="BirthdaysTab"
            component={BirthdaysMessagesStackNavigator}
          /> */}
          <Tab.Screen name="ProfileTab" component={ProfileScreen} />
          <Tab.Screen name="TestTab" component={TestStackNavigator} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
