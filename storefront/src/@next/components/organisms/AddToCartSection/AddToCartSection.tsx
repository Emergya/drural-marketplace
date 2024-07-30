import { ICheckoutModelLine } from "@drural/sdk/lib/helpers";
import {
  ProductDetails_product_pricing,
  ProductDetails_product_variants,
  ProductDetails_product_variants_pricing,
} from "@drural/sdk/lib/queries/gqlTypes/ProductDetails";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useMutation } from "react-apollo";
import { FormattedMessage, useIntl } from "react-intl";
import Media from "react-responsive";

import { Button } from "@components/atoms";
import { toggleChatwootVisibility } from "@components/atoms/ChatwootWidget/utils";
import { ProductRatingAverage } from "@components/molecules";
import { SaveToWishListSelect } from "@components/molecules/SaveToWishlistSelect";
import { GetServiceReviews_product } from "@pages/ReviewsPage/gqlTypes/GetServiceReviews";
import { getUserWishListsQuery } from "@pages/WishList/queries";
import WishListModalAddService from "@pages/WishList/WishListModalAddService";
import WishListModalForm from "@pages/WishList/WishListModalForm";
import {
  WishListAddService,
  WishListAddServiceVariables,
} from "@pages/WishList/WishListModalNotification/gqlTypes/WishListAddService";
import { addServiceWishListMutation } from "@pages/WishList/WishListModalNotification/queries";
import { smallScreen } from "@styles/constants-drural";
import { commonMessages } from "@temp/intl";
import { IProductVariantsAttributesSelectedValues } from "@types";

import defaultImage from "../../../../images/dRuralImages/default-image-square.svg";
import AddToCartButton from "../../molecules/AddToCartButton";
// import QuantityInput from "../../molecules/QuantityInput";
import ProductVariantPicker from "../ProductVariantPicker";
import {
  canAddToCart,
  getAvailableQuantity,
  getProductPrice,
} from "./stockHelpers";
import * as S from "./styles";

const LOW_STOCK_QUANTITY: number = 5;

export interface IAddToCartSection {
  productId: string;
  productVariants: ProductDetails_product_variants[];
  name: string;
  hasNoPrice: boolean;
  isBillableProduct: boolean;
  isBookableProduct: boolean;
  productPricing: ProductDetails_product_pricing;
  productReviews: Partial<GetServiceReviews_product>;
  productUrl: string | null;
  items: ICheckoutModelLine[];
  isChatActive: boolean;
  queryAttributes: Record<string, string>;
  isAvailableForPurchase: boolean | null;
  availableForPurchase: string | null;
  variantId: string;
  setVariantId(variantId: string): void;
  onAddToCart(variantId: string, quantity?: number): void;
  onAttributeChangeHandler(slug: string | null, value: string): void;
}

