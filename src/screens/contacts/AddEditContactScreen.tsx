import CustomButton from "@/src/components/customButton";
import CustomInput from "@/src/components/customInput";
import { createContactAPI } from "@/src/features/contact/contact.slice";
import { useAppDispatch, useAppSelector } from "@/src/features/store";
import { ContactsScreenProps } from "@/src/navigation/NavigationTypes";
import styles from "@/style";
import { ContactCredential } from "@/types";
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
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = ContactsScreenProps<"AddEditContactStack">;

export default function HandleContact({ navigation }: Props) {
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const { height, width } = Dimensions.get("window");
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
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
    const addContact: ContactCredential = {
      name: data.name,
      birthday: new Date(dateOfBirth),
      userId: user?.id as string,
    };

    const hasQuerySucceded = await dispatch(createContactAPI(addContact));
    if (hasQuerySucceded) {
      navigation.navigate("ContactsHomeStack");
    }
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      setDateOfBirth(date.toDateString());
    }
  }, [date]);

  return (
    <View style={[contactStyles.container, { width: width }]}>
      <Text style={contactStyles.text}>CREATE CONTACT</Text>
      <View style={[styles.buttonContainer, { width: width }]}>
        <KeyboardAwareScrollView
          contentContainerStyle={contactStyles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
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
              placeholder="Sat Aug 21 2004"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              placeholderTextColor="red"
              editable={false}
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
            placeholder="Name"
            secureTextEntry={false}
            errorMessage="Error"
          />
          <Pressable
            style={styles.formButton}
            onPress={handleSubmit(addContactHandler)}
          >
            <Text style={styles.buttonTextWhite}>Add new contact</Text>
          </Pressable>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 20,
            }}
          ></View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}

const contactStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
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
  text: {
    color: "red",
    fontSize: 24,
    fontWeight: "bold",
  },
  datePicker: {
    height: 120,
    marginTop: -10,
  },
  scrollContent: {
    flex: 1,
  },
});
