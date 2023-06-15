import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import locales from "../../assets/locales";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: "vi",
  supportedLngs: ["en", "vi", "ja"],
  ns: [],
  defaultNS: undefined,
  resources: {
    en: locales.en,
    vi: locales.vi,
    ja: locales.ja,
  },
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
