import { auth } from "@/firebase.config";
import styles from "@/style";
import { signOut } from "firebase/auth";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import GradientText from "../components/gradient-component/gradientText";
import { useAppDispatch, useAppSelector } from "../features/store";
import { logOutUser } from "../features/user/user.slice";

export default function ProfileScreen() {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

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
  return (
    <View style={profileStyle.container}>
      <View>
        <Image
          source={{ uri: user?.profile_url }}
          style={{ borderRadius: 100, width: 150, height: 150 }}
        />
        <GradientText
          colors={["#973EB5", "#441c51"]}
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
