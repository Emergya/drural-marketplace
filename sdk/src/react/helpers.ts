import React from "react";

import { SaleorAPI } from "../api";
import { SaleorContext } from "./context";
import { ConfigInput } from "../types";

export function useSaleorClient(): SaleorAPI {
  const saleor = React.useContext(SaleorContext);

  if (!saleor) {
    throw new Error(
      "Could not find saleor's apollo client in the context. " +
        "Did you forget to wrap the root component in a <SaleorProvider>?"
    );
  }

  return saleor.api;
}

export function useSaleorConfig(): ConfigInput {
  const saleor = React.useContext(SaleorContext);

  if (!saleor) {
    throw new Error(
      "Could not find saleor's apollo client in the context. " +
        "Did you forget to wrap the root component in a <SaleorProvider>?"
    );
  }

  return saleor.config;
}
