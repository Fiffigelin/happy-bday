import { BirthdaysScreenProps } from "@/src/navigation/NavigationTypes";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = BirthdaysScreenProps<"CreateMessage">;

export default function CreateMessage(route: Props) {
  const id = route.route.params?.id;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CreateMessage</Text>
      <Text style={styles.text}>{id}</Text>
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
