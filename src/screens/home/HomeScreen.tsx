import CustomToast from "@/src/components/customToast";
import {
  fetchContactsAPI,
  resetMessageSuccessful,
} from "@/src/features/contact/contact.slice";
import { resetMessage } from "@/src/features/message/message.slice";
import { BdayImage, Category } from "@/types";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import CustomImageCarousel from "../../components/customImageCarousel";
import { fetchImagesAPI } from "../../features/image/image.slice";
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
  const connectedMsgToContact = useAppSelector(
    (state) => state.contact.isMessageAdded
  );
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setMessage] = useState<string>("");

  const handleImagePress = (id: string) => {
    navigation.navigate("CreateMessage", { id });
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchImagesAPI());
      await dispatch(fetchContactsAPI(user?.id as string));
    };

    fetchData();
  }, [dispatch]);

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

  return (
    <View style={{ flex: 1 }}>
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
      {showToast && <CustomToast message={toastMessage} onClose={() => {}} />}
    </View>
  );
}
