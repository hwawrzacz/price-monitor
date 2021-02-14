import { LoginType } from "./enums/login-type";

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  loginType: LoginType;
}
