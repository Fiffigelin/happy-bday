import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXIY-KjKN_d97KdFJy0NZMSYbIrWNkjd8",
  authDomain: "happy-bday-api.firebaseapp.com",
  projectId: "happy-bday-api",
  storageBucket: "happy-bday-api.appspot.com",
  messagingSenderId: "928396313458",
  appId: "1:928396313458:web:470d0e64063a8486a193eb",
  measurementId: "G-FVPQZ186E1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;
const auth = initializeAuth(app, {
  persistence: reactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth, db };
