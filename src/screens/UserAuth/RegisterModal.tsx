import CustomCloseButton from "@/src/components/customCloseButton";
import CustomInput from "@/src/components/customInput";
import CustomToast from "@/src/components/customToast";
import { useAppDispatch } from "@/src/features/store";
import { registerNewUserAPI } from "@/src/features/user/user.slice";
import { UserCredential } from "@/types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface RegisterModal {
  visible: boolean;
  closeModal: () => void;
}
const RegisterModal: React.FC<RegisterModal> = ({ visible, closeModal }) => {
  const { height, width } = Dimensions.get("window");
  const { control, handleSubmit, watch } = useForm();
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const pwd = watch("password");
  const dispatch = useAppDispatch();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setMessage] = useState<string>("");

  const showToastHandler = (text: string) => {
    setMessage(text);
    setShowToast(true);
  };

  const closeToastHandler = () => {
    setShowToast(false);
  };

  const signinHandler = async (data: any) => {
    const userCred: UserCredential = {
      email: data.email,
      password: data.password,
      name: data.name,
      uid: "",
    };

    const result = await dispatch(registerNewUserAPI(userCred));
    const payload = result?.payload;
    if (payload === true) {
      showToastHandler("Registration succeded");
      setTimeout(() => {
        closeModal();
      }, 2000);
    } else if (payload === "Firebase: Error (auth/email-already-in-use).") {
      showToastHandler("Email is already in use");
    }
  };

  return (
    <Modal
      style={[styles.modalContainer, { height: height, width: width }]}
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={() => {
        closeModal();
      }}
    >
      <View style={[styles.modalContent, { height: "100%" }]}>
        <View style={styles.modalHeader}>
          <CustomCloseButton onPress={closeModal} />
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            height: height * 0.85,
          }}
        >
          <View>
            <CustomInput
              control={control}
              name={"name"}
              placeholder="Name"
              rules={{
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name needs to be a minimum of 2 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Name need to be a maximum of 20 characters",
                },
              }}
              secureTextEntry={false}
              errorMessage="Error"
            />
            <CustomInput
              control={control}
              name={"email"}
              placeholder="Email"
              rules={{
                required: "Email required",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Invalid email",
                },
              }}
              secureTextEntry={false}
              errorMessage="Error"
            />
            <CustomInput
              control={control}
              name={"password"}
              placeholder="Password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 2,
                  message:
                    "Password needs to be a minimum of 6 characters and contain a minimum of 3 letters and 3 numbers",
                },
              }}
              secureTextEntry={true}
              errorMessage="Error"
            />
            <CustomInput
              control={control}
              name={"confirm-password"}
              placeholder="Confirm password"
              rules={{
                validate: (value: string) =>
                  value === pwd || "Password do not match",
              }}
              secureTextEntry={true}
              errorMessage="Error"
            />
            {showToast && (
              <CustomToast message={toastMessage} onClose={closeToastHandler} />
            )}
          </View>
          <View>
            <Pressable
              style={styles.formButton}
              onPress={handleSubmit(signinHandler)}
            >
              <Text style={styles.buttonTextWhite}>Register</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 20,
  },
  formButton: {
    backgroundColor: "#d39e90",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#f2e2de",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonTextWhite: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    letterSpacing: 0.5,
  },
});

export default RegisterModal;
