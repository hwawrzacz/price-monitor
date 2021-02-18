export enum Language {
  PL = 'pl',
  EN = 'en',
}

export const getLanguagesStringList = (): string[] => {
  return Object.values(Language);
};