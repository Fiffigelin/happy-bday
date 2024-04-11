import CustomButton from "@/src/components/customButton";
import CustomInput from "@/src/components/customInput";
import GradientText from "@/src/components/gradient-component/gradientText";
import {
  createContactAPI,
  updateContactAPI,
} from "@/src/features/contact/contact.slice";
import { useAppDispatch, useAppSelector } from "@/src/features/store";
import { ContactsScreenProps } from "@/src/navigation/NavigationTypes";
import styles from "@/style";
import { Contact, ContactCredential, UpdateContact } from "@/types";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = ContactsScreenProps<"HandleContactStack">;

export default function HandleContact({ route, navigation }: Props) {
  const contactId = route.params?.id;
  const contacts = useAppSelector((state) => state.contact.contacts);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const [isEditing, setEditing] = useState<boolean>();
  const [editContact, setEditContact] = useState<Contact>();
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const { height, width } = Dimensions.get("window");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = (event: any, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate) {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
      }
    } else {
      toggleDatePicker();
    }
  };

  const confirmIOSDate = () => {
    setDateOfBirth(date.toDateString());
    toggleDatePicker();
  };

  const addContactHandler = async (data: any) => {
    if (isEditing) {
      const contact: UpdateContact = {
        name: data.name,
        birthday: convertPickedDate(),
        id: contactId!,
        userId: user?.id!,
      };
      await dispatch(updateContactAPI(contact));
    } else {
      const contact: ContactCredential = {
        name: data.name,
        birthday: convertPickedDate(),
        userId: user?.id as string,
      };
      await dispatch(createContactAPI(contact));

      navigation.navigate("ContactsHomeStack");
    }
  };

  function convertPickedDate(): string {
    const newDateOfBirth = new Date(dateOfBirth);

    const year = newDateOfBirth.getFullYear();
    const month = String(newDateOfBirth.getMonth() + 1).padStart(2, "0");
    const day = String(newDateOfBirth.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    if (contactId) {
      setEditContact(contacts?.find((contact) => contact.id === contactId));
      if (editContact) {
        setDateOfBirth(editContact?.birthday.toString());
        setEditing(true);
      }
    }
  }, [contactId, editContact]);

  useEffect(() => {
    if (Platform.OS === "android") {
      setDateOfBirth(date.toDateString());
    }
  }, [date]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={contactStyles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={[contactStyles.container, { width: width }]}>
        <GradientText
          colors={["#c791d9", "#5D0D90"]}
          start={{ x: 0.5, y: 0.25 }}
          end={{ x: 0.5, y: 1 }}
          style={contactStyles.textStyle}
        >
          {isEditing ? "Edit contact" : "Create a contact"}
        </GradientText>
        <View style={[styles.buttonContainer, { width: width }]}>
          {showPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date}
              onChange={onChange}
              style={contactStyles.datePicker}
              maximumDate={new Date()}
              minimumDate={new Date("1900")}
            />
          )}
          {showPicker && Platform.OS === "ios" && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: "80%",
                height: height / 1.95,
                marginBottom: 20,
              }}
            >
              <View style={{ width: "100%" }}>
                <CustomButton
                  buttonColor="grey"
                  borderColor="grey"
                  shadow={false}
                  buttonText="Cancel"
                  textColor="white"
                  onPress={toggleDatePicker}
                />
                <CustomButton
                  buttonColor="blue"
                  borderColor="blue"
                  shadow={false}
                  buttonText="Save"
                  textColor="white"
                  onPress={confirmIOSDate}
                />
              </View>
            </View>
          )}
          <Pressable onPress={toggleDatePicker}>
            <TextInput
              style={contactStyles.dateInput}
              placeholder={isEditing ? dateOfBirth : ""}
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              placeholderTextColor="grey"
              onPressIn={toggleDatePicker}
            />
          </Pressable>
          <CustomInput
            control={control}
            name="name"
            rules={{
              required: "Name required",
              minLength: {
                value: 2,
                message: "Name needs to be a minimum of 2 characters",
              },
            }}
            placeholder={isEditing ? editContact?.name! : "Name"}
            secureTextEntry={false}
            errorMessage="Error"
          />

          <TouchableOpacity
            style={styles.formButton}
            onPress={handleSubmit(addContactHandler)}
          >
            <Text style={styles.buttonTextWhite}>
              {isEditing ? "Edit contact" : "Add new contact"}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 20,
            }}
          ></View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const contactStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafa",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    flexGrow: 1,
  },
  dateInput: {
    height: 50,
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
    paddingLeft: 10,
    borderColor: "gray",
  },
  textStyle: {
    fontWeight: "700",
    fontSize: 25,
    textAlign: "center",
  },
  datePicker: {
    height: 120,
    marginTop: -10,
    backgroundColor: "white",
    borderColor: "black",
  },
});
