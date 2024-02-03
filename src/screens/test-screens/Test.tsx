import { fetchImagesAPI } from "@/src/features/image/image.slice";
import { useAppDispatch, useAppSelector } from "@/src/features/store";
import SortImagesService from "@/src/services/sortImages.service";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Category, Image as Images } from "../../api/image/image.api";

export default function Test() {
  const [categoryPeople, setCategoryPeople] = useState<Images[] | undefined>();
  const [categoryAnimals, setCategoryAnimals] = useState<Images[]>();
  const [categoryDinos, setCategoryDinos] = useState<Images[]>();
  const dispatch = useAppDispatch();
  const images = useAppSelector((state) => state.image.images);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchImagesAPI());
      const sortedImages = SortImagesService.sortImagesByCategory(images!);
      setCategoryPeople(sortedImages[Category.People]);
      setCategoryAnimals(sortedImages[Category.Animals]);
      setCategoryDinos(sortedImages[Category.Dinos]);
    };

    fetchData();
    console.log("IMAGES: ", images);
    console.log("Category People: ", categoryPeople);
    console.log("Category Animals: ", categoryAnimals);
    console.log("Category Dinos: ", categoryDinos);
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.imgur.com/d6GTsjo.jpg" }}
        style={styles.tinyLogo}
      />
      <Text>Lalalala</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 200,
    height: 200,
  },
});
