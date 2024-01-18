import Constants from "expo-constants";

export const headers = {
  "Content-Type": "application/json",
};

export const API_URL = getLocalUri();

function getLocalUri(): string {
  const hostUri = Constants?.expoConfig?.hostUri;
  let uri = "";

  if (hostUri) {
    const parts = hostUri.split(":");
    if (parts.length >= 2) {
      uri = `http://${parts[0]}`;
    } else {
      console.warn("Invalid hostUri format. Using default URI.");
    }
  }
  return uri;
}

// const response = await fetch(uri, {
//   method: "GET",
//   headers,
// });
