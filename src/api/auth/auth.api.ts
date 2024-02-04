import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "firebase/firestore";

import { auth } from "@/firebase.config";
import { LoginUser, UserCredential } from "@/types";

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
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginUser.email,
      loginUser.password
    );

    const uid = userCredential.user.uid;

    return uid;
  } catch (error: any) {
    throw error;
  }
};
