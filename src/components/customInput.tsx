import React from "react";
import { Control, Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface CustomInputProps {
  control: Control;
  name: string;
  rules: {};
  placeholder: string;
  secureTextEntry: boolean;
  errorMessage: string;
}

export default function CustomInput({
  control,
  name,
  rules,
  placeholder,
  secureTextEntry,
  errorMessage,
}: CustomInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={[
                styles.textInput,
                {
                  borderColor: error ? "red" : "black",
                },
              ]}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && (
            <Text
              style={{
                color: "black",
                alignSelf: "stretch",
                justifyContent: "flex-start",
                marginHorizontal: 25,
                fontWeight: "600",
              }}
            >
              {error.message || errorMessage}
            </Text>
          )}
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    backgroundColor: "#fff",
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
    paddingLeft: 10,
    // borderColor: "red",
  },
});
