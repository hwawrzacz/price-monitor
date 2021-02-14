import { LoginType } from "./enums/login-type";
import { default as Firebase } from 'firebase'

export const DEFAULT_PHOTO_URL = 'assets/profile-placeholder.png';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  loginType: LoginType;
}

export const createDeviceIdBasedUser = (deviceId: string): User => {
  return {
    uid: deviceId,
    displayName: deviceId,
    loginType: LoginType.DEVICE,
    photoURL: DEFAULT_PHOTO_URL,
  } as User;
}

export const createProfileBasedUser = (user: Firebase.User): User => {
  return {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    loginType: LoginType.PROFILE,
  } as User;
}