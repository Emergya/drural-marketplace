import { createContext } from "react";

import { LocaleContextType } from "./types";

export const UserPreferredLocaleContext = createContext<LocaleContextType>({
  userPreferredLocale: "",
  setUserPreferredLocale: () => undefined,
});
