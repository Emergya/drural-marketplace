import { channelsList } from "@saleor/channels/fixtures";
import { createChannelsData } from "@saleor/channels/utils";
import { fetchMoreProps } from "@saleor/fixtures";
import { ProductErrorCode } from "@saleor/types/globalTypes";
import { storiesOf } from "@storybook/react";
import React from "react";

import ProductCreatePage, {
  ProductCreateFormData
} from "../../../products/components/ProductCreatePage";
import { product as productFixture } from "../../../products/fixtures";
import { productTypeSearch } from "../../../productTypes/fixtures";
import Decorator from "../../Decorator";

const product = productFixture("");
const channels = createChannelsData(channelsList);

storiesOf("Views / Products / Create product", module)
  .addDecorator(Decorator)
  .add("default", () => (
    <ProductCreatePage
      activeBusiness="asq_asd3-123ds"
      currentChannels={channels}
      loading={false}
      errors={[]}
      header="Add product"
      collections={product.collections}
      fetchCategories={() => undefined}
      fetchCollections={() => undefined}
      fetchMoreCategories={fetchMoreProps}
      fetchMoreCollections={fetchMoreProps}
      categories={[product.category]}
      onBack={() => undefined}
      onChannelsChange={() => undefined}
      onSubmit={() => undefined}
      saveButtonBarState="default"
      channelsErrors={[]}
      paymentMethods={[]}
      bookableResources={[]}
      pageInfo={{
        hasNextPage: false,
        hasPreviousPage: false
      }}
      totalCount={10}
      onNextPage={() => undefined}
      onPreviousPage={() => undefined}
      hasStripeWarning={true}
      isStripeEnabled={false}
      onConfigureStripe={() => null}
      onWarningClose={() => null}
    />
  ))
  .add("When loading", () => (
    <ProductCreatePage
      activeBusiness="asq_asd3-123ds"
      currentChannels={channels}
      loading={true}
      errors={[]}
      header="Add product"
      collections={product.collections}
      fetchCategories={() => undefined}
      fetchCollections={() => undefined}
      fetchMoreCategories={fetchMoreProps}
      fetchMoreCollections={fetchMoreProps}
      categories={[product.category]}
      onBack={() => undefined}
      onChannelsChange={() => undefined}
      onSubmit={() => undefined}
      saveButtonBarState="default"
      channelsErrors={[]}
      paymentMethods={[]}
      bookableResources={[]}
      pageInfo={{
        hasNextPage: false,
        hasPreviousPage: false
      }}
      totalCount={10}
      onNextPage={() => undefined}
      onPreviousPage={() => undefined}
      hasStripeWarning={true}
      isStripeEnabled={false}
      onConfigureStripe={() => null}
      onWarningClose={() => null}
    />
  ))
  .add("form errors", () => (
    <ProductCreatePage
      activeBusiness="asq_asd3-123ds"
      currentChannels={channels}
      loading={false}
      errors={([
        "attributes",
        "name",
        "productType",
        "category",
        "sku"
      ] as Array<keyof ProductCreateFormData | "attributes">).map(field => ({
        __typename: "ProductError",
        attributes:
          field === "attributes"
            ? [productTypeSearch.productAttributes[0].id]
            : null,
        code: ProductErrorCode.INVALID,
        field,
        message: "This is the message"
      }))}
      header="Add product"
      collections={product.collections}
      fetchCategories={() => undefined}
      fetchCollections={() => undefined}
      fetchMoreCategories={fetchMoreProps}
      fetchMoreCollections={fetchMoreProps}
      categories={[product.category]}
      onBack={() => undefined}
      onChannelsChange={() => undefined}
      onSubmit={() => undefined}
      saveButtonBarState="default"
      channelsErrors={[]}
      paymentMethods={[]}
      bookableResources={[]}
      pageInfo={{
        hasNextPage: false,
        hasPreviousPage: false
      }}
      totalCount={10}
      onNextPage={() => undefined}
      onPreviousPage={() => undefined}
      hasStripeWarning={true}
      isStripeEnabled={false}
      onConfigureStripe={() => null}
      onWarningClose={() => null}
    />
  ));