const AddToCartSection: React.FC<IAddToCartSection> = ({
  availableForPurchase,
  hasNoPrice,
  isAvailableForPurchase,
  isBillableProduct,
  isBookableProduct,
  items,
  isChatActive,
  name,
  productUrl,
  productPricing,
  productReviews,
  productVariants,
  queryAttributes,
  onAddToCart,
  onAttributeChangeHandler,
  setVariantId,
  variantId,
}) => {
  const intl = useIntl();

  const [quantity /* setQuantity */] = useState<number>(1);
  const [variantStock, setVariantStock] = useState<number>(0);
  const [
    variantPricing,
    setVariantPricing,
  ] = useState<ProductDetails_product_variants_pricing | null>(null);

  const availableQuantity = getAvailableQuantity(
    items,
    variantId,
    variantStock
  );
  const isOutOfStock = !!variantId && variantStock === 0;
  const noPurchaseAvailable = !isAvailableForPurchase && !availableForPurchase;
  const purchaseAvailableDate =
    !isAvailableForPurchase &&
    availableForPurchase &&
    Date.parse(availableForPurchase);
  const isNoItemsAvailable = !!variantId && !isOutOfStock && !availableQuantity;
  const isLowStock =
    !!variantId &&
    !isOutOfStock &&
    !isNoItemsAvailable &&
    availableQuantity < LOW_STOCK_QUANTITY;

  const disableButton = !canAddToCart(
    items,
    !!isAvailableForPurchase,
    variantId,
    variantStock,
    quantity
  );

  const reviewsCount = productReviews?.reviews?.totalCount;

  const renderErrorMessage = (message: string, testingContextId: string) => (
    <S.ErrorMessage
      data-test="stockErrorMessage"
      data-testId={testingContextId}
    >
      {message}
    </S.ErrorMessage>
  );

  const onVariantPickerChange = (
    _selectedAttributesValues?: IProductVariantsAttributesSelectedValues,
    selectedVariant?: ProductDetails_product_variants
  ): undefined => {
    if (!selectedVariant) {
      setVariantId("");
      setVariantPricing(null);
      setVariantStock(0);
      return;
    }
    setVariantId(selectedVariant.id);
    setVariantPricing(selectedVariant?.pricing);
    setVariantStock(selectedVariant?.quantityAvailable);
  };

  const { data: userWishlists, refetch } = getUserWishListsQuery({
    first: 30,
  });

  const [showCreateListModal, setShowCreateListModal] = React.useState(false);
  const [showAddServiceModal, setShowAddServiceModal] = React.useState(false);
  const displayQueryMutationError = (GraphQLErrorMessage?: string) => {
    if (GraphQLErrorMessage) {
      alert.show(
        {
          content: intl.formatMessage(
            {
              defaultMessage: "{error} ",
            },
            {
              error: GraphQLErrorMessage,
            }
          ),
          title: "Error",
        },
        { type: "error", timeout: 5000 }
      );
    } else {
      alert.show(
        {
          content: intl.formatMessage(commonMessages.mutationError),
          title: "Error",
        },
        { type: "error", timeout: 5000 }
      );
    }
  };
  const alert = useAlert();

  const [listSelected, setListSelected] = React.useState("");
  const [addServiceWishList] = useMutation<
    WishListAddService,
    WishListAddServiceVariables
  >(addServiceWishListMutation, {
    onCompleted(data) {
      // TODO: error handling UI not yet defined
      if (data.wishlistAddVariant!.errors?.length > 0) {
        alert.show(
          {
            content: intl.formatMessage(commonMessages.mutationError),
            title: "Error",
          },
          { type: "error", timeout: 5000 }
        );
      } else {
        setShowAddServiceModal(true);
      }
    },
    onError(error) {
      displayQueryMutationError(error.message);
    },
  });

  const handleAddService = (listName: string) => {
    setListSelected(listName);
    setShowAddServiceModal(true);
  };

  return (
    <S.AddToCartSelection>
      <Media minWidth={smallScreen + 1}>
        <S.ProductNameHeader data-test="productName">
          {name}
        </S.ProductNameHeader>
      </Media>
      <S.MainInfoWrapper>
        {!hasNoPrice &&
          (isOutOfStock ? (
            renderErrorMessage(
              intl.formatMessage(commonMessages.outOfStock),
              "outOfStock"
            )
          ) : (
            <S.ProductPricing>
              {getProductPrice(productPricing, variantPricing)}
            </S.ProductPricing>
          ))}
        {productReviews && (
          <ProductRatingAverage
            rating={productReviews.rating || 0}
            reviewsCount={reviewsCount || 0}
          />
        )}
      </S.MainInfoWrapper>

      {noPurchaseAvailable &&
        renderErrorMessage(
          intl.formatMessage(commonMessages.noPurchaseAvailable),
          "notAvailable"
        )}
      {purchaseAvailableDate &&
        renderErrorMessage(
          intl.formatMessage(commonMessages.purchaseAvailableOn, {
            date: new Intl.DateTimeFormat("default", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }).format(purchaseAvailableDate),
            time: new Intl.DateTimeFormat("default", {
              hour: "numeric",
              minute: "numeric",
            }).format(purchaseAvailableDate),
          }),
          "timeRestrictedAvailability"
        )}
      {isLowStock &&
        renderErrorMessage(
          intl.formatMessage(commonMessages.lowStock),
          "lowStockWarning"
        )}
      {isNoItemsAvailable &&
        renderErrorMessage(
          intl.formatMessage(commonMessages.noItemsAvailable),
          "noItemsAvailable"
        )}
      <S.VariantPicker>
        <ProductVariantPicker
          productVariants={productVariants}
          onChange={onVariantPickerChange}
          selectSidebar
          queryAttributes={queryAttributes}
          onAttributeChangeHandler={onAttributeChangeHandler}
        />
      </S.VariantPicker>
      {/* <S.QuantityInput>
        <QuantityInput
          quantity={quantity}
          maxQuantity={availableQuantity}
          disabled={isOutOfStock || isNoItemsAvailable}
          onQuantityChange={setQuantity}
          hideErrors={!variantId || isOutOfStock || isNoItemsAvailable}
          testingContext="addToCartQuantity"
        />
      </S.QuantityInput> */}
      <S.ButtonsWrapper>
        {(isBillableProduct || isBookableProduct) && (
          <AddToCartButton
            disabled={disableButton}
            isBookableProduct={isBookableProduct}
            onSubmit={() => onAddToCart(variantId, quantity)}
          />
        )}
        {productUrl && (
          <a href={productUrl} target="blank">
            <Button
              fullWidth
              testingContext="product-url-btn"
              onClick={() => null}
            >
              <FormattedMessage defaultMessage="Visit service page" />
            </Button>
          </a>
        )}
        {isChatActive && (
          <Button
            color="ghost"
            fullWidth
            testingContext="product-ask-seller"
            onClick={toggleChatwootVisibility}
          >
            <FormattedMessage defaultMessage="Ask to seller" />
          </Button>
        )}
      </S.ButtonsWrapper>
      {userWishlists?.me && (
        <SaveToWishListSelect
          wishlists={
            userWishlists?.me?.wishlists!.edges.length > 0
              ? userWishlists.me.wishlists!.edges.map(edge => edge.node)
              : []
          }
          handleClickAddService={() => {
            setShowCreateListModal(true);
          }}
          handleClickListItem={(listId: string, listName: string) => {
            setListSelected(listName);
            addServiceWishList({
              variables: {
                wishlistId: listId,
                variantId,
              },
            });
          }}
        />
      )}
      {showCreateListModal && (
        <WishListModalForm
          content={{
            title: intl.formatMessage({
              defaultMessage: "Create new wishlist",
            }),
            placeholderText: intl.formatMessage({
              defaultMessage: "List name",
            }),
            buttonConfirmText: intl.formatMessage({
              defaultMessage: "Create list",
            }),

            buttonCancelText: intl.formatMessage({
              defaultMessage: "Cancel",
            }),
            modalFormType: "create",
            initialText: "",
            serviceToNewList: {
              serviceId: variantId,
              serviceName: productVariants[0].name,
              serviceImage: productVariants
                ? productVariants[0]
                  ? productVariants[0].images
                    ? productVariants[0].images[0]?.url!
                    : defaultImage
                  : defaultImage
                : defaultImage,
            },
          }}
          hide={() => setShowCreateListModal(false)}
          refetchUserWishLists={refetch}
          showSuccessAddedServiceModal={handleAddService}
        />
      )}
      {showAddServiceModal && (
        <WishListModalAddService
          content={{
            title: intl.formatMessage({
              defaultMessage: "Service added to wishlist",
            }),
            text: intl.formatMessage(
              {
                defaultMessage: "{serviceName} has been added to {listName}? ",
              },
              {
                serviceName: productVariants[0].name,
                listName: listSelected,
              }
            ),
            thumbnail: productVariants
              ? productVariants[0]
                ? productVariants[0].images
                  ? productVariants[0].images[0]?.url!
                  : defaultImage
                : defaultImage
              : defaultImage,
          }}
          hide={() => setShowAddServiceModal(false)}
        />
      )}
    </S.AddToCartSelection>
  );
};
AddToCartSection.displayName = "AddToCartSection";
export default AddToCartSection;
