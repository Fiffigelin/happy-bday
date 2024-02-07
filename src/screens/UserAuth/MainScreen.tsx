import CustomInput from "@/src/components/customInput";
import styles from "@/style";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Dimensions, Keyboard, Pressable, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { ClipPath, Ellipse, Image } from "react-native-svg";

export default function MainPage() {
  const imageScale = useSharedValue(2.7);
  const { height, width } = Dimensions.get("window");
  const [ismodalView, setModalView] = useState(false);
  const imagePosition = useSharedValue(1);
  const [modalVisible, setModalVisible] = useState(false);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm();

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
            duration: imageScale.value === 1.25 ? 400 : 1000,
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

  const signinHandler = () => {
    imagePosition.value = 0;
    setModalView(true);
  };

  const registerHandler = () => {
    setModalVisible(true);
  };

  const loginHandler = () => {
    console.log("Nu har användaren loggat in");
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
        imageScale.value = 1.35;
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        console.log("Tangentbordet göms!");
        imageScale.value = 2.7;
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <>
      <View style={ismodalView ? styles.containerTwo : styles.container}>
        <Animated.View style={[styles.cover, imageAnimatedStyle]}>
          <Svg height={height} width={width}>
            {ismodalView && (
              <ClipPath id="clipPathId">
                <Ellipse cx={width / 2} rx={height} ry={height}></Ellipse>
              </ClipPath>
            )}
            <Image
              href={require("../../../assets/login.png")}
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
            <Pressable style={styles.buttonWhite} onPress={signinHandler}>
              <Text style={styles.buttonTextBlack}>Sign in</Text>
            </Pressable>
          </Animated.View>
          <Animated.View style={buttonAnimatedStyle}>
            <Pressable style={styles.buttonBlue} onPress={registerHandler}>
              <Text style={styles.buttonTextWhite}>Sign in with Google</Text>
            </Pressable>
          </Animated.View>
          {ismodalView && (
            <View>
              <Animated.View style={textInputAnimatedStyle}>
                <CustomInput
                  control={control}
                  name="email"
                  rules={{
                    required: "Email required",
                    minLength: {
                      value: 5,
                      message: "Email needs to be a minimum of 5 characters",
                    },
                  }}
                  placeholder="Email"
                  secureTextEntry={false}
                  errorMessage="Error"
                />
                <CustomInput
                  control={control}
                  name="password"
                  rules={{
                    required: "Password required",
                    minLength: {
                      value: 6,
                      message: "Password needs to be a minimum of 6 characters",
                    },
                  }}
                  placeholder="Password"
                  secureTextEntry={true}
                  errorMessage="Error"
                />
                {/* <CustomButton
                  buttonColor="#d39e90"
                  borderColor="#f2e2de"
                  textColor="#fff"
                  shadow={true}
                  onPress={() => handleSubmit(loginHandler)}
                  buttonText="Login"
                /> */}
                <Pressable
                  style={styles.formButton}
                  onPress={handleSubmit(loginHandler)}
                >
                  <Text style={styles.buttonTextWhite}>Login</Text>
                </Pressable>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 20,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: "black",
                        fontWeight: "600",
                        fontSize: 16,
                      }}
                    >
                      New user?
                    </Text>
                  </View>
                  <Pressable onPress={registerHandler}>
                    <Text
                      style={{
                        color: "#207dbd",
                        fontWeight: "400",
                        fontSize: 20,
                      }}
                    >
                      Register
                    </Text>
                  </Pressable>
                </View>
              </Animated.View>
            </View>
          )}
        </View>
      </View>
    </>
  );
}
