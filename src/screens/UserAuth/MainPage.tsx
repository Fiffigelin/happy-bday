import styles from "@/style";
import React, { useState } from "react";
import { Dimensions, Pressable, Text, TextInput, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { ClipPath, Ellipse, Image } from "react-native-svg";

export default function MainPage() {
  const { height, width } = Dimensions.get("window");
  const [ismodalView, setModalView] = useState(false);
  const imagePosition = useSharedValue(1);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 3, 0]
    );
    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
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
                placeholder="Email"
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
