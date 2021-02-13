import { Currency } from "./enums/currency";
import { Unit } from "./enums/unit";

export interface Product {
  name: string;
  price: number;
  currency: Currency;
  unit: Unit;
  isBargain: boolean;
  date: Date;
}