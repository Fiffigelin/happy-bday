import { setSelectedMessage } from "@/src/features/message/message.slice";
import { useAppDispatch, useAppSelector } from "@/src/features/store";
import { HomeScreenProps } from "@/src/navigation/NavigationTypes";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import React, { useEffect, useRef } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { captureRef } from "react-native-view-shot";

type Props = HomeScreenProps<"HandleMessage">;

export default function HandleMessage({ route, navigation }: Props) {
  const contact = route.params?.contact;
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

  useEffect(() => {
    console.log("coontact: ", contact);
    async function fetchMessage() {
      try {
        await dispatch(setSelectedMessage(message?.id));
        console.log("message: ", message);
        console.log("image: ", image);
      } catch (error) {
        console.error("Error fetching message:", error);
      }
    }

    fetchMessage();
  }, [contact.message_id]);

  const { width } = Dimensions.get("window");

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
        <TouchableOpacity style={{ marginTop: 30 }} onPress={shareDummyImage}>
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
  );
}

const styles = StyleSheet.create({
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
