
import { zh } from './zh';
import { en } from './en';

// Create combined translations object
export const translations = {
  zh,
  en
};

export type TranslationKey = keyof typeof en;
