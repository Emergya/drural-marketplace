import { LocaleContext } from "@saleor/components/Locale";
import { useContext } from "react";

function useNumberLocalize(number: number): string {
  const { locale } = useContext(LocaleContext);

  return number?.toLocaleString(locale);
}

export default useNumberLocalize;
