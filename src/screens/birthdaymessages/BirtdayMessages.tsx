import { BirthdaysScreenProps } from "@/src/navigation/NavigationTypes";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

type Props = BirthdaysScreenProps<"BirthdayMessages">;

export default function BirthdayMessages({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Text style={styles.text}>BirthdayMessages</Text>
        <Button
          title="Create message"
          onPress={() => navigation.navigate("CreateMessage")}
        />
        <Button
          title="Edit message"
          onPress={() => navigation.navigate("HandleMessage")}
        />
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
  view: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "red",
    fontSize: 24,
    fontWeight: "bold",
  },
  userItem: {
    borderBottomWidth: 1,
    padding: 10,
  },
});
