import { ContactsScreenProps } from "@/src/navigation/NavigationTypes";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

type Props = ContactsScreenProps<"ContactsHomeStack">;

export default function ContactsHomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ContactsHomeScreen</Text>
      <Button
        title="Add contact / edit contact"
        onPress={() => navigation.navigate("ContactStack")}
      />
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
