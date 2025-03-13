
import { 
  zhTranslations, 
  zhEmailTranslations, 
  zhPredictionTranslations, 
  zhRecommendationTranslations 
} from './zh';
import { 
  enTranslations, 
  enEmailTranslations, 
  enPredictionTranslations, 
  enRecommendationTranslations 
} from './en';

// Merge all Chinese translations
const mergedZhTranslations = {
  ...zhTranslations,
  ...zhEmailTranslations,
  ...zhPredictionTranslations,
  ...zhRecommendationTranslations
};

// Merge all English translations
const mergedEnTranslations = {
  ...enTranslations,
  ...enEmailTranslations,
  ...enPredictionTranslations,
  ...enRecommendationTranslations
};

// Create combined translations object
export const translations = {
  zh: mergedZhTranslations,
  en: mergedEnTranslations
};

export type TranslationKey = keyof typeof mergedEnTranslations;
