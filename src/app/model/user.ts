import { ProfileSettings } from "./profile-settings";

export interface User {
  id: string;
  email: string;
  settings: ProfileSettings;
}