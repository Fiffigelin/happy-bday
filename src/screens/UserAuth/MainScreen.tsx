import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Svg, { Image } from "react-native-svg";

export default function Main() {
  //i.imgur.com/xuKn6N2.png
  const { height, width } = Dimensions.get("window");
  https: return (
    <View style={styles.container}>
      <View style={styles.absoluteFill}>
        <Svg height={height} width={width}>
          <Image
            href={require("@/assets/login-no-background.png")}
            width={width}
            height={height}
          />
        </Svg>
      </View>
      <View>
        <View style={styles.buttonWhite}>
          <Text style={styles.buttonText}>Login</Text>
        </View>
        <View style={styles.buttonGoogle}>
          <Text style={styles.buttonTextGoogle}>Sign in with Google</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5C5BD",
    justifyContent: "flex-end",
  },
  buttonWhite: {
    backgroundColor: "#fff",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  buttonGoogle: {
    backgroundColor: "#325ECF",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#325ECF",
  },
  buttonTextGoogle: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    letterSpacing: 0.5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "black",
    letterSpacing: 0.5,
  },
  buttonContainer: {
    justifyContent: "center",
    height: Dimensions.get("window").height / 3,
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
});
