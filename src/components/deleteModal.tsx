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
  contactId: string;
  closeModal: () => void;
}

export default function DeleteModal({
  visible,
  contactId,
  closeModal,
}: CustomModalProps) {
  const { width, height } = Dimensions.get("window");

  const modalStyles = StyleSheet.create({
    modalView: {
      width: width * 0.8,
      height: height * 0.4,
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

  function deleteContact() {
    console.log("Contact deleted! ID: ", contactId);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        closeModal();
      }}
    >
      <View style={styles.centeredView}>
        <View style={modalStyles.modalView}>
          <Text style={styles.modalText}>
            This is a custom modal! And this is the contacts id: {contactId}
          </Text>

          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: "#2196F3" }}
            onPress={() => {
              closeModal();
            }}
          >
            <Text style={styles.buttonText}>Exit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: "#4CAF50" }}
            onPress={() => deleteContact()}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
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
    elevation: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
