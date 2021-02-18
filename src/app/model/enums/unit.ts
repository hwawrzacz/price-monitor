export enum Unit {
  PCS = 'pcs',
  KG = 'kg',
  G = 'g',
  L = 'l',
  ML = 'ml',
}

export const getUnitsStringList = (): string[] => {
  return Object.values(Unit);
};