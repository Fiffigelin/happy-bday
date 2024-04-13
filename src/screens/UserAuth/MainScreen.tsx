import CloseCustomButton from "@/src/components/customCloseButton";
import CustomInput from "@/src/components/customInput";
import { useAppDispatch } from "@/src/features/store";
import { loginRegisteredUserAPI } from "@/src/features/user/user.slice";
import styles from "@/style";
import { LoginUser } from "@/types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dimensions,
  Keyboard,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { ClipPath, Ellipse, Image } from "react-native-svg";
import RegisterModal from "./RegisterModal";

export default function MainPage() {
  const { height, width } = Dimensions.get("window");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  /* <<<<<<<<<<<<<<<<<<<< Curtain animation >>>>>>>>>>>>>>>>>>>> */
  const imageScale = useSharedValue(2.7);
  const imagePosition = useSharedValue(1);
  /* <<<<<<<<<<<<<<<<<<<< Redux related data >>>>>>>>>>>>>>>>>>>> */
  const dispatch = useAppDispatch();
  /* <<<<<<<<<<<<<<<<<<<<<<< useState data >>>>>>>>>>>>>>>>>>>>>>> */
  const [isCurtainOpen, setCurtain] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

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
    setCurtain(true);
  };

  const registerHandler = () => {
    setModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const loginHandler = async (data: any) => {
    const loginUser: LoginUser = {
      email: data.email,
      password: data.password,
    };

    dispatch(loginRegisteredUserAPI(loginUser));
  };

  const handleCloseBtn = () => {
    imagePosition.value = 1;
    setCurtain(false);
  };

  useEffect(() => {
    if (!isModalOpen) {
      const keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        () => {
          imageScale.value = 1.35;
        }
      );
      const keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        () => {
          imageScale.value = 2.7;
        }
      );

      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }
  }, [isModalOpen]);

  return (
    <View style={isCurtainOpen ? styles.containerTwo : styles.container}>
      <Animated.View style={[styles.cover, imageAnimatedStyle]}>
        <Svg height={height} width={width}>
          {isCurtainOpen && (
            <ClipPath id="clipPathId">
              <Ellipse cx={width / 2} rx={height} ry={height}></Ellipse>
            </ClipPath>
          )}
          <Image
            href={require("../../../assets/login-no-background.png")}
            width={width}
            height={height}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clipPathId)"
          />
        </Svg>
        {isCurtainOpen && (
          <View style={{ marginTop: 2 }}>
            <CloseCustomButton
              onPress={handleCloseBtn}
              colors={["#c791d9", "#5D0D90"]}
              start={{
                x: 0.2,
                y: 0.2,
              }}
              end={{
                x: 0,
                y: 1,
              }}
              locations={[0, 1]}
              name={"close-circle"}
              size={55}
            />
          </View>
        )}
      </Animated.View>
      <View style={styles.buttonContainer}>
        <Animated.View style={buttonAnimatedStyle}>
          <TouchableOpacity style={styles.buttonWhite} onPress={signinHandler}>
            <Text style={styles.buttonTextBlack}>Sign in</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={buttonAnimatedStyle}>
          <TouchableOpacity style={styles.buttonBlue} onPress={() => {}}>
            <Text style={styles.buttonTextWhite}>Sign in with Google</Text>
          </TouchableOpacity>
        </Animated.View>
        {isCurtainOpen && (
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
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                }}
                placeholder="Email"
                secureTextEntry={false}
                errorMessage={errors.email?.message as string}
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
              <TouchableOpacity
                style={styles.formButton}
                onPress={handleSubmit(loginHandler)}
              >
                <Text style={styles.buttonTextWhite}>Login</Text>
              </TouchableOpacity>
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
                      color: "#0011ce",
                      fontWeight: "900",
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
      <RegisterModal visible={isModalOpen} closeModal={registerHandler} />
    </View>
  );
}
