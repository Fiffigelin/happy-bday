import ContactCard from "@/src/components/contactCard";
import CustomToast from "@/src/components/customToast";
import DeleteModal from "@/src/components/deleteModal";
import GradientIcon from "@/src/components/gradient-component/gradientIcon";
import GradientText from "@/src/components/gradient-component/gradientText";
import { useAppDispatch, useAppSelector } from "@/src/features/store";
import { ContactsScreenProps } from "@/src/navigation/NavigationTypes";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

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
        <GradientText
          colors={["#c791d9", "#5D0D90"]}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.textStyle}
        >
          {month.toString()}
        </GradientText>
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
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          alignItems: "flex-end",
          marginTop: 60,
          paddingRight: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("AddEditContactStack")}
        >
          <GradientIcon
            colors={["#c791d9", "#5D0D90"]}
            start={{ x: 0.2, y: 0.2 }}
            end={{ x: 0, y: 1 }}
            name={"plus-circle"}
            locations={[0, 1]}
            size={70}
          />
        </TouchableOpacity>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafa",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontWeight: "600",
    fontSize: 30,
    marginHorizontal: 10,
  },
});
