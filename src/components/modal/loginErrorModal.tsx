import React from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CustomModalProps {
  visible: boolean;
  errorText: string;
  onPress: () => void;
}

export default function LoginErrorModal({
  visible,
  errorText,
  onPress,
}: CustomModalProps) {
  const { width, height } = Dimensions.get("window");

  const modalStyles = StyleSheet.create({
    modalView: {
      width: width * 0.8,
      height: height * 0.25,
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={modalStyles.modalView}>
          <Text style={styles.modalText}>{errorText}</Text>
          <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
            <TouchableOpacity
              onPress={onPress}
              style={{ ...styles.button, backgroundColor: "#7110ae" }}
            >
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "justify",
    fontSize: 20,
  },
});
