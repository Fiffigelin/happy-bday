import { API_URL, headers } from "../api";

export interface Image {
  id: string;
  url: string;
  category: Category;
}

export enum Category {
  People = 0,
  Animals = 1,
  Dinos = 2,
}

const IMAGE_URL = `${API_URL}:3000/api/image`;

export const IMAGE_API = {
  GET: "/get",
  GET_IMAGE: (id: string) => `/${id}`,
};

export async function fetchImages(): Promise<Image[]> {
  try {
    const requestInfo = {
      method: "GET",
      headers: headers,
    };
    console.log("URI: ", IMAGE_URL);
    const response = await fetch(`${IMAGE_URL}${IMAGE_API.GET}`, requestInfo);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonResponse = await response.json();
    if (jsonResponse.data) {
      return jsonResponse.data as Image[];
    }

    return [];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function fetchImageById(id: string): Promise<Image> {
  try {
    const requestInfo = {
      method: "GET",
      headers: headers,
    };
    const response = await fetch(
      `${IMAGE_URL}${IMAGE_API.GET_IMAGE(id)}`,
      requestInfo
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonResponse = await response.json();
    console.log("Received data:", jsonResponse);

    if (jsonResponse.data) {
      return jsonResponse.data as Image;
    }

    return jsonResponse;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// function setCategoryToString(images: Image[]): Image[] {
//   return images.map((image) => ({
//     ...image,
//     cateogryString: getCategoryString(image.category),
//   }));
// }

function getCategoryString(category: Category): string {
  switch (category) {
    case Category.People:
      return "People";
    case Category.Animals:
      return "Animals";
    case Category.Dinos:
      return "Dinos";
    default:
      return "Unknown Category";
  }
}
