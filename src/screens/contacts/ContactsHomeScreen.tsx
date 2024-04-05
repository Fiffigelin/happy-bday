import ContactCard from "@/src/components/contactCard";
import CustomButton from "@/src/components/customButton";
import CustomToast from "@/src/components/customToast";
import DeleteModal from "@/src/components/deleteModal";
import { useAppDispatch, useAppSelector } from "@/src/features/store";
import { ContactsScreenProps } from "@/src/navigation/NavigationTypes";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

type Props = ContactsScreenProps<"ContactsHomeStack">;

export default function ContactsHomeScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const isContactAddedState = useAppSelector(
    (state) => state.contact.isContactCreated
  );
  const contacts = useAppSelector((state) => state.contact.contacts);
  const user = useAppSelector((state) => state.user.user);
  const [monthsWithData, setMonthsWithData] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setMessage] = useState<string>("");
  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    null
  );
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  function OnPressDelete(id: string) {
    setSelectedContactId(id);
    setModalVisible(true);
  }

  const showToastFunction = (text: string) => {
    setMessage(text);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };
  // useEffect(() => {
  //   dispatch(fetchContactsAPI(user?.id as string));
  // }, [user]);

  useEffect(() => {
    if (isContactAddedState === true) {
      showToastFunction("Contact added successfully");
    } else if (isContactAddedState === false) {
      showToastFunction("Something wrong happened!");
    }
  }, [isContactAddedState]);

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
        key={`${month}_${index}`}
        style={{
          marginHorizontal: 10,
          marginBottom: index === monthsWithData.length - 1 ? 0 : 25,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            marginHorizontal: 10,
            fontWeight: "600",
            color: "gray",
          }}
        >
          {month.toString()}
        </Text>
        <FlatList
          style={{ maxHeight: 250 }}
          data={contactsInMonth}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ContactCard
              contact={item}
              onDelete={() => OnPressDelete(item.id)}
            />
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
          marginTop: 40,
        }}
      >
        <CustomButton
          buttonColor="#d39e90"
          borderColor="#d39e90"
          textColor="white"
          shadow={false}
          buttonText="Add contact"
          onPress={() => navigation.navigate("AddEditContactStack")}
        />
        {/* <GradientButton
          text={"Add contact"}
          colors={["purple", "pink"]}
          start={{
            x: 0.5,
            y: 1,
          }}
          end={{
            x: 0.5,
            y: 0,
          }}
          style={{ width: 50, height: 50 }}
        ></GradientButton> */}
      </View>
      <FlatList
        data={monthsWithData}
        renderItem={({ item, index }) => renderMonthSection(item, index)}
      />
      {showToast && <CustomToast message={toastMessage} onClose={() => {}} />}
      <DeleteModal
        visible={isModalVisible}
        contactId={selectedContactId!}
        userId={user?.id!}
        closeModal={() => setModalVisible(false)}
      />
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
