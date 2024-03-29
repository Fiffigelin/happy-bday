import CustomImageCarousel from "@/src/components/customImageCarousel";
import CustomToast from "@/src/components/customToast";
import GradientText from "@/src/components/gradientText";
import UpComingBirthdayCard from "@/src/components/upComingBirthdayCard";
import { resetMessageSuccessful } from "@/src/features/contact/contact.slice";
import { resetMessage } from "@/src/features/message/message.slice";
import { getUpcomingBirthdays } from "@/src/services/sortUpComingBirthdays";
import { BdayImage, Category, Contact } from "@/types";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../features/store";
import { HomeScreenProps } from "../../navigation/NavigationTypes";
import SortImagesService from "../../services/sortImages.service";

type Props = HomeScreenProps<"Home">;

export default function HomeScreen({ navigation }: Props) {
  const [imageArray, setImageArray] = useState<(BdayImage[] | undefined)[]>([]);
  const dispatch = useAppDispatch();
  const images = useAppSelector((state) => state.image.images);
  const user = useAppSelector((state) => state.user.user);
  const message = useAppSelector((state) => state.message.message);
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

  useEffect(() => {
    const sortedImages = SortImagesService.sortImagesByCategory(images!);

    setImageArray([
      sortedImages[Category.People],
      sortedImages[Category.Animals],
      sortedImages[Category.Dinos],
    ]);
  }, [images]);

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
        <Text style={{ fontSize: 20, fontWeight: "600", textAlign: "center" }}>
          Celebrate!
        </Text>
        {upComingBirthdays.map((contact) => (
          <View key={contact.id}>
            <UpComingBirthdayCard contact={contact} />
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 300, margin: 50, marginHorizontal: 25 }}>
        {renderUpComingCelebration()}
      </View>
      <View style={{ marginBottom: 25, flex: 3 }}>
        <GradientText
          colors={["pink", "purple"]}
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
