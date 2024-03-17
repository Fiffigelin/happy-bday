// ---------------- USER ----------------
export interface UserCredential {
  email: string;
  password: string;
  name: string;
  uid: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface User {
  uid: string;
  name: string;
  profile_url: string;
  id: string;
}

export interface AuthUser {
  uid: string;
  email: string;
}

// ---------------- CONTACT ----------------
export interface ContactCredential {
  name: string;
  birthday: string;
  userId: string;
}

export interface Contact {
  name: string;
  birthday: Date;
  id: string;
  userId: string;
  messageId: string;
}

// --------------- BDAYIMAGE ---------------
export interface BdayImage {
  id: string;
  url: string;
  category: Category;
}

export enum Category {
  People = 0,
  Animals = 1,
  Dinos = 2,
}

// ---------------- MESSAGE ----------------
export interface MessageCredential {
  userId: string;
  imageId: string;
  message: string;
}

export interface Message {
  id: string;
  imageId: string;
  message: string;
}

export interface MessageToContact {
  contacts: string[];
  message_id: string;
}
