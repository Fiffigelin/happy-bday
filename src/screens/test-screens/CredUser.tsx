import { auth } from "@/firebase.config";
import { useAppDispatch, useAppSelector } from "@/src/features/store";
import { logOutUser, setActiveUser } from "@/src/features/user/user.slice";
import { AuthUser } from "@/types";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

export default function CredUser() {
  const [isUserFetched, setUserFetched] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (response) => {
      if (response) {
        const fetchedUser: AuthUser = {
          uid: response.uid,
          email: response.email as string,
        };
        dispatch(setActiveUser(fetchedUser));
      } else {
        dispatch(setActiveUser(undefined));
      }
      setUserFetched(true);
    });

    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    if (isUserFetched && user) {
      console.log("Fetched user from Firestore:", user);
    }
  }, [isUserFetched, user]);

  function handleLogOut() {
    signOut(auth)
      .then(() => {
        dispatch(logOutUser());
        console.log("Logged out!");
      })
      .catch((error) => {
        console.error("Fel vid utloggning:", error.message);
        Alert.alert(
          "Fel vid utloggning",
          "Det uppstod ett fel vid utloggningen."
        );
      });
  }

  // async function handleLogin() {
  //   const loginUser: LoginUser = {
  //     email: "bobo@mail.com",
  //     password: "bobo123",
  //   };

  //   dispatch(loginRegisteredUserAPI(loginUser));
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>CRED USER</Text>
      {/* <Button title="Login user" onPress={handleLogin} /> */}
      <Button title="Logout" onPress={handleLogOut} />
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
