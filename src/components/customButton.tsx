import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface CustomButtonProps {
  onPress: () => void;
  buttonColor: string;
  borderColor: string;
  textColor: string;
  shadow: boolean;
  buttonText: string;
}
const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  buttonColor,
  borderColor,
  textColor,
  shadow,
  buttonText,
}) => {
  const buttonStyle = StyleSheet.create({
    buttonContainer: {
      backgroundColor: buttonColor,
      height: 55,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 15,
      marginHorizontal: 20,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: borderColor,
    },
    buttonContainerShadow: {
      backgroundColor: buttonColor,
      height: 55,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 15,
      marginHorizontal: 20,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: borderColor,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    buttonText: {
      fontSize: 20,
      fontWeight: "600",
      color: textColor,
      letterSpacing: 0.5,
    },
  });

  return (
    <Pressable
      style={
        shadow ? buttonStyle.buttonContainerShadow : buttonStyle.buttonContainer
      }
      onPress={onPress}
    >
      <Text style={buttonStyle.buttonText}>{buttonText}</Text>
    </Pressable>
  );
};

export default CustomButton;
