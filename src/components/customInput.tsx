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

const CustomInput: React.FC<CustomInputProps> = ({
  control,
  name,
  rules,
  placeholder,
  secureTextEntry,
  errorMessage,
}) => {
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
                { borderColor: error ? "red" : "gray" },
              ]}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && (
            <Text
              style={{
                color: "red",
                alignSelf: "stretch",
                justifyContent: "flex-start",
                marginHorizontal: 25,
              }}
            >
              {error.message || errorMessage}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
    paddingLeft: 10,
  },
});

export default CustomInput;
