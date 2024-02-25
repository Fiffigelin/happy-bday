import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "firebase/firestore";

import { auth } from "@/firebase.config";
import { LoginUser, UserCredential } from "@/types";
import { getExpoPushTokenAsync } from "expo-notifications";
import { API_URL, headers } from "../api";

const TOKEN_URL = `${API_URL}:3000/api/notifications`;

export const TOKEN_API = {
  CREATE: "/register-token",
};

export async function createCredentialUser(
  userCred: UserCredential
): Promise<UserCredential> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userCred.email,
      userCred.password
    );
    console.log("UID: ", userCredential.user.uid);

    userCred.uid = userCredential.user.uid;
    return userCred;
  } catch (error: any) {
    throw error;
  }
}

export const signInCredentialUser = async (
  loginUser: LoginUser
): Promise<string> => {
  try {
    console.log("jag är här");
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginUser.email,
      loginUser.password
    );
    const uid = userCredential.user.uid;
    console.log("UID: ", uid);
    sendExpoPushToken(uid);

    return uid;
  } catch (error: any) {
    throw error;
  }
};

const sendExpoPushToken = async (uid: string) => {
  const expoPushToken = (await getExpoPushTokenAsync()).data;
  console.log(expoPushToken);

  try {
    const requestBody = {
      uid: uid,
      token: expoPushToken,
    };

    const requestInfo = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
    };

    await fetch(`${TOKEN_URL}${TOKEN_API.CREATE}`, requestInfo);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
