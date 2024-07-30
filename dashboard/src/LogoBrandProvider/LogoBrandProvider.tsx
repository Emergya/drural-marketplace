import { shopCustomization } from "@saleor/customization/queries";
import { ShopCustomization } from "@saleor/customization/types/ShopCustomization";
import useLocalStorage from "@saleor/hooks/useLocalStorage";
import React from "react";
import { useQuery } from "react-apollo";

interface LogoBrandContext {
  logo: string;
  banner: string;
}

export const LogoBrandContext = React.createContext<LogoBrandContext>(
  undefined
);

export const LogoBrandProvider: React.FC = ({ children }) => {
  const [logo, setLogo] = useLocalStorage("logo", undefined);
  const [banner, setBanner] = useLocalStorage("banner", undefined);

  const { data } = useQuery<ShopCustomization>(shopCustomization);

  React.useEffect(() => {
    if (data?.shop) {
      setLogo(data.shop.logo?.url);
      setBanner(data.shop.dashboardBanner?.url);
    }
  }, [data?.shop]);

  return (
    <LogoBrandContext.Provider
      value={{
        logo,
        banner
      }}
    >
      {children}
    </LogoBrandContext.Provider>
  );
};
