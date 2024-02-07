import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface CustomButtonProps {
  onPress: () => void;
}
const CloseCustomButton: React.FC<CustomButtonProps> = ({ onPress }) => {
  const buttonStyle = StyleSheet.create({
    closeButtonContainer: {
      height: 40,
      width: 40,
      justifyContent: "center",
      alignSelf: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 1,
      backgroundColor: "white",
      alignItems: "center",
      borderRadius: 20,
      top: -20,
    },
  });

  return (
    <Pressable onPress={onPress} style={buttonStyle.closeButtonContainer}>
      <Text>X</Text>
    </Pressable>
  );
};

export default CloseCustomButton;
