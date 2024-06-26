import { User, UserCredential } from "@/types";
import { API_URL, headers } from "../api";

const USER_URL = `${API_URL}:3000/api/user`;

export const USER_API = {
  GET: "/get",
  CREATE: "/create",
  GET_USER: (id: string) => `/${id}`,
  UPDATE_USER: (id: string) => `/update/${id}`,
  DELETE_USER: (id: string) => `/delete/${id}`,
};

export async function fetchUserByUid(uid: string): Promise<User> {
  try {
    const requestInfo = {
      method: "GET",
      headers: headers,
    };
    const response = await fetch(
      `${USER_URL}${USER_API.GET_USER(uid)}`,
      requestInfo
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonResponse = await response.json();
    if (jsonResponse.data) {
      return jsonResponse.data as User;
    }

    return jsonResponse;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function updateUser(id: string, updatedUser: User): Promise<User> {
  try {
    const requestInfo = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(updatedUser),
    };

    const response = await fetch(
      `${USER_URL}${USER_API.UPDATE_USER(id)}`,
      requestInfo
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonResponse = await response.json();
    if (jsonResponse.data) {
      return jsonResponse.data as User;
    }

    return jsonResponse;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function createUser(createUser: UserCredential): Promise<boolean> {
  try {
    const data = {
      name: createUser.name,
      uid: createUser.uid,
    };
    const requestInfo = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };
    const response = await fetch(`${USER_URL}${USER_API.CREATE}`, requestInfo);

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

export async function deleteUser(id: string) {
  try {
    const requestInfo = {
      method: "DELETE",
      headers: headers,
    };
    const response = await fetch(
      `${USER_URL}${USER_API.DELETE_USER(id)}`,
      requestInfo
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    throw error;
  }
}
