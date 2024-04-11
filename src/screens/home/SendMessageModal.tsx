import CloseCustomButton from "@/src/components/customCloseButton";
import { resetImage } from "@/src/features/image/image.slice";
import {
  resetMessage,
  setSelectedMessage,
} from "@/src/features/message/message.slice";
import { useAppDispatch, useAppSelector } from "@/src/features/store";
import styles from "@/style";
import { Contact } from "@/types";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { captureRef } from "react-native-view-shot";

interface SendMessageProps {
  visible: boolean;
  contact: Contact;
  onClose: () => void;
}

export default function SendMessageModal({
  visible,
  contact,
  onClose,
}: SendMessageProps) {
  const { height, width } = Dimensions.get("window");
  const [showNoMessage, setNoMessage] = useState<boolean>(false);
  const message = useAppSelector((state) => state.message.selectedMessage);
  const image = useAppSelector((state) => state.image.selectedImage);

  const dispatch = useAppDispatch();

  const viewRef = useRef();

  async function shareDummyImage() {
    try {
      const uri = await captureRef(viewRef, {
        format: "png",
        quality: 0.7,
      });
      const fileUri = FileSystem.cacheDirectory + "dummyImage.png";
      await FileSystem.copyAsync({ from: uri, to: fileUri });

      await Sharing.shareAsync(fileUri);
    } catch (err) {
      console.error(err);
    }
  }

  function closeModal() {
    dispatch(resetMessage(null));
    dispatch(resetImage(null));
    onClose();
  }

  useEffect(() => {
    console.log("message: ", message);
    async function fetchMessage() {
      try {
        if (contact.message_id) {
          dispatch(setSelectedMessage(message?.id));
          console.log("message: ", message);
        } else {
          setNoMessage(true);
        }
      } catch (error) {
        console.error("Error fetching message:", error);
      }
    }

    fetchMessage();
  }, [contact.id]);

  const formStyle = StyleSheet.create({
    container: {
      width: width * 0.8,
      margin: 20,
      borderRadius: 10,
      borderColor: "gray",
      backgroundColor: "white",
      padding: 15,
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });
  return (
    <Modal
      style={[modalStyles.modalContainer, { height: height, width: width }]}
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={() => {
        closeModal;
      }}
    >
      <View style={[modalStyles.modalContent, { height: "80%" }]}>
        <View style={modalStyles.modalHeader}>
          <CloseCustomButton
            onPress={closeModal}
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
            size={40}
          />
        </View>
        <View style={modalStyles.container}>
          <View
            style={formStyle.container}
            ref={viewRef as any}
            collapsable={false}
          >
            <View>
              <Image
                source={
                  showNoMessage
                    ? require("../../../assets/sad-balloon-with-copy-space-blue-monday.jpg")
                    : { uri: image?.url }
                }
                // source={
                //   showNoMessage
                //     ? {
                //       href=(require("../../../../assets/sad-balloon-with-copy-space-blue-monday.jpg"")
                //     }
                //     : { uri: image?.url }
                // }
                style={modalStyles.image}
              />
            </View>
            <TextInput
              editable
              multiline
              numberOfLines={4}
              maxLength={50}
              value={
                showNoMessage
                  ? "There's no BDay card to send! "
                  : message?.message
              }
              style={{ padding: 10 }}
            />
          </View>
          <View style={{ width: "80%" }}>
            {showNoMessage ? (
              <View
                style={[modalStyles.formButton, { backgroundColor: "gray" }]}
              >
                <Text style={styles.buttonTextWhite}>Send</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={[modalStyles.formButton, { backgroundColor: "#973EB5" }]}
                onPress={showNoMessage ? () => {} : shareDummyImage}
              >
                <Text style={styles.buttonTextWhite}>Send</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  text: {
    color: "gray",
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 8,
  },
  image: {
    width: "100%",
    height: 300,
    objectFit: "scale-down",
    borderRadius: 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  formButton: {
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
