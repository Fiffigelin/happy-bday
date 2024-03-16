import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Category, Image } from "../../api/image/image.api";
import CustomImageCarousel from "../../components/customImageCarousel";
import { fetchImagesAPI } from "../../features/image/image.slice";
import { useAppDispatch, useAppSelector } from "../../features/store";
import { HomeScreenProps } from "../../navigation/NavigationTypes";
import SortImagesService from "../../services/sortImages.service";

type Props = HomeScreenProps<"Home">;

export default function HomeScreen({ navigation }: Props) {
  const [imageArray, setImageArray] = useState<(Image[] | undefined)[]>([]);
  const dispatch = useAppDispatch();
  const images = useAppSelector((state) => state.image.images);

  const handleImagePress = (id: string) => {
    navigation.navigate("CreateMessage", { id });
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchImagesAPI());
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

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {imageArray?.map((category) => (
          <View>
            <Text></Text>
            <CustomImageCarousel
              images={category}
              onPressImage={handleImagePress}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
