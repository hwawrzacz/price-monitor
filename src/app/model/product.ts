import { Currency } from "./enums/currency";
import { Unit } from "./enums/unit";

export interface ProductPrice {
  pln: number;
  usd: number;
  eur: number;
}

export interface Product {
  name: string;
  price: ProductPrice;
  domesticCurrency: Currency;
  unit: Unit;
  isBargain: boolean;
  date: Date;
}