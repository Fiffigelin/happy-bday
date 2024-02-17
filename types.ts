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
  birthday: Date;
  userId: string;
}

export interface Contact {
  name: string;
  birthday: Date;
  id: string;
  user_id: string;
}
