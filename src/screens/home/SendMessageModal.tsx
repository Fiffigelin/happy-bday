import CustomCloseButton from "@/src/components/customCloseButton";
import { resetImage } from "@/src/features/image/image.slice";
import { resetMessage } from "@/src/features/message/message.slice";
import { useAppDispatch, useAppSelector } from "@/src/features/store";
import { Contact } from "@/types";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import React, { useRef } from "react";
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

  //   useEffect(() => {
  //     async function fetchMessage() {
  //       try {
  //         dispatch(setSelectedMessage(message?.id));
  //       } catch (error) {
  //         console.error("Error fetching message:", error);
  //       }
  //     }

  //     fetchMessage();
  //   }, [contact.message_id]);

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
      style={[styles.modalContainer, { height: height, width: width }]}
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={() => {
        closeModal;
      }}
    >
      <View style={[styles.modalContent, { height: "80%" }]}>
        <View style={styles.modalHeader}>
          <CustomCloseButton onPress={closeModal} colors={["white"]} start={{
                      x: 0.5,
                      y: 0.5
                  }} end={{
                      x: 0.25,
                      y: 1
                  }} locations={[2]} name={"close-circle"} size={40} />
        </View>
        <View style={styles.container}>
          <View
            style={formStyle.container}
            ref={viewRef as any}
            collapsable={false}
          >
            <View>
              <Image source={{ uri: image?.url }} style={styles.image} />
            </View>
            <TextInput
              editable
              multiline
              numberOfLines={4}
              maxLength={50}
              value={message?.message}
              style={{ padding: 10 }}
            />
          </View>
          <View>
            <TouchableOpacity
              style={{ marginTop: 30 }}
              onPress={shareDummyImage}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  textAlign: "center",
                  color: "red",
                }}
              >
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

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
});
