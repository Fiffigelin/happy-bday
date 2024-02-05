import styles from "@/style";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { ClipPath, Ellipse, Image } from "react-native-svg";

export default function MainPage() {
  const imageScale = useSharedValue(3);
  const { height, width } = Dimensions.get("window");
  const [ismodalView, setModalView] = useState(false);
  const imagePosition = useSharedValue(1);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / imageScale.value, 0]
    );
    return {
      transform: [
        {
          translateY: withTiming(interpolation, {
            duration: imageScale.value === 1.25 ? 200 : 1000,
          }),
        },
      ],
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const textInputAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 0], [0, 0]);
    return {
      opacity: withTiming(imagePosition.value + 1, { duration: 500 }),
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const loginHandler = () => {
    imagePosition.value = 0;
    setModalView(true);
  };

  const registerHandler = () => {
    imagePosition.value = 0;
    setModalView(true);
  };

  const handleCloseBtn = () => {
    imagePosition.value = 1;
    setModalView(false);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        console.log("Tangentbordet visas!");
        imageScale.value = 1.4;
        // imagePosition.value = 0.75; // Uppdatera skalfaktorn enligt dina önskemål
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        console.log("Tangentbordet göms!");
        imageScale.value = 3;
        // imagePosition.value = 1.0; // Återgå till ursprunglig skalfaktor
      }
    );

    // Komponentrensrensning: Ta bort lyssnarna när komponenten avmonteras
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={ismodalView ? styles.containerTwo : styles.container}>
      <Animated.View style={[styles.cover, imageAnimatedStyle]}>
        <Svg height={height} width={width}>
          {ismodalView && (
            <ClipPath id="clipPathId">
              <Ellipse cx={width / 2} rx={height} ry={height}></Ellipse>
            </ClipPath>
          )}
          <Image
            href={require("../../../assets/desktop-wallpaper-beautiful-moon-planets-galaxy-for-your-mobile-tablet-explore-moon-moon-moon-moon-background.jpg")}
            width={width}
            height={height}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clipPathId)"
          />
        </Svg>
        {ismodalView && (
          <View style={styles.closeButtonContainer}>
            <Text onPress={handleCloseBtn}>X</Text>
          </View>
        )}
      </Animated.View>
      <View style={styles.buttonContainer}>
        <Animated.View style={buttonAnimatedStyle}>
          <Pressable style={styles.button} onPress={loginHandler}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={buttonAnimatedStyle}>
          <Pressable style={styles.button} onPress={registerHandler}>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
        </Animated.View>
        {ismodalView && (
          <View>
            <Animated.View style={textInputAnimatedStyle}>
              <TextInput
                placeholder="Hej Ariel! Jag är en app! :)"
                placeholderTextColor={"black"}
                style={styles.textInput}
              />
              <TextInput
                placeholder="Name"
                placeholderTextColor={"black"}
                style={styles.textInput}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor={"black"}
                style={styles.textInput}
              />
              <View style={styles.formButton}>
                <Text>Login</Text>
              </View>
            </Animated.View>
          </View>
        )}
      </View>
    </View>
  );
}
