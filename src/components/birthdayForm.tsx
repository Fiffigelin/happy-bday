import { BdayImage, Message } from "@/types";
import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, TextInput, View } from "react-native";

interface BirthdayFormProps {
  message?: Message;
  image: BdayImage;
  onTextChange?: (text: string) => void;
}

export default function BirthdayForm({
  message,
  image,
  onTextChange,
}: BirthdayFormProps) {
  const { width } = Dimensions.get("window");
  const [changeText, onChangeText] = useState<string>();

  const handleTextChange = (text: string) => {
    onChangeText(text);
    onTextChange!(text);
  };

  const formStyle = StyleSheet.create({
    container: {
      width: width * 0.8,
      margin: 20,
      borderRadius: 10,
      borderColor: "gray",
      backgroundColor: "white",
      padding: 15,
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });

  return (
    <View style={formStyle.container}>
      <View>
        <Image source={{ uri: image?.url }} style={styles.image} />
      </View>
      {message?.message ? (
        <TextInput
          editable={false}
          multiline
          numberOfLines={4}
          maxLength={50}
          value={message?.message}
          style={{ padding: 10 }}
        />
      ) : (
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={50}
          onChangeText={handleTextChange}
          value={changeText}
          style={{ padding: 10 }}
          placeholder="Congratulations on your birthday 🎉"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  text: {
    color: "gray",
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 8,
  },
  image: {
    width: "100%",
    height: 300,
    objectFit: "scale-down",
    borderRadius: 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
