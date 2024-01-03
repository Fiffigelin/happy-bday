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
  ContactStack: undefined;
};

export type BirthdaysStackParamList = {
  BirthdayMessages: undefined;
  CreateMessage: undefined;
  HandleMessage: undefined;
};

// en generisk funktion där stack navigationen känner till tab navigationen
export type ContactsScreenProps<T extends keyof ContactsStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ContactsStackParamList, T>,
    BottomTabScreenProps<RootTabsParamList>
  >;

export type BirthdaysScreenProps<T extends keyof BirthdaysStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<BirthdaysStackParamList, T>,
    BottomTabScreenProps<RootTabsParamList>
  >;

export type RootScreenProps<T extends keyof RootTabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabsParamList, T>,
    NativeStackScreenProps<BirthdaysStackParamList>
  >;

// // export type RootStackScreenProps<T extends keyof HomeTabScreenProps> =
// // NativeStackScreenProps<HomeTabScreenProps, T>;

// // om vi kommer använda usenavigate, useroute
// declare global {
//   namespace ReactNavigation {
//     interface RootParamList extends RootTabsParamList {}
//   }
// }
