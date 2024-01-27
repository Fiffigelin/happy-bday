import { Category, Image } from "../api/image/image.api";

export default class SortImagesService {
  static sortImagesByCategory(images: Image[]): { [key in Category]: Image[] } {
    const sortedImages: { [key in Category]: Image[] } = {
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
