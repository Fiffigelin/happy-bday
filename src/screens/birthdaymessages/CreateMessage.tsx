import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CreateMessage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CreateMessage</Text>
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
});
