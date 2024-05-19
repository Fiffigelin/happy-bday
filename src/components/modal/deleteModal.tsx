import React from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  deleteContactsAPI,
  fetchContactsAPI,
} from "../../features/contact/contact.slice";
import { useAppDispatch } from "../../features/store";

interface CustomModalProps {
  visible: boolean;
  contactId: string;
  userId: string;
  closeModal: () => void;
}

export default function DeleteModal({
  visible,
  contactId,
  userId,
  closeModal,
}: CustomModalProps) {
  const { width, height } = Dimensions.get("window");
  const dispatch = useAppDispatch();

  const modalStyles = StyleSheet.create({
    modalView: {
      width: width * 0.8,
      height: height * 0.2,
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

  async function deleteContact() {
    const response = await dispatch(deleteContactsAPI(contactId));
    if (response) {
      dispatch(fetchContactsAPI(userId));
    }
    closeModal();
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
          <Text style={styles.modalText}>Confirm deletion of the contact?</Text>
          <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
            <TouchableOpacity
              style={{
                ...styles.button,
                backgroundColor: "#fff",
              }}
              onPress={() => {
                closeModal();
              }}
            >
              <Text style={styles.buttonText}>NO</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ ...styles.button, backgroundColor: "#7110ae" }}
              onPress={() => deleteContact()}
            >
              <Text style={styles.buttonTextDanger}>YES</Text>
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
  buttonTextDanger: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "justify",
    fontSize: 20,
  },
});
