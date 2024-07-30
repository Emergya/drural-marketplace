import React from "react";

import { MenuQuery_menu } from "@graphql/gqlTypes/MenuQuery";

import { IPolicyLink } from "../../../types/IPolicyLink";

export interface IProps {
  logo: React.ReactNode;
  menu: MenuQuery_menu | null | undefined;
  policyLinks: IPolicyLink[];
}
