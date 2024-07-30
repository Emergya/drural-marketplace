import React, { useContext } from "react";
import { useIntl } from "react-intl";
import ReactSVG from "react-svg";

import { LogoBrandContext } from "@components/containers/LogoBrandProvider";
import { Footer, PreFooter } from "@components/molecules";
import { useMenuQuery } from "@graphql";
import { channelSlug, fixedSlugMenus } from "@temp/constants";
import { getPolicyLinks } from "@utils/footer/policyLinks";
import { mapEdgesToItems } from "@utils/misc";

import logoNegative from "../../../../images/logo_icon_negative.svg";
import { useFooterCategoriesQuery } from "./queries";

export const CompleteFooter: React.FC = () => {
  // 1. Variables
  const intl = useIntl();
  const brand = useContext(LogoBrandContext);

  const {
    data: categoriesData,
    loading: loadingCategories,
  } = useFooterCategoriesQuery();

  const { data: menuData } = useMenuQuery({
    channel: channelSlug,
    slug: fixedSlugMenus.footer,
  });

  // 4. Render
  return (
    <>
      <PreFooter
        categories={
          (categoriesData?.categories &&
            mapEdgesToItems(categoriesData?.categories)) ||
          []
        }
        loading={loadingCategories}
      />
      <Footer
        logo={<ReactSVG path={brand?.logo || logoNegative} />}
        menu={menuData?.menu}
        policyLinks={getPolicyLinks(intl) || []}
      />
    </>
  );
};
