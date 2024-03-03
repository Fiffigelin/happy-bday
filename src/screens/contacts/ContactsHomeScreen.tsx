import ContactCard from "@/src/components/contactCard";
import CustomButton from "@/src/components/customButton";
import CustomToast from "@/src/components/customToast";
import { fetchContactsAPI } from "@/src/features/contact/contact.slice";
import { useAppDispatch, useAppSelector } from "@/src/features/store";
import { ContactsScreenProps } from "@/src/navigation/NavigationTypes";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

type Props = ContactsScreenProps<"ContactsHomeStack">;

export default function ContactsHomeScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const contactState = useAppSelector(
    (state) => state.contact.addedContactSuccessful
  );
  const contacts = useAppSelector((state) => state.contact.contacts);
  const user = useAppSelector((state) => state.user.user);
  const [monthsWithData, setMonthsWithData] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setMessage] = useState<string>("");

  const showToastFunction = (text: string) => {
    setMessage(text);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };
  useEffect(() => {
    dispatch(fetchContactsAPI(user?.id as string));
  }, [user]);

  useEffect(() => {
    if (contactState === true) {
      showToastFunction("Contact added successfully");
    } else if (contactState === false) {
      showToastFunction("Something wrong happened!");
    }
  }, [contactState]);

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
      <ContactCard
        month={month}
        index={index}
        monthsWithData={monthsWithData}
        contactsInMonth={contactsInMonth}
      />
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
      <FlatList
        data={monthsWithData}
        renderItem={({ item, index }) => renderMonthSection(item, index)}
      />
      {showToast && <CustomToast message={toastMessage} onClose={() => {}} />}
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
  sectionHeader: {
    fontSize: 30,
    marginHorizontal: 10,
    fontWeight: "600",
    color: "gray",
  },
});
