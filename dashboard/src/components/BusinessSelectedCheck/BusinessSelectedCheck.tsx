import { LinearProgress } from "@material-ui/core";
import { useAuth } from "@saleor/auth/AuthProvider";
import { sectionNames } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";
import useRouter from "use-react-router";

import { BusinessSelectorPage } from "../../business/BusinessSelectorPage";
import { BusinessContext } from "../BusinessProvider";
import { WindowTitle } from "../WindowTitle";

export const BusinessSelectorCheck: React.FC = ({ children }) => {
  const { businessList, activeBusiness } = React.useContext(BusinessContext);
  const { user } = useAuth();
  const intl = useIntl();
  // firstBusiness will be set to true when you are creating your first shop,
  // this allows you to navigate to the /business/create page w/o having activeBusiness
  const [firstBusiness, setFirstBusiness] = React.useState(false);
  const { location } = useRouter();

  if (!user.isStaff) {
    if (!businessList) {
      return <LinearProgress color="primary" />;
    } else if (
      !activeBusiness &&
      !(firstBusiness && location.pathname === "/business/create")
    ) {
      return (
        <>
          <WindowTitle title={intl.formatMessage(sectionNames.business)} />
          <BusinessSelectorPage setFirstBusiness={setFirstBusiness} />
        </>
      );
    }
  }
  return <>{children}</>;
};
