import { User } from "@/src/api/user/user.api";
import { useAppDispatch, useAppSelector } from "@/src/features/store";
import {
  fetchUserByIdAPI,
  fetchUsersAPI,
} from "@/src/features/user/user.slice";
import { BirthdaysScreenProps } from "@/src/navigation/NavigationTypes";
import React, { useEffect } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";

type Props = BirthdaysScreenProps<"BirthdayMessages">;

export default function BirthdayMessages({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(fetchUsersAPI());
  }, []);

  const renderUserItem = ({ item }: { item: User }) => (
    <View style={styles.userItem}>
      <Text>{item.name}</Text>
      <Text>Email: {item.email}</Text>
    </View>
  );

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
      <Button title="Fetch users" onPress={() => dispatch(fetchUsersAPI())} />
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id}
      />
      <Button
        title="Fetch user"
        onPress={() => dispatch(fetchUserByIdAPI("LjVhzZbCmpSaHZX20sFU"))}
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
  view: {
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
