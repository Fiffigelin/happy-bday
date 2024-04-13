import { auth } from "@/firebase.config";
import ContactsStackNavigator from "@/src/navigation/ContactsNavigator";
import { RootTabsParamList } from "@/src/navigation/NavigationTypes";
import ProfileScreen from "@/src/screens/ProfileScreen";
import { AuthUser } from "@/types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import CustomTabBarIcon from "../components/tab-icon/tabIcon";
import { fetchContactsAPI } from "../features/contact/contact.slice";
import { fetchImagesAPI } from "../features/image/image.slice";
import { fetchMessagesAPI } from "../features/message/message.slice";
import { useAppDispatch, useAppSelector } from "../features/store";
import { setActiveUser } from "../features/user/user.slice";
import MainScreen from "../screens/UserAuth/MainScreen";
import HomeStackNavigator from "./HomeNavigator";

const Tab = createBottomTabNavigator<RootTabsParamList>();
const Stack = createNativeStackNavigator<AuthStackParamList>();

export type AuthStackParamList = {
  Main: undefined;
};

export default function TabNavigator() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [hasStatus, setStatus] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (response) => {
      if (response) {
        const fetchedUser: AuthUser = {
          uid: response.uid,
          email: response.email!,
        };
        dispatch(setActiveUser(fetchedUser));
      } else {
        dispatch(setActiveUser(undefined));
        setStatus(false);
      }

      async function checkStatus() {
        const isActionFulfilled = (action: any) =>
          action.meta.requestStatus === "fulfilled";
        const imagesAction = await dispatch(fetchImagesAPI());
        const contactsAction = await dispatch(fetchContactsAPI(user!.id));
        const messagesAction = await dispatch(fetchMessagesAPI(user!.id));

        if (
          isActionFulfilled(imagesAction) &&
          isActionFulfilled(contactsAction) &&
          isActionFulfilled(messagesAction)
        ) {
          setStatus(true);
        } else {
          setStatus(false);
        }
      }

      if (user !== null && !hasStatus) {
        checkStatus();
      }
    });

    return unsubscribe;
  }, [user?.id]);

  return (
    <NavigationContainer>
      {user === null ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainScreen} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: "#7110ae",
              borderColor: "transparent",
            },
          }}
        >
          <Tab.Screen
            name="HomeTab"
            component={HomeStackNavigator}
            options={{
              tabBarIcon: (props) => (
                <CustomTabBarIcon
                  focused={props.focused}
                  iconName={"home"}
                  iconSize={24}
                />
              ),
            }}
          />
          <Tab.Screen
            name="ContactsTab"
            component={ContactsStackNavigator}
            options={{
              tabBarIcon: (props) => (
                <CustomTabBarIcon
                  focused={props.focused}
                  iconName={"people"}
                  iconSize={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="ProfileTab"
            component={ProfileScreen}
            options={{
              tabBarIcon: (props) => (
                <CustomTabBarIcon
                  focused={props.focused}
                  iconName={"happy"}
                  iconSize={26}
                />
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
