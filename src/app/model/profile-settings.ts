import { Currency } from "./enums/currency";
import { Language } from "./enums/language";

export interface ProfileSettings {
  currency: Currency;
  language: Language;
  shareGrobally: boolean;
  fetchGlobally: boolean;
}