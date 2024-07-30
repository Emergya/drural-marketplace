import { WindowTitle } from "@saleor/components/WindowTitle";
import { sectionNames } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";

import CustomizationPage from "./CustomizationPage";

export const CustomizationSection: React.FC = () => {
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.siteCustomization)} />
      <CustomizationPage />
    </>
  );
};
export default CustomizationSection;
