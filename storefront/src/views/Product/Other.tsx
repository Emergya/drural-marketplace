import { ProductDetails_category_products_edges } from "@drural/sdk/lib/fragments/gqlTypes/ProductDetails";
import * as React from "react";
import { FormattedMessage } from "react-intl";

import { ProductList } from "@components/organisms";

const OtherProducts: React.FC<{
  products: ProductDetails_category_products_edges[];
}> = ({ products }) => {
  return (
    <>
      <h2 className="product-page__other-products__title">
        <FormattedMessage defaultMessage="Related services" />
      </h2>
      <ProductList products={products.map(({ node }) => node)} />
    </>
  );
};

export default OtherProducts;
