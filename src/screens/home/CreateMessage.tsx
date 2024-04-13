import BirthdayForm from "@/src/components/birthdayForm";
import GradientIcon from "@/src/components/gradient-component/gradientIcon";
import GradientText from "@/src/components/gradient-component/gradientText";
import PickContactCard from "@/src/components/pickContact";
import {
  fetchContactsAPI,
  putMessageToContact,
} from "@/src/features/contact/contact.slice";
import { createMessageAPI } from "@/src/features/message/message.slice";
import { useAppDispatch, useAppSelector } from "@/src/features/store";
import { HomeScreenProps } from "@/src/navigation/NavigationTypes";
import { MessageCredential, MessageToContact } from "@/types";
import React, { ReactNode, useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = HomeScreenProps<"CreateMessage">;

export default function CreateMessage({ route, navigation }: Props) {
  const id = route.params?.id;
  /* <<<<<<<<<<<<<<<<<<<< Redux related data >>>>>>>>>>>>>>>>>>>> */
  const dispatch = useAppDispatch();
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
  /* <<<<<<<<<<<<<<<<<<<<<<< useState data >>>>>>>>>>>>>>>>>>>>>>> */
  const [changeText, onChangeText] = useState<string>();
  const { width } = Dimensions.get("window");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  function toggleContactSelection(contactId: string): void {
    const newSelectedContacts = [...selectedContacts];

    if (selectedContacts.includes(contactId)) {
      const selectedIndex = newSelectedContacts.indexOf(contactId);
      newSelectedContacts.splice(selectedIndex, 1);
    } else {
      newSelectedContacts.push(contactId);
    }

    setSelectedContacts(newSelectedContacts);
  }

  function AddButton(disable: boolean): ReactNode {
    return (
      <GradientIcon
        colors={disable ? ["gray", "gray"] : ["#c791d9", "#5D0D90"]}
        start={{ x: 0.2, y: 0.2 }}
        end={{ x: 0, y: 1 }}
        name={"plus-circle"}
        locations={[0, 1]}
        size={60}
      />
    );
  }

  useEffect(() => {
    const connectMessageWithContacts = async () => {
      const messageToContact: MessageToContact = {
        contacts: selectedContacts,
        message_id: message?.id!,
      };
      await dispatch(putMessageToContact(messageToContact));
    };

    if (savedMessageSuccessful && message) {
      connectMessageWithContacts();
    } else if (!savedMessageSuccessful && message) {
    }
  }, [savedMessageSuccessful, message]);

  useEffect(() => {
    if (connectedMsgToContact) {
      setSelectedContacts([]);
      dispatch(fetchContactsAPI(user?.id!));
      navigation.navigate("Home");
    }
  }, [connectedMsgToContact]);

  async function createMessage() {
    const messageCred: MessageCredential = {
      userId: user?.id!,
      imageId: image?.id!,
      message: changeText ? changeText! : "Congratulations on your birthday 🎉",
    };

    await dispatch(createMessageAPI(messageCred));
  }

  function handleTextChange(text: string): void {
    onChangeText(text);
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <BirthdayForm image={image!} onTextChange={handleTextChange} />
          <View style={styles.formContainer}>
            {selectedContacts.length > 0 ? (
              <TouchableOpacity onPress={createMessage}>
                {AddButton(false)}
              </TouchableOpacity>
            ) : (
              <View>{AddButton(true)}</View>
            )}
          </View>
          <View
            style={{
              width: width * 0.8,
              alignSelf: "center",
            }}
          >
            <GradientText
              colors={["#b975d0", "#441c51"]}
              start={{ x: 0.5, y: 0.25 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.textStyle}
            >
              Choose contacts
            </GradientText>
            <View style={styles.contactsContainer}>
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
    paddingTop: 120,
    flex: 1,
    backgroundColor: "#f9fafa",
    alignItems: "center",
  },
  contactsContainer: {
    flex: 1,
    alignItems: "center",
  },
  formContainer: {
    marginTop: 20,
    width: "90%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  textStyle: {
    marginLeft: 8,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 32,
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
