import {
  FilterPageProps,
  PageListProps,
  SortPage,
  TabPageProps
} from "@saleor/types";

import { BusinessesList_companies_edges_node } from "../../types/BusinessesList";
import { BusinessesListUrlSortField } from "../../urls";
import { BusinessesFilterKeys, BusinessListFilterOpts } from ".";

export interface BusinessesListPageProps
  extends PageListProps,
    // ListActions,
    FilterPageProps<BusinessesFilterKeys, BusinessListFilterOpts>,
    SortPage<BusinessesListUrlSortField>,
    TabPageProps {
  businesses: BusinessesList_companies_edges_node[];
}

export enum BusinessListColumns {
  email = "email",
  phone = "phone",
  locality = "locality",
  postalCode = "postalCode",
  modified = "modified"
}
