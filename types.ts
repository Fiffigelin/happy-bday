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
