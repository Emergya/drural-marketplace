import { useAuth } from "@saleor/auth/AuthProvider";
import useLocalStorage from "@saleor/hooks/useLocalStorage";
import { CompanySortField, OrderDirection } from "@saleor/types/globalTypes";
import React from "react";

import useAppChannel from "../AppLayout/AppChannelContext";
import { useBusinessesListQuery } from "./queries";
import { ActiveBusinessesList_companies_edges } from "./types/ActiveBusinessesList";

interface activeBusiness {
  active: ActiveBusinessesList_companies_edges;
  index: number;
}

interface BusinessContext {
  businessList: ActiveBusinessesList_companies_edges[];
  refreshAvailableBusinesses: () => void;
  activeBusiness: activeBusiness;
  setActiveBusiness: (index: number) => void;
}

export const BusinessContext = React.createContext<BusinessContext>(undefined);

export const BusinessProvider: React.FC = ({ children }) => {
  const { channel } = useAppChannel(false);
  const { user } = useAuth();
  const [businessdata, setBusinessData] = useLocalStorage<
    ActiveBusinessesList_companies_edges[]
  >("businessList", []);

  const [activeBusiness, setBusiness] = useLocalStorage<activeBusiness>(
    "activeBusiness",
    undefined
  );

  const refreshAvailableBusinesses = () => refetch();

  const updateBusinesses = data => {
    setBusinessData(data);
  };

  const setActiveBusiness = (index: number) => {
    if (typeof businessdata[index] !== "undefined") {
      setBusiness({
        index,
        active: businessdata[index]
      });
    }
  };

  const { refetch } = useBusinessesListQuery({
    variables: {
      channel: channel?.slug,
      first: 50,
      sortBy: {
        direction: OrderDirection.ASC,
        field: CompanySortField.CREATED_DATE
      }
    },
    onCompleted: data => {
      if (!user.isStaff) {
        if (data?.companies?.edges) {
          updateBusinesses(data.companies.edges);
          if (data.companies.edges.length === 0) {
            setBusiness(undefined);
          } else if (data.companies.edges.length === 1) {
            setBusiness({
              index: 0,
              active: data.companies.edges[0]
            });
          } else {
            if (activeBusiness) {
              setBusiness({
                index: activeBusiness.index,
                active: data.companies.edges[activeBusiness.index]
              });
            }
          }
        }
      }
    }
  });

  return (
    <BusinessContext.Provider
      value={{
        businessList: businessdata,
        refreshAvailableBusinesses,
        activeBusiness,
        setActiveBusiness
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};
export const BusinessComsumer = BusinessContext.Consumer;
