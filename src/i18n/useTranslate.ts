import { getTranslate } from './translate';

const DEFAULT_LOCALE =
  typeof window === 'undefined'
    ? process.env.UI_LANG || 'en'
    : document.documentElement.lang;

export function useTranslate(locale = DEFAULT_LOCALE) {
  return getTranslate(locale);
}
