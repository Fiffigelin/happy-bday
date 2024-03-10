import { Image as Images } from "@/src/api/image/image.api";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function CustomImageCarousel({ images }: { images?: Images[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { width: screenWidth } = Dimensions.get("window");

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / 400);
    setActiveIndex(currentIndex);
  };

  const renderPagination = () => {
    const number = images?.length;
    return (
      <View style={styles.paginationContainer}>
        {images?.map(
          (_, index) =>
            number && (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      activeIndex === index ? "white" : "lightgray",
                  },
                ]}
              />
            )
        )}
      </View>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
      >
        {images?.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.carouselItem,
              {
                width: screenWidth,
              },
            ]}
          >
            <Image
              source={{ uri: item.url }}
              style={{ width: 400, height: 300 }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {renderPagination()}
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginBottom: 2,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
  carouselItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});