import React, { useState } from "react";
import { Form } from "react-hook-form";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  errorMessage: string;
  buttonMessage: string;
  onClose: () => void;
}

export default function ErrorModule(props: Props) {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const closeModal = () => {
    setIsModalVisible(false);
    props.onClose();
  };

  if (!isModalVisible) {
    return null;
  }

  return (
    <Modal transparent={true} visible={isModalVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <Form style={{ alignContent: "center" }}>
          <Text style={styles.text}>{props.errorMessage}</Text>
          <TouchableOpacity onPress={closeModal}>
            <Text>{props.buttonMessage}</Text>
          </TouchableOpacity>
        </Form>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    height: 600,
    padding: 20,
    margin: 16,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 20,
    maxWidth: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  popup: {
    width: 200,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
});
