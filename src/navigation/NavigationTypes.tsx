import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootTabsParamList = {
  HomeTab: undefined;
  ContactsTab: ContactsStackParamList;
  BirthdaysTab: undefined;
  ProfileTab: undefined;
};

export type ContactsStackParamList = {
  ContactsHomeStack: undefined;
  HandleContactStack: { id?: string };
};

export type HomeStackParamList = {
  Home: undefined;
  CreateMessage: { id: string };
};

export type AuthStackParamList = {
  Main: undefined;
};

export type ContactsScreenProps<T extends keyof ContactsStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ContactsStackParamList, T>,
    BottomTabScreenProps<RootTabsParamList>
  >;

export type HomeScreenProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamList, T>,
    BottomTabScreenProps<RootTabsParamList>
  >;

export type RootScreenProps<T extends keyof RootTabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabsParamList, T>,
    NativeStackScreenProps<HomeStackParamList>
  >;
