import { mapEdgesToItems } from "@utils/misc";

import { GetProductsFromCategories } from "./types";

export const getProductsFromCategories: GetProductsFromCategories = categories => {
  const catedogiesData = mapEdgesToItems(categories);

  const products = [];
  const productsLimit = 8;

  catedogiesData.forEach(category => {
    if (products.length < productsLimit) {
      products.push(...mapEdgesToItems(category.products));
    }
  });

  return products;
};
