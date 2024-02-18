// import CustomButton from "@/src/components/customButton";
// import { fetchContactsAPI } from "@/src/features/contact/contact.slice";
// import { useAppDispatch, useAppSelector } from "@/src/features/store";
// import { ContactsScreenProps } from "@/src/navigation/NavigationTypes";
// import React, { useEffect } from "react";
// import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

// type Props = ContactsScreenProps<"ContactsHomeStack">;

// export default function ContactsHomeScreen({ navigation }: Props) {
//   const dispatch = useAppDispatch();
//   const contacts = useAppSelector((state) => state.contact.contacts);
//   const user = useAppSelector((state) => state.user.user);

//   useEffect(() => {
//     dispatch(fetchContactsAPI(user?.id as string));
//     console.log("CONTACTS: ", contacts);
//   }, []);

//   return (
//     <>
//       <View
//         style={{
//           width: "100%",
//           alignItems: "flex-end",
//           marginTop: 50,
//         }}
//       >
//         <CustomButton
//           buttonColor="#d39e90"
//           borderColor="#d39e90"
//           textColor="white"
//           shadow={false}
//           buttonText="Add contact"
//           onPress={() => navigation.navigate("ContactStack")}
//         />
//       </View>
//       <View style={{ margin: 20 }}>
//         <FlatList
//           style={{ backgroundColor: "blue" }}
//           data={contacts}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <View
//               style={{
//                 backgroundColor: "white",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 borderRadius: 8,
//                 margin: 6,
//                 marginBottom: 25,
//                 height: 55,
//                 padding: 8,
//                 flexDirection: "row",
//               }}
//             >
//               <View style={{ backgroundColor: "pink", minWidth: 180 }}>
//                 <Text>{item.name}</Text>
//               </View>
//               <View style={{ flexDirection: "row" }}>
//                 <Text style={{ marginHorizontal: 10 }}>
//                   {new Date(item.birthday).getDate()}
//                 </Text>
//                 <Text>{new Date(item.birthday).getFullYear()}</Text>
//               </View>
//               <View style={{ flexDirection: "row", alignItems: "center" }}>
//                 <Pressable
//                   style={{ marginHorizontal: 10 }}
//                   onPress={() => {
//                     console.log("EDIT ", item.id, " + ", item.birthday);
//                   }}
//                 >
//                   <View>
//                     <Text>[ ]</Text>
//                   </View>
//                 </Pressable>
//                 <Pressable
//                   style={{ marginHorizontal: 8 }}
//                   onPress={() => {
//                     console.log("DELETE ", item.id);
//                   }}
//                 >
//                   <View>
//                     <Text>X</Text>
//                   </View>
//                 </Pressable>
//               </View>
//             </View>
//           )}
//         />
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f0f0f0",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     color: "orange",
//     fontSize: 24,
//     fontWeight: "bold",
//   },
// });

import CustomButton from "@/src/components/customButton";
import { fetchContactsAPI } from "@/src/features/contact/contact.slice";
import { useAppDispatch, useAppSelector } from "@/src/features/store";
import { ContactsScreenProps } from "@/src/navigation/NavigationTypes";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = ContactsScreenProps<"ContactsHomeStack">;

export default function ContactsHomeScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.contact.contacts);
  const user = useAppSelector((state) => state.user.user);
  const [monthsWithData, setMonthsWithData] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchContactsAPI(user?.id as string));
    console.log("CONTACTS: ", contacts);
  }, []);

  useEffect(() => {
    const allMonthNames = Array.from({ length: 12 }, (_, index) => {
      const date = new Date(0);
      date.setUTCMonth(index);
      return date.toLocaleString("default", { month: "long" });
    });

    const monthNamesWithData = allMonthNames.filter((month) =>
      contacts?.some(
        (contact) =>
          new Date(contact.birthday).getMonth() === allMonthNames.indexOf(month)
      )
    );
    console.log(monthNamesWithData);

    setMonthsWithData(monthNamesWithData);
  }, [contacts]);

  const renderMonthSection = (month: string, index: number) => {
    const contactsInMonth = contacts?.filter(
      (contact) =>
        new Date(contact.birthday).toLocaleDateString(undefined, {
          month: "long",
        }) === month
    );

    return (
      <View
        key={month}
        style={{
          marginHorizontal: 10,
          marginBottom: index === monthsWithData.length - 1 ? 0 : 25,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            marginHorizontal: 10,
            fontWeight: "600",
            color: "gray",
          }}
        >
          {month}
        </Text>
        <FlatList
          style={{ maxHeight: 300 }}
          data={contactsInMonth}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 8,
                margin: 6,
                marginBottom: 25,
                height: 55,
                padding: 8,
                flexDirection: "row",
              }}
            >
              <View style={{ minWidth: 180 }}>
                <Text style={{ fontSize: 15, fontWeight: "600" }}>
                  {item.name}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginHorizontal: 10 }}>
                  {new Date(item.birthday).getDate()}
                </Text>
                <Text>{new Date(item.birthday).getFullYear()}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Pressable
                  style={{ marginHorizontal: 10 }}
                  onPress={() => {
                    console.log("EDIT ", item.id, " + ", item.birthday);
                  }}
                >
                  <View>
                    <Text>[ ]</Text>
                  </View>
                </Pressable>
                <Pressable
                  style={{ marginHorizontal: 8 }}
                  onPress={() => {
                    console.log("DELETE: ", item.id);
                  }}
                >
                  <View>
                    <Text>X</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <>
      <View
        style={{
          width: "100%",
          alignItems: "flex-end",
          marginTop: 50,
        }}
      >
        <CustomButton
          buttonColor="#d39e90"
          borderColor="#d39e90"
          textColor="white"
          shadow={false}
          buttonText="Add contact"
          onPress={() => navigation.navigate("ContactStack")}
        />
      </View>
      <ScrollView>
        {monthsWithData.map((month, index) => renderMonthSection(month, index))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "orange",
    fontSize: 24,
    fontWeight: "bold",
  },
});
