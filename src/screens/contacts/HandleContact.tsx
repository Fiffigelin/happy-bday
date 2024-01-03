import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HandleContact() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ContactsScreen</Text>
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
    color: "orange",
    fontSize: 24,
    fontWeight: "bold",
  },
});
