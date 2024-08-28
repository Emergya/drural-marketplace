import greekJson from "../../../content/compiled-locales/el.json";
import englishJson from "../../../content/compiled-locales/en.json";
import spanishJson from "../../../content/compiled-locales/es.json";
import croatianJson from "../../../content/compiled-locales/hr.json";
import dutchJson from "../../../content/compiled-locales/nl.json";
import slovenianJson from "../../../content/compiled-locales/sl.json";
import serbianJson from "../../../content/compiled-locales/sr.json";
import swedishJson from "../../../content/compiled-locales/sv.json";
import { Locale, LocaleMessages } from "./types";

export const getDefaultMessages = (locale: Locale): LocaleMessages => {
  if (locale) {
    switch (locale) {
      case Locale.EL:
        return greekJson;
      case Locale.EN:
        return englishJson;
      case Locale.ES:
        return spanishJson;
      case Locale.HR:
        return croatianJson;
      case Locale.NL:
        return dutchJson;
      case Locale.SL:
        return slovenianJson;
      case Locale.SR:
        return serbianJson;
      case Locale.SV:
        return swedishJson;
      default:
        return englishJson;
    }
  }
  return englishJson;
};
