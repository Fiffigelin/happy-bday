import { fetchImagesAPI } from "@/src/features/image/image.slice";
import { useAppDispatch, useAppSelector } from "@/src/features/store";
import SortImagesService from "@/src/services/sortImages.service";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import { Category, Image as Images } from "../../api/image/image.api";

export default function Test() {
  const [categoryPeople, setCategoryPeople] = useState<Images[]>();
  const [categoryAnimals, setCategoryAnimals] = useState<Images[]>();
  const [categoryDinos, setCategoryDinos] = useState<Images[]>();
  const dispatch = useAppDispatch();
  const images = useAppSelector((state) => state.image.images);

  function ImageCarouselComponent({ images }: { images?: Images[] }) {
    return (
      <PagerView style={styles.viewPager} initialPage={0}>
        {images?.map((image, index) => (
          <View style={styles.page} key={index.toString()}>
            <Image source={{ uri: image.url }} style={styles.image} />
          </View>
        ))}
      </PagerView>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchImagesAPI());
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const sortedImages = SortImagesService.sortImagesByCategory(images!);
    setCategoryPeople(sortedImages[Category.People]);
    setCategoryAnimals(sortedImages[Category.Animals]);
    setCategoryDinos(sortedImages[Category.Dinos]);
  }, [images]);

  useEffect(() => {
    console.log("Category People: ", categoryPeople);
  }, [categoryPeople]);

  useEffect(() => {
    console.log("Category Animals: ", categoryAnimals);
  }, [categoryAnimals]);

  useEffect(() => {
    console.log("Category Dinos: ", categoryDinos);
  }, [categoryDinos]);
  return (
    <View style={{ flex: 1 }}>
      <ImageCarouselComponent images={categoryPeople} />
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
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
});

// useEffect(() => {
//   const fetchData = async () => {
//     await dispatch(fetchImagesAPI());
//     console.log("IMAGES: ", images);
//     const sortedImages = SortImagesService.sortImagesByCategory(images!);
//     setCategoryPeople(sortedImages[Category.People]);
//     console.log("Category People: ", categoryPeople);
//     setCategoryAnimals(sortedImages[Category.Animals]);
//     console.log("Category Animals: ", categoryAnimals);
//     setCategoryDinos(sortedImages[Category.Dinos]);
//     console.log("Category Dinos: ", categoryDinos);
//   };

//   fetchData();
// }, []);

// return (
//   <View style={styles.container}>
//     <Image
//       source={{ uri: "https://i.imgur.com/d6GTsjo.jpg" }}
//       style={styles.tinyLogo}
//     />
//     <Text>Lalalala</Text>
//   </View>
// );
