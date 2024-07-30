import { BaseCategory } from "@drural/sdk/lib/fragments/gqlTypes/BaseCategory";
import { PageInfo } from "@drural/sdk/lib/fragments/gqlTypes/PageInfo";

import { ActiveTab, IQueryParams } from "@pages/CompanyPage/types";

export interface IProps {
  activeTab: ActiveTab | undefined;
  categories: BaseCategory[];
  categoriesPageInfo: PageInfo | undefined;
  loadingCategories: boolean;
  queryParams: IQueryParams;
  searcherDisabled: boolean;
  handleBestSellingClick: () => void;
  handleClearProductFilters: () => void;
  handleFilterByCategory: (category: string) => void;
  handleFilterBySearch: (search: string) => void;
  handleNewInClick: () => void;
  handleReviewsClick: () => void;
  nextCategories: () => Promise<void>;
}
