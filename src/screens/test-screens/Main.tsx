import { TestScreenProps } from "@/src/navigation/NavigationTypes";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

type Props = TestScreenProps<"Main">;

export default function Main({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Text style={styles.text}>MAIN</Text>
        <Button
          title="Go to Test"
          onPress={() => navigation.navigate("Test")}
        />
        <Button
          title="Go to CredUser"
          onPress={() => navigation.navigate("CredUser")}
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
});
