import { Button, StyleSheet, Text, View } from "react-native";
import { RootScreenProps } from "../navigation/NavigationTypes";

type Props = RootScreenProps<"HomeTab">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>HomeScreen</Text>
      <Button
        title="Create birthdaymessage"
        onPress={() => navigation.navigate("CreateMessage")}
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
  text: {
    color: "blue",
    fontSize: 24,
    fontWeight: "bold",
  },
});
