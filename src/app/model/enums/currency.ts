export enum Currency {
  PLN = 'pln',
  EUR = 'eur',
  USD = 'usd',
}

export const getCurrenciesStringList = (): string[] => {
  return Object.values(Currency);
};