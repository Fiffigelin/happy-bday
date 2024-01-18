import { useAppDispatch, useAppSelector } from "@/src/features/store";
import { fetchUsersAPI } from "@/src/features/user/user.slice";
import { BirthdaysScreenProps } from "@/src/navigation/NavigationTypes";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

type Props = BirthdaysScreenProps<"BirthdayMessages">;

export default function BirthdayMessages({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.data);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>BirthdayMessages</Text>
      <Button
        title="Create message"
        onPress={() => navigation.navigate("CreateMessage")}
      />
      <Button
        title="Edit message"
        onPress={() => navigation.navigate("HandleMessage")}
      />
      <Button title="API PRESS" onPress={() => dispatch(fetchUsersAPI())} />
      <Button title="API PRESS" onPress={() => users} />
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
