import {
  Contact,
  ContactCredential,
  MessageToContact,
  UpdateContact,
} from "@/types";
import { API_URL, headers } from "../api";

const CONTACT_URL = `${API_URL}:3000/api/contact`;

export const CONTACT_API = {
  GET: "/get",
  CREATE: "/create",
  GET_CONTACT: (id: string) => `/${id}`,
  GET_CONTACTS: (id: string) => `/get/${id}`,
  UPDATE_CONTACT: (id: string) => `/update/${id}`,
  UPDATE_MESSAGE_TO_CONTACT: "/update-message",
  DELETE_CONTACT: (id: string) => `/delete/${id}`,
};

export async function CreateContact(
  createContact: ContactCredential
): Promise<boolean> {
  try {
    const data = {
      birthday: createContact.birthday,
      name: createContact.name,
      user_Id: createContact.userId,
    };

    const requestInfo = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };
    const response = await fetch(
      `${CONTACT_URL}${CONTACT_API.CREATE}`,
      requestInfo
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonResponse = await response.json();
    if (jsonResponse.status === "Success") {
      return true;
    } else {
      throw false;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function fetchContactsFromUser(
  userId: string
): Promise<Contact[]> {
  try {
    const requestInfo = {
      method: "GET",
      headers: headers,
    };
    const response = await fetch(
      `${CONTACT_URL}${CONTACT_API.GET_CONTACTS(userId)}`,
      requestInfo
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonResponse = await response.json();
    if (jsonResponse.data) {
      return jsonResponse.data as Contact[];
    }

    return [];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function updateContact(
  id: string,
  updatedContact: UpdateContact
): Promise<Contact> {
  try {
    const requestInfo = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(updatedContact),
    };

    const response = await fetch(
      `${CONTACT_URL}${CONTACT_API.UPDATE_CONTACT(id)}`,
      requestInfo
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonResponse = await response.json();

    if (jsonResponse.data) {
      return jsonResponse.data as Contact;
    }

    return jsonResponse;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function updateMessageToContact(
  message: MessageToContact
): Promise<boolean> {
  try {
    const requestInfo = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(message),
    };

    const response = await fetch(
      `${CONTACT_URL}${CONTACT_API.UPDATE_MESSAGE_TO_CONTACT}`,
      requestInfo
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonResponse = await response.json();

    if (jsonResponse.status === "Success") {
      return true;
    } else {
      throw false;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function deleteContact(id: string) {
  try {
    const requestInfo = {
      method: "DELETE",
      headers: headers,
    };
    const response = await fetch(
      `${CONTACT_URL}${CONTACT_API.DELETE_CONTACT(id)}`,
      requestInfo
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonResponse = await response.json();
    if (jsonResponse.status === "Success") {
      return true;
    } else {
      throw false;
    }
  } catch (error) {
    throw error;
  }
}
