import React from "react";
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

  return (
    <Modal
      style={[styles.modalContainer, { height: height * 0.8, width: width }]}
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        closeModal();
      }}
    >
      <View style={[styles.modalContent, { height: "100%" }]}>
        <Pressable
          onPress={closeModal}
          style={{ width: "80%", backgroundColor: "purple", height: 40 }}
        >
          <Text>Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
});

export default RegisterModal;
