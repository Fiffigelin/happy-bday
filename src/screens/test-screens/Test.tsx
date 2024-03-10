import { fetchImagesAPI } from "@/src/features/image/image.slice";
import { useAppDispatch, useAppSelector } from "@/src/features/store";
import SortImagesService from "@/src/services/sortImages.service";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";
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
    <View style={{ flex: 1 }}>
      <PagerView style={styles.viewPager} initialPage={0}>
        <View style={styles.page} key="1">
          <Text>First page</Text>
          <Text>Swipe ➡️</Text>
        </View>
        <View style={styles.page} key="2">
          <Text>Second page</Text>
        </View>
        <View style={styles.page} key="3">
          <Text>Third page</Text>
        </View>
      </PagerView>
    </View>
  );
  // return (
  //   <View style={styles.container}>
  //     <Image
  //       source={{ uri: "https://i.imgur.com/d6GTsjo.jpg" }}
  //       style={styles.tinyLogo}
  //     />
  //     <Text>Lalalala</Text>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 200,
    height: 200,
  },
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
});
