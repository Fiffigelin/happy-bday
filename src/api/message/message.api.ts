import { Message, MessageCredential } from "@/types";
import { API_URL, headers } from "../api";

const MESSAGE_URL = `${API_URL}:3000/api/message`;

export const MESSAGE_API = {
  CREATE: "/create",
  GET_MESSAGE: (id: string) => `/get/contact-msg/${id}`,
  GET_MESSAGES: (id: string) => `/get/user-msg/${id}`,
  UPDATE_MESSAGE: (id: string) => `/update/${id}`,
  DELETE_MESSAGE: (id: string) => `/delete/${id}`,
};

export async function createMessage(
  createMessage: MessageCredential
): Promise<Message> {
  try {
    const data = {
      user_id: createMessage.userId,
      image_id: createMessage.imageId,
      message: createMessage.message,
    };

    const requestInfo = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };
    const response = await fetch(
      `${MESSAGE_URL}${MESSAGE_API.CREATE}`,
      requestInfo
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonResponse = await response.json();

    return jsonResponse.data as Message;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function fetchMessagesFromUser(
  user_id: string
): Promise<Message[]> {
  try {
    const requestInfo = {
      method: "GET",
      headers: headers,
    };

    const response = await fetch(
      `${MESSAGE_URL}${MESSAGE_API.GET_MESSAGES(user_id)}`,
      requestInfo
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonResponse = await response.json();

    if (jsonResponse.data) {
      return jsonResponse.data as Message[];
    }

    return [];
  } catch (error) {
    throw error;
  }
}

export async function fetchMessageFromContact(
  contact_message: string
): Promise<Message> {
  try {
    const requestInfo = {
      method: "GET",
      headers: headers,
    };
    const response = await fetch(
      `${MESSAGE_URL}${MESSAGE_API.GET_MESSAGE(contact_message)}`,
      requestInfo
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonResponse = await response.json();
    if (jsonResponse.data) {
      return jsonResponse.data as Message;
    }

    return jsonResponse.data as Message;
  } catch (error) {
    throw error;
  }
}
