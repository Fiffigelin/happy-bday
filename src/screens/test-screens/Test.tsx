// import CloseCustomButton from "@/src/components/customCloseButton";
// import CustomInput from "@/src/components/customInput";
// import { useAppDispatch } from "@/src/features/store";
// import { loginRegisteredUserAPI } from "@/src/features/user/user.slice";
// import { TestScreenProps } from "@/src/navigation/NavigationTypes";
// import styles from "@/style";
// import { LoginUser } from "@/types";
// import { LinearGradient } from "expo-linear-gradient";
// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Dimensions, Keyboard, Pressable, Text, View } from "react-native";
// import Animated, {
//   interpolate,
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from "react-native-reanimated";
// import Svg, { ClipPath, Ellipse, Image } from "react-native-svg";
// import RegisterModal from "../UserAuth/RegisterModal";

// type Props = TestScreenProps<"Test">;

// export default function Test(props: Props) {
//   const dispatch = useAppDispatch();
//   const imageScale = useSharedValue(2.7);
//   const imagePosition = useSharedValue(1);
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const [isCurtainOpen, setCurtain] = useState(false);
//   const [isModalOpen, setModalOpen] = useState(false);
//   const { height, width } = Dimensions.get("window");

//   // Funktion för att hantera knapptryck för att öppna sidan för inloggning
//   const signinHandler = () => {
//     imagePosition.value = 0;
//     setCurtain(true);
//   };

//   // Funktion för att hantera knapptryck för att öppna registreringssidan
//   const registerHandler = () => {
//     setModalOpen(true);
//   };

//   // Funktion för att stänga modalen för registrering
//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   // Funktion för att hantera inloggning
//   const loginHandler = async (data: any) => {
//     const loginUser: LoginUser = {
//       email: data.email,
//       password: data.password,
//     };
//     dispatch(loginRegisteredUserAPI(loginUser));
//   };

//   // Funktion för att hantera stängning av inloggningsvyn
//   const handleCloseBtn = () => {
//     imagePosition.value = 1;
//     setCurtain(false);
//   };

//   // Effekt för att lyssna på tangentbordshändelser
//   useEffect(() => {
//     const keyboardDidShowListener = Keyboard.addListener(
//       "keyboardDidShow",
//       () => {
//         imageScale.value = 1.35;
//       }
//     );
//     const keyboardDidHideListener = Keyboard.addListener(
//       "keyboardDidHide",
//       () => {
//         imageScale.value = 2.7;
//       }
//     );

//     return () => {
//       keyboardDidShowListener.remove();
//       keyboardDidHideListener.remove();
//     };
//   }, []);

//   // Animation för bild
//   const imageAnimatedStyle = useAnimatedStyle(() => ({
//     transform: [
//       {
//         translateY: withTiming(
//           interpolate(
//             imagePosition.value,
//             [0, 1],
//             [-height / imageScale.value, 0]
//           ),
//           { duration: imageScale.value === 1.25 ? 400 : 1000 }
//         ),
//       },
//     ],
//   }));

//   // Animation för knappar
//   const buttonAnimatedStyle = useAnimatedStyle(() => ({
//     opacity: withTiming(imagePosition.value, { duration: 500 }),
//     transform: [
//       {
//         translateY: withTiming(
//           interpolate(imagePosition.value, [0, 1], [250, 0]),
//           { duration: 1000 }
//         ),
//       },
//     ],
//   }));

//   // Animation för textinmatning
//   const textInputAnimatedStyle = useAnimatedStyle(() => ({
//     opacity: withTiming(imagePosition.value + 1, { duration: 500 }),
//   }));

//   // Återgivning av JSX
//   return (
//     <LinearGradient
//       colors={["#FFAAD9", "#C79BF2", "#680ea3", "#290641"]}
//       style={isCurtainOpen ? styles.containerTwo : styles.container}
//     >
//       <View style={isCurtainOpen ? styles.containerTwo : styles.container}>
//         <Animated.View style={[styles.cover, imageAnimatedStyle]}>
//           <Svg height={height} width={width}>
//             {isCurtainOpen && (
//               <ClipPath id="clipPathId">
//                 <Ellipse cx={width / 2} rx={height} ry={height}></Ellipse>
//               </ClipPath>
//             )}
//             <Image
//               href={require("../../../assets/login-no-background.png")}
//               width={width}
//               height={height}
//               preserveAspectRatio="xMidYMid slice"
//               clipPath="url(#clipPathId)"
//             />
//           </Svg>
//           {isCurtainOpen && <CloseCustomButton onPress={handleCloseBtn} />}
//         </Animated.View>
//         <View style={styles.buttonContainer}>
//           <Animated.View style={buttonAnimatedStyle}>
//             <Pressable style={styles.buttonWhite} onPress={signinHandler}>
//               <Text style={styles.buttonTextBlack}>Sign in</Text>
//             </Pressable>
//           </Animated.View>
//           <Animated.View style={buttonAnimatedStyle}>
//             <Pressable style={styles.buttonBlue} onPress={registerHandler}>
//               <Text style={styles.buttonTextWhite}>Sign in with Google</Text>
//             </Pressable>
//           </Animated.View>
//           {isCurtainOpen && (
//             <View>
//               <Animated.View style={textInputAnimatedStyle}>
//                 <CustomInput
//                   control={control}
//                   name="email"
//                   rules={{
//                     required: "Email required",
//                     minLength: {
//                       value: 5,
//                       message: "Email needs to be a minimum of 5 characters",
//                     },
//                     pattern: {
//                       value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                       message: "Invalid email address",
//                     },
//                   }}
//                   placeholder="Email"
//                   secureTextEntry={false}
//                   errorMessage={errors.email?.message as string}
//                 />
//                 <CustomInput
//                   control={control}
//                   name="password"
//                   rules={{
//                     required: "Password required",
//                     minLength: {
//                       value: 6,
//                       message: "Password needs to be a minimum of 6 characters",
//                     },
//                   }}
//                   placeholder="Password"
//                   secureTextEntry={true}
//                   errorMessage="Error"
//                 />
//                 <Pressable
//                   style={styles.formButton}
//                   onPress={handleSubmit(loginHandler)}
//                 >
//                   <Text style={styles.buttonTextWhite}>Login</Text>
//                 </Pressable>
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                     margin: 20,
//                   }}
//                 >
//                   <View>
//                     <Text
//                       style={{
//                         color: "black",
//                         fontWeight: "600",
//                         fontSize: 16,
//                       }}
//                     >
//                       New user?
//                     </Text>
//                   </View>
//                   <Pressable onPress={registerHandler}>
//                     <Text
//                       style={{
//                         color: "#207dbd",
//                         fontWeight: "400",
//                         fontSize: 20,
//                       }}
//                     >
//                       Register
//                     </Text>
//                   </Pressable>
//                 </View>
//               </Animated.View>
//             </View>
//           )}
//         </View>
//       </View>
//       <RegisterModal visible={isModalOpen} closeModal={closeModal} />
//     </LinearGradient>
//   );
// }
