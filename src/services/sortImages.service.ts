import { BdayImage, Category } from "@/types";

export default class SortImagesService {
  static sortImagesByCategory(images: BdayImage[]): {
    [key in Category]: BdayImage[];
  } {
    const sortedImages: { [key in Category]: BdayImage[] } = {
      [Category.People]: [],
      [Category.Animals]: [],
      [Category.Dinos]: [],
    };

    images.forEach((image) => {
      sortedImages[image.category].push(image);
    });

    return sortedImages;
  }
}
