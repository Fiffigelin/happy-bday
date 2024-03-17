import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface RoundButtonProps {
  onPress: () => void;
  buttonColor: string;
  disabledColor: string;
  textColor: string;
  buttonText: string;
  buttonTextSize: number;
  widht_hight: number;
  disabled: boolean;
}
export default function RoundButton(Props: RoundButtonProps) {
  const buttonStyle = StyleSheet.create({
    buttonContainer: {
      backgroundColor: Props.disabled ? Props.disabledColor : Props.buttonColor,
      borderRadius: 50,
      width: Props.widht_hight,
      height: Props.widht_hight,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      fontSize: Props.buttonTextSize,
      fontWeight: "600",
      color: Props.disabled ? "#afb5b8" : Props.textColor,
    },
  });

  const handlePress = () => {
    if (!Props.disabled) {
      Props.onPress();
    }
  };

  return (
    <TouchableOpacity
      disabled={Props.disabled}
      style={buttonStyle.buttonContainer}
      onPress={handlePress}
    >
      <Text style={buttonStyle.buttonText}>{Props.buttonText}</Text>
    </TouchableOpacity>
  );
}
