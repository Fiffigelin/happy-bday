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
  GET_USER: "/",
};

export async function fetchUsers() {
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

    const jsonData: User[] = await response.json();
    console.log("Received data:", jsonData);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function fetchUserById(id: string) {
  try {
    const requestInfo = {
      method: "GET",
      headers: headers,
    };
    const response = await fetch(`${USER_URL}/${id}`, requestInfo);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonData: User = await response.json();
    console.log("Received data:", jsonData);
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
