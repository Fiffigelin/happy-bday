import PickContactCard from "@/src/components/pickContact";
import RoundButton from "@/src/components/roundButton";
import { putMessageToContact } from "@/src/features/contact/contact.slice";
import { createMessageAPI } from "@/src/features/message/message.slice";
import { useAppDispatch, useAppSelector } from "@/src/features/store";
import { HomeScreenProps } from "@/src/navigation/NavigationTypes";
import { MessageCredential, MessageToContact } from "@/types";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = HomeScreenProps<"CreateMessage">;

export default function CreateMessage({ route, navigation }: Props) {
  const id = route.params?.id;
  const image = useAppSelector((state) =>
    state.image.images?.find((image) => image.id === id)
  );
  const user = useAppSelector((state) => state.user.user);
  const contacts = useAppSelector((state) => state.contact.contacts);
  const message = useAppSelector((state) => state.message.message);
  const savedMessageSuccessful = useAppSelector(
    (state) => state.message.isMessageSaved
  );
  const connectedMsgToContact = useAppSelector(
    (state) => state.contact.isMessageAdded
  );
  const dispatch = useAppDispatch();
  const [changeText, onChangeText] = useState<string>();
  const { width } = Dimensions.get("window");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const toggleContactSelection = (contactId: string) => {
    const newSelectedContacts = [...selectedContacts];

    if (selectedContacts.includes(contactId)) {
      const selectedIndex = newSelectedContacts.indexOf(contactId);
      newSelectedContacts.splice(selectedIndex, 1);
    } else {
      newSelectedContacts.push(contactId);
    }

    setSelectedContacts(newSelectedContacts);
  };

  useEffect(() => {
    const connectMessageWithContacts = async () => {
      const messageToContact: MessageToContact = {
        contacts: selectedContacts,
        message_id: message?.id!,
      };
      console.log("MESSAGE_ID: ", messageToContact.message_id);
      await dispatch(putMessageToContact(messageToContact));
      console.log("Boolean: ", connectedMsgToContact);
    };

    if (savedMessageSuccessful && message) {
      console.log("Message saved successfully:", message);
      connectMessageWithContacts();
      console.log("Boolean: ", connectedMsgToContact);
    } else if (!savedMessageSuccessful && message) {
      console.log("Failed to save message:", message);
    }
  }, [savedMessageSuccessful, message]);

  useEffect(() => {
    console.log("Här");
    if (connectedMsgToContact) {
      setSelectedContacts([]);
      navigation.navigate("Home");
    } else {
      console.log("Nope!");
    }
  }, [connectedMsgToContact]);

  async function createMessage() {
    const messageCred: MessageCredential = {
      userId: user?.id!,
      imageId: image?.id!,
      message: changeText!,
    };
    console.log("MESSAGE: ", messageCred);

    await dispatch(createMessageAPI(messageCred));
  }

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
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{ alignItems: "center" }}>
            <View style={formStyle.container}>
              <View>
                <Image source={{ uri: image?.url }} style={styles.image} />
              </View>
              <TextInput
                editable
                multiline
                numberOfLines={4}
                maxLength={50}
                onChangeText={(text) => onChangeText(text)}
                value={changeText}
                style={{ padding: 10 }}
                placeholder="Congratulations on your birthday 🎉"
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              width: "90%",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <RoundButton
              onPress={createMessage}
              buttonColor={"#f2a3bb"}
              disabledColor={"#f9d5e0"}
              textColor={"black"}
              buttonText={"+"}
              buttonTextSize={25}
              widht_hight={50}
              disabled={selectedContacts.length === 0}
            />
          </View>
          <View
            style={{
              width: width * 0.8,
              alignSelf: "center",
              marginBottom: 20,
            }}
          >
            <Text style={styles.text}>Choose contacts</Text>
            <View style={styles.container}>
              {contacts?.map((contact) => (
                <TouchableOpacity
                  key={contact.id}
                  style={styles.checkboxContainer}
                  onPress={() => toggleContactSelection(contact.id)}
                >
                  <PickContactCard
                    contact={contact}
                    selected={selectedContacts.includes(contact.id)}
                    onPress={() => toggleContactSelection(contact.id)}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
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
