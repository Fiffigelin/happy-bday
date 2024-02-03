import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "firebase/firestore";

import { auth } from "@/firebase.config";
import { UserCredential } from "@/types";

export const addUserToDB = async (
  userCred: UserCredential
): Promise<UserCredential> => {
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
};

export const signInWithAPI = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return {
      uid: userCredential.user.uid,
    };
  } catch (error: any) {
    throw error;
  }
};
