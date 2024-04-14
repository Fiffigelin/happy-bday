import { auth } from "@/firebase.config";
import styles from "@/style";
import { signOut } from "firebase/auth";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GradientText from "../components/gradient-component/gradientText";
import { resetSliceContact } from "../features/contact/contact.slice";
import { resetSliceImg } from "../features/image/image.slice";
import { resetSliceMsg } from "../features/message/message.slice";
import { useAppDispatch, useAppSelector } from "../features/store";
import { logOutUser } from "../features/user/user.slice";

export default function ProfileScreen() {
  /* <<<<<<<<<<<<<<<<<<<< Redux related data >>>>>>>>>>>>>>>>>>>> */
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  function handleLogOut() {
    signOut(auth)
      .then(() => {
        dispatch(resetSliceContact());
        dispatch(resetSliceMsg());
        dispatch(resetSliceImg());
        dispatch(logOutUser());
      })
      .catch((error) => {
        throw error;
      });
  }
  return (
    <View style={profileStyle.container}>
      <View>
        <Image
          source={{ uri: user?.profile_url }}
          style={{ borderRadius: 100, width: 150, height: 150 }}
        />
        <GradientText
          colors={["#b975d0", "#441c51"]}
          start={{ x: 0.5, y: 0.25 }}
          end={{ x: 0.5, y: 1 }}
          style={profileStyle.text}
        >
          {user?.name}
        </GradientText>
      </View>
      <View style={{ width: "100%", alignItems: "center", paddingTop: 50 }}>
        <TouchableOpacity
          style={[styles.formButton, { width: "80%" }]}
          onPress={handleLogOut}
        >
          <Text style={styles.buttonTextWhite}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const profileStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafa",
    alignItems: "center",
    paddingTop: 180,
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
});
