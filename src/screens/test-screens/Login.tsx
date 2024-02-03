import { useAppDispatch } from "@/src/features/store";
import { addUserAsync } from "@/src/features/user/user.slice";
import { UserCredential } from "@/types";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Name:", name);

    const userCred: UserCredential = {
      email: email,
      password: password,
      name: name,
      uid: "",
    };

    await dispatch(addUserAsync(userCred));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>LOGIN</Text>
      <View style={styles.inputContainer}>
        <Text>EMAIL:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text>PASSWORD:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <Text>NAME:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <Button title="Create userCred" onPress={handleLogin} />
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
  inputContainer: {
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
