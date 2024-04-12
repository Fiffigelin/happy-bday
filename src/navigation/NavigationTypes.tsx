import { Contact } from "@/types";
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
  HandleMessage: { contact: Contact };
};

export type AuthStackParamList = {
  Main: undefined;
};

export type ContactsScreenProps<T extends keyof ContactsStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ContactsStackParamList, T>,
    BottomTabScreenProps<RootTabsParamList>
  >;

// export type BirthdaysScreenProps<T extends keyof BirthdaysStackParamList> =
//   CompositeScreenProps<
//     NativeStackScreenProps<BirthdaysStackParamList, T>,
//     BottomTabScreenProps<RootTabsParamList>
//   >;

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

// // export type RootStackScreenProps<T extends keyof HomeTabScreenProps> =
// // NativeStackScreenProps<HomeTabScreenProps, T>;

// // om vi kommer använda usenavigate, useroute
// declare global {
//   namespace ReactNavigation {
//     interface RootParamList extends RootTabsParamList {}
//   }
// }
