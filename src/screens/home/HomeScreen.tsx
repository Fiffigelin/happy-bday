import CustomImageCarousel from "@/src/components/customImageCarousel";
import CustomToast from "@/src/components/customToast";
import GradientText from "@/src/components/gradient-component/gradientText";
import UpComingBirthdayCard from "@/src/components/upComingBirthdayCard";
import {
  fetchContactsAPI,
  resetMessageSuccessful,
} from "@/src/features/contact/contact.slice";
import { setSelectedImage } from "@/src/features/image/image.slice";
import {
  resetMessage,
  setSelectedMessage,
} from "@/src/features/message/message.slice";
import { getUpcomingBirthdays } from "@/src/services/sortUpComingBirthdays";
import { BdayImage, Category, Contact } from "@/types";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../features/store";
import { HomeScreenProps } from "../../navigation/NavigationTypes";
import SortImagesService from "../../services/sortImages.service";
import SendMessageModal from "./SendMessageModal";

type Props = HomeScreenProps<"Home">;

export default function HomeScreen({ navigation }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [imageArray, setImageArray] = useState<(BdayImage[] | undefined)[]>([]);
  const dispatch = useAppDispatch();
  const images = useAppSelector((state) => state.image.images);
  const user = useAppSelector((state) => state.user.user);
  const messages = useAppSelector((state) => state.message.messages);
  const message = useAppSelector((state) => state.message.message);
  const selectedMessage = useAppSelector(
    (state) => state.message.selectedMessage
  );
  const selectedImage = useAppSelector((state) => state.image.selectedImage);
  const contacts = useAppSelector((state) => state.contact.contacts);
  const connectedMsgToContact = useAppSelector(
    (state) => state.contact.isMessageAdded
  );
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setMessage] = useState<string>("");
  let upComingBirthdays: Contact[] = getUpcomingBirthdays(contacts!);

  const handleImagePress = (id: string) => {
    navigation.navigate("CreateMessage", { id });
  };

  function handleBirthdayCardPress(contact: Contact) {
    dispatch(setSelectedMessage(contact?.message_id));
    dispatch(setSelectedImage(selectedMessage?.image_id));
    setSelectedContact(contact);
    setShowModal(true);
  }

  useEffect(() => {
    if (selectedMessage) {
      console.log("message: ", selectedMessage);
      dispatch(setSelectedImage(selectedMessage?.image_id));
    }
  }, [selectedMessage]);

  useEffect(() => {
    const sortedImages = SortImagesService.sortImagesByCategory(images!);
    console.log("messages homescreen: ", messages);

    setImageArray([
      sortedImages[Category.People],
      sortedImages[Category.Animals],
      sortedImages[Category.Dinos],
    ]);
  }, [images]);

  useEffect(() => {
    dispatch(fetchContactsAPI(user?.id!));
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (message?.id) {
        setMessage("Message added succesfully");
        setShowToast(true);
      } else if (message?.id) {
        setMessage("Something went wrong");
        setShowToast(true);
      }
      dispatch(resetMessage(null));
      dispatch(resetMessageSuccessful(false));
    }, [connectedMsgToContact])
  );

  function renderUpComingCelebration() {
    return (
      <View style={{ height: 300, marginTop: 50, marginHorizontal: 25 }}>
        <GradientText
          colors={["#b975d0", "#441c51"]}
          start={{ x: 0.5, y: 0.25 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.textStyle}
        >
          Celebrate birthday!
        </GradientText>
        {upComingBirthdays.map((contact) => (
          <View key={contact.id}>
            <UpComingBirthdayCard
              contact={contact}
              onCardPress={handleBirthdayCardPress}
            />
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f9fafa" }}>
      <View style={{ height: 300, margin: 50, marginHorizontal: 25 }}>
        {renderUpComingCelebration()}
      </View>
      <View style={{ marginBottom: 25, flex: 3 }}>
        <GradientText
          colors={["#b975d0", "#441c51"]}
          start={{ x: 0.5, y: 0.25 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.textStyle}
        >
          Create a gratulationmessage!
        </GradientText>
        <ScrollView>
          {imageArray?.map((category, index) => (
            <View key={index}>
              <Text></Text>
              <CustomImageCarousel
                images={category}
                onPressImage={handleImagePress}
              />
            </View>
          ))}
        </ScrollView>
      </View>
      {showToast && <CustomToast message={toastMessage} onClose={() => {}} />}
      {showModal && selectedContact && (
        <SendMessageModal
          visible={true}
          contact={selectedContact}
          onClose={() => setShowModal(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontWeight: "700",
    fontSize: 25,
    textAlign: "center",
  },
});
