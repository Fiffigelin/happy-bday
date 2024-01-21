import { User } from "@/src/api/user/user.api";
import { useAppDispatch, useAppSelector } from "@/src/features/store";
import {
  createUserAPI,
  deleteUserAPI,
  fetchUserByIdAPI,
  fetchUsersAPI,
  updateUserAPI,
} from "@/src/features/user/user.slice";
import { BirthdaysScreenProps } from "@/src/navigation/NavigationTypes";
import React, { useEffect } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";

type Props = BirthdaysScreenProps<"BirthdayMessages">;

export default function BirthdayMessages({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.users);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(fetchUsersAPI());
  }, []);

  const renderUserItem = ({ item }: { item: User }) => (
    <View style={styles.userItem}>
      <Text>{item.name}</Text>
      <Text>Email: {item.email}</Text>
    </View>
  );

  const updatedUser: User = {
    id: "LjVhzZbCmpSaHZX20sFU",
    email: "updated@email.com",
    name: "Updated User",
    profileURL: "updated profile",
  };

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
      <View style={styles.view}>
        <Button title="Fetch users" onPress={() => dispatch(fetchUsersAPI())} />
        <FlatList
          data={users}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.view}>
        <Button
          title="Fetch user"
          onPress={() => dispatch(fetchUserByIdAPI("LjVhzZbCmpSaHZX20sFU"))}
        />
        <Text>{user?.name}</Text>
      </View>
      <View style={styles.view}>
        <Button
          title="Update users profileURL"
          onPress={() =>
            dispatch(updateUserAPI({ id: updatedUser.id, updatedUser }))
          }
        />
        <Text>{user?.name}</Text>
      </View>
      <View style={styles.view}>
        <Button
          title="Create new user"
          onPress={() => dispatch(createUserAPI())}
        />
        <Text>{user?.name}</Text>
      </View>
      <View style={styles.view}>
        <Button
          title="Delete new user"
          onPress={() => dispatch(deleteUserAPI("vS7k1Y9kq6M7U6DiWqWn"))}
        />
        <Text>{user?.name}</Text>
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
