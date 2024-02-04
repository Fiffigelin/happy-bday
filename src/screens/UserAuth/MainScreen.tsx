import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import Svg, { Image } from "react-native-svg";

export default function Main() {
  //i.imgur.com/xuKn6N2.png
  const imagePosition = useSharedValue(1);
  const [isModalView, setModalView] = useState(false);
  const { height, width } = Dimensions.get("window");
  return (
    <View style={styles.container}>
      <Animated.View style={styles.absoluteFill}>
        <Svg style={isModalView ? styles.svgModal : styles.svg} width={width}>
          <Image
            href={require("@/assets/login-no-background.png")}
            width={width}
            height={height / 1.15}
          />
        </Svg>
        {/* <View style={styles.closeBtnContainer}>
          <Text>X</Text>
        </View> */}
      </Animated.View>
      <View
        style={isModalView ? styles.modalContainer : styles.buttonContainer}
      >
        <View style={styles.buttonWhite}>
          <Text style={styles.buttonTextBlack}>Login</Text>
        </View>
        <View style={styles.buttonGoogle}>
          <Text style={styles.buttonTextWhite}>Sign in with Google</Text>
        </View>

        {/* <View style={styles.formInputContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={"black"}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={"black"}
            style={styles.textInput}
          />
          <View style={styles.formButton}>
            <Text style={styles.buttonTextWhite}>Log in</Text>
          </View>
        </View> */}
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
    borderRadius: 10,
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
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#325ECF",
  },
  buttonTextWhite: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    letterSpacing: 0.5,
  },
  buttonTextBlack: {
    fontSize: 20,
    fontWeight: "600",
    color: "black",
    letterSpacing: 0.5,
  },
  buttonContainer: {
    justifyContent: "center",
    height: Dimensions.get("window").height / 3,
  },
  modalContainer: {
    backgroundColor: "white",
    justifyContent: "flex-end",
    height: Dimensions.get("window").height / 2,
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  absoluteFillWhite: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "white",
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    paddingLeft: 10,
  },
  formButton: {
    backgroundColor: "#E5C5BD",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#E5C5BD",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  formInputContainer: {
    marginBottom: 70,
  },
  closeBtnContainer: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignSelf: "center",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 1,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
  },
  svgModal: {
    height: Dimensions.get("window").height / 2,
  },
  svg: {
    height: Dimensions.get("window").height,
  },
});
