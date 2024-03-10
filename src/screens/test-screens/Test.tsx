import { Category, Image as Images } from "@/src/api/image/image.api";
import CustomImageCarousel from "@/src/components/customImageCarousel";
import { fetchImagesAPI } from "@/src/features/image/image.slice";
import { useAppDispatch, useAppSelector } from "@/src/features/store";
import SortImagesService from "@/src/services/sortImages.service";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Test() {
  const [imageArray, setImageArray] = useState<(Images[] | undefined)[]>([]);
  const dispatch = useAppDispatch();
  const images = useAppSelector((state) => state.image.images);

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
            <CustomImageCarousel images={category} />
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
