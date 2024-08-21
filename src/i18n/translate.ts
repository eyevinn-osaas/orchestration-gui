import { en } from './locales/en';
import { sv } from './locales/sv';
import get, { Path } from 'lodash.get';
import { Localization } from './locales/type';

const LOCALE_MAP: { [key: string]: Localization } = {
  en,
  sv
} as const;

export function getTranslate(locale = 'en') {
  const translations = LOCALE_MAP[locale] || LOCALE_MAP['en'];
  if (!LOCALE_MAP[locale]) {
    console.warn(
      `LANG: ${locale}, not supported, please set one of ${Object.keys(
        LOCALE_MAP
      ).join(',')}`
    );
  }

  return (
    path: Path<typeof translations>,
    replacements?: { [key: string]: string }
  ) => {
    const value = get(translations, path);
    if (typeof value === 'string') {
      let strValue = value;
      if (replacements) {
        Object.keys(replacements).forEach((key) => {
          strValue = strValue.replace(`{{${key}}}`, replacements[key]);
        });
      }

      return strValue;
    }
    return path;
  };
}
