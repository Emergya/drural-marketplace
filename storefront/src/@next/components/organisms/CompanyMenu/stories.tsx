import { storiesOf } from "@storybook/react";
import React from "react";

import { ActiveTab } from "@pages/CompanyPage/types";
import { inicialQueryParams } from "@pages/CompanyPage/utils";

import { LocaleProvider } from "../../../../components/Locale";
import { CompanyMenu } from ".";

storiesOf("@components/organisms/CompanyMenu", module)
  .addParameters({ component: CompanyMenu })
  .add("default", () => (
    <LocaleProvider>
      <div style={{ backgroundColor: "black", color: "white" }}>
        <CompanyMenu
          activeTab={ActiveTab.ALL_SERVICES}
          categories={[]}
          categoriesPageInfo={undefined}
          loadingCategories={false}
          queryParams={inicialQueryParams}
          searcherDisabled={false}
          handleBestSellingClick={() => null}
          handleClearProductFilters={() => null}
          handleFilterByCategory={() => null}
          handleFilterBySearch={() => null}
          handleNewInClick={() => null}
          handleReviewsClick={() => null}
          nextCategories={() => new Promise(() => null)}
        />
      </div>
    </LocaleProvider>
  ));
