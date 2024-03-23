import { UserCredential } from "@/types";
import { API_URL, headers } from "../api";
import { USER_API } from "../user/user.api";

const USER_URL = `${API_URL}:3000/api/device`;

export const DEVICE_API = {
  GET: (id: string) => `/get/${id}`,
  CREATE: "/create",
};

export async function fetchDeviceToken(uid: string): Promise<boolean> {
  try {
    const requestInfo = {
      method: "GET",
      headers: headers,
    };
    const response = await fetch(
      `${USER_URL}${DEVICE_API.GET(uid)}`,
      requestInfo
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonResponse = await response.json();

    if (!jsonResponse.data) {
    }

    return jsonResponse;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// export async function createDeviceToken(uid: string, token: ): Promise<boolean> {
//   try {
//     const requestInfo = {
//       method: "PUT",
//       headers: headers,
//       body: JSON.stringify(updatedUser),
//     };

//     const response = await fetch(
//       `${USER_URL}${USER_API.UPDATE_USER(uid)}`,
//       requestInfo
//     );

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const jsonResponse = await response.json();

//     if (jsonResponse.data) {
//       return jsonResponse.data as User;
//     }

//     return jsonResponse;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// }

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
    console.log("JSON RESPONSE USER: ", jsonResponse);
    if (jsonResponse.status === "Success") {
      return true;
    } else {
      throw false;
    }
    // return jsonResponse as UserCredential;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// export async function deleteUser(id: string) {
//   try {
//     const requestInfo = {
//       method: "DELETE",
//       headers: headers,
//     };
//     const response = await fetch(
//       `${USER_URL}${USER_API.DELETE_USER(id)}`,
//       requestInfo
//     );
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const jsonResponse = await response.json();
//     console.log("Received data:", jsonResponse);
//     return jsonResponse;
//   } catch (error) {
//     console.log("ERROR deleting data: ", error);
//     throw error;
//   }
// }
