import CustomButton from "@/src/components/customButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Login() {
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const { height } = Dimensions.get("window");

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  useEffect(() => {
    console.log("DATE: ", date.toISOString());
    if (Platform.OS === "android") {
      setDateOfBirth(date.toDateString());
      console.log("SET BIRTHDAY: ", date.toDateString());
    }
  }, [date]);

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

  return (
    <View style={styles.container}>
      <Text style={styles.text}>CREATE CONTACT</Text>
      <View>
        <Text>Date Of Birth</Text>

        {showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={onChange}
            style={styles.datePicker}
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
            style={styles.input}
            placeholder="Sat Aug 21 2004"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            placeholderTextColor="#11182744"
            editable={false}
            onPressIn={toggleDatePicker}
          />
        </Pressable>
      </View>
    </View>
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
    color: "red",
    fontSize: 24,
    fontWeight: "bold",
  },
  inputContainer: {
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  datePicker: {
    height: 120,
    marginTop: -10,
  },
});
