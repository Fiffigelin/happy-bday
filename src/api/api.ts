const headers = {
  "Content-Type": "application/json",
};

export async function fetchUsers() {
  try {
    const requestInfo = {
      method: "GET",
      headers: headers,
    };
    const response = await fetch(
      "http://192.168.50.139:3000/api/user/get",
      requestInfo
    );
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

import Constants from "expo-constants";

const hostUri = Constants?.expoConfig?.hostUri;

let uri = "";

if (hostUri) {
  const parts = hostUri.split(":");
  if (parts.length >= 2) {
    uri = `http://${parts[0]}:5241`;
    console.log("uri är: " + uri);
  } else {
    console.warn("Invalid hostUri format. Using default URI.");
  }
}

uri = `${uri}/api/user/get`;

// const response = await fetch(uri, {
//   method: "GET",
//   headers,
// });
