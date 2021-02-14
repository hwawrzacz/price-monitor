import { Currency } from "./enums/currency";
import { Language } from "./enums/language";

export interface ProfileSettings {
  fetchGlobally: boolean;
  shareGlobally: boolean;
  currency: Currency;
  language: Language;
}