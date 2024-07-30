import React from "react";
import { useQuery } from "react-apollo";

import { ShopCustomization } from "@components/containers/ThemeProviderChangeWrapper/gqlTypes/ShopCustomization";
import { shopCustomization } from "@components/containers/ThemeProviderChangeWrapper/queries";
import { useLocalStorage } from "@hooks/useLocalStorage";

interface LogoBrandContext {
  logo?: string;
  banner?: string;
}

export const LogoBrandContext = React.createContext<LogoBrandContext>({});

export const LogoBrandProvider: React.FC = ({ children }) => {
  const { storedValue: logo, setValue: setLogo } = useLocalStorage<
    string | undefined
  >("logo", undefined);
  const { storedValue: banner, setValue: setBanner } = useLocalStorage<
    string | undefined
  >("banner", undefined);

  const { data } = useQuery<ShopCustomization>(shopCustomization, {
    fetchPolicy: "network-only",
  });

  React.useEffect(() => {
    if (data?.shop) {
      setLogo(data.shop.logo?.url);
      setBanner(data.shop.storefrontBanner?.url);
    }
  }, [data?.shop]);

  return (
    <LogoBrandContext.Provider
      value={{
        logo,
        banner,
      }}
    >
      {children}
    </LogoBrandContext.Provider>
  );
};
