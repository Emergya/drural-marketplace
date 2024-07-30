import { enGB, es, hr, nl, sv } from "date-fns/locale";
import { registerLocale } from "react-datepicker";

import { Locale } from "../Locale";

// TODO: clean console.warnings and change for the actual one, its more variale.
// export const registerDatePickerLocales = () => {
//   Object.values(Locale).forEach(async locale => {
//     let localeToRegister;

//     switch (locale) {
//       case Locale.EN:
//         localeToRegister = await import(`date-fns/locale/en-GB`);
//       default:
//         localeToRegister = await import(`date-fns/locale/${locale}`);
//     }

//     registerLocale(locale, localeToRegister);
//   });
// };

export const registerDatePickerLocales = () => {
  registerLocale(Locale.EN, enGB);
  registerLocale(Locale.ES, es);
  registerLocale(Locale.HR, hr);
  registerLocale(Locale.NL, nl);
  registerLocale(Locale.SV, sv);
};
