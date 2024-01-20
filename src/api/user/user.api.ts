import { API_URL, headers } from "../api";

export interface User {
  id: string;
  name: string;
  email: string;
  profileURL: string;
}

const USER_URL = `${API_URL}:3000/api/user`;

export const USER_API = {
  GET: "/get",
  CREATE: "/create",
  GET_USER: (id: string) => `/${id}`,
};

export async function fetchUsers(): Promise<User[]> {
  try {
    const requestInfo = {
      method: "GET",
      headers: headers,
    };
    console.log("URI: ", USER_URL);
    const response = await fetch(`${USER_URL}${USER_API.GET}`, requestInfo);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonResponse = await response.json();
    if (jsonResponse.data) {
      return jsonResponse.data as User[];
    }

    return [];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function fetchUserById(id: string): Promise<User> {
  try {
    const requestInfo = {
      method: "GET",
      headers: headers,
    };
    const response = await fetch(
      `${USER_URL}${USER_API.GET_USER(id)}`,
      requestInfo
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonResponse = await response.json();
    console.log("Received data:", jsonResponse);

    if (jsonResponse.data) {
      return jsonResponse.data as User;
    }

    return jsonResponse;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

const userData = {
  name: "Test från app",
  profileURL: "",
  email: "app-test@gmail.com",
};

export async function createUser() {
  try {
    const requestInfo = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(userData),
    };
    const response = await fetch(`${USER_URL}/get`, requestInfo);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const json = await response.json();
    console.log("Received data:", json);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
