import { useAuth } from "@drural/sdk";
import { ProductDetails } from "@drural/sdk/lib/fragments/gqlTypes/ProductDetails";
import { UilShieldExclamation } from "@iconscout/react-unicons";
import classNames from "classnames";
import {
  OrderDirection,
  ProductRatingSortingField,
} from "gqlTypes/globalTypes";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Media from "react-media";
import { generatePath } from "react-router";

import {
  PageBottomSpacing,
  ProductCategories,
  ProductInfo,
  ProductMethods,
  Separator,
  StyledLink,
} from "@components/atoms";
import { getActiveMethods } from "@components/atoms/ProductMethods/utils";
import {
  ProductAddress,
  ProductCompany,
  ProductMediaShare,
  ProductReviews,
} from "@components/molecules";
import { ProductGallery } from "@components/organisms";
import AddToCartSection from "@components/organisms/AddToCartSection";
import { useGetServiceReviews } from "@pages/ReviewsPage/queries";
import RatingConfirmationModal from "@pages/ReviewsPage/RatingConfirmationModal/RatingConfirmationModal";
import RatingDeleteModal from "@pages/ReviewsPage/RatingDeleteModal/RatingDeleteModal";
import RatingModal from "@pages/ReviewsPage/RatingModal/RatingModal";
import { paths } from "@paths";
import { commonMessages } from "@temp/intl";
import { mapEdgesToItems } from "@utils/misc";

import {
  Breadcrumbs,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "../../components";
import { structuredData } from "../../core/SEO/Product/structuredData";
import defaultImage from "../../images/dRuralImages/default-image-square.svg";
import GalleryCarousel from "./GalleryCarousel";
import OtherProducts from "./Other";
import * as S from "./styles";
import { IProps } from "./types";

import { smallScreen } from "../../globalStyles/scss/variables.scss";

const populateBreadcrumbs = (product: ProductDetails) => [
  {
    link: generatePath(paths.category, { slug: product.category.slug }),
    value: product.category.name,
  },
  {
    link: generatePath(paths.product, { slug: product.slug }),
    value: product.name,
  },
];

const Page: React.FC<
  IProps & {
    queryAttributes: Record<string, string>;
    onAttributeChangeHandler: (slug: string | null, value: string) => void;
  }
> = ({
  add,
  product,
  items,
  isChatActive,
  queryAttributes,
  onAttributeChangeHandler,
}) => {
  // 1. Data + varaibles
  const intl = useIntl();
  const { push } = useRouter();
  const { user } = useAuth();

  const overlayContext = React.useContext(OverlayContext);

  const productGallery: React.RefObject<HTMLDivElement> = React.useRef();

  const [variantId, setVariantId] = React.useState("");

  // 2. Functions + methods
  const getImages = () => {
    // if (product.variants && variantId) {
    //   const variant = product.variants.find(
    //     variant => variant.id === variantId
    //   );

    //   if (variant?.images.length > 0) {
    //     return variant.images;
    //   }
    // }

    return product.images;
  };

  const handleAddToCart = (variantId, quantity) => {
    add(variantId, quantity);
    // overlayContext.show(OverlayType.cart, OverlayTheme.right);
    if (!user) {
      overlayContext.show(
        OverlayType.login,
        OverlayTheme.modal,
        null,
        product.isBookable
          ? {
              pathname: paths.booking,
              query: {
                productSlug: product?.slug,
              },
            }
          : paths.checkout
      );
    } else {
      push(
        product.isBookable
          ? {
              pathname: paths.booking,
              query: {
                productSlug: product?.slug,
              },
            }
          : paths.checkout
      );
    }
  };

  const [showRatingModal, setShowRatingModal] = React.useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = React.useState(
    false
  );
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [reviewToDelete, setReviewToDelete] = React.useState("");

  const { data, refetch } = useGetServiceReviews({
    slug: product.slug as string,
    first: 3,
    sortBy: {
      direction: OrderDirection.DESC,
      field: ProductRatingSortingField.MINE,
    },
  });

  // 3. Sections
  const addToCartSection = (
    <AddToCartSection
      items={items}
      isChatActive={isChatActive}
      productId={product.id}
      hasNoPrice={product.hasNoPrice}
      productUrl={product.url}
      isBillableProduct={product.isBillable}
      isBookableProduct={product.isBookable}
      name={product.name}
      productVariants={product.variants}
      productPricing={product.pricing}
      queryAttributes={queryAttributes}
      setVariantId={setVariantId}
      variantId={variantId}
      onAddToCart={handleAddToCart}
      onAttributeChangeHandler={onAttributeChangeHandler}
      isAvailableForPurchase={product.isAvailableForPurchase}
      availableForPurchase={product.availableForPurchase}
      productReviews={data?.product}
    />
  );

  const reportServiceSection = (
    <S.ReportService className="product-page__product__info__report-service">
      <UilShieldExclamation />
      <StyledLink
        underline
        onClick={() => {
          push({
            pathname: paths.productReport,
            query: {
              productSlug: product?.slug,
            },
          });
        }}
      >
        <FormattedMessage defaultMessage="Report service" />
      </StyledLink>
    </S.ReportService>
  );

  const productInfoSection = (
    <>
      {addToCartSection}
      {user && reportServiceSection}
    </>
  );

  // 4. Render
  return (
    <div className="product-page">
      <div className="container">
        <Breadcrumbs breadcrumbs={populateBreadcrumbs(product)} />
      </div>

      <div className="container product-page__container">
        <div className="product-page__product">
          <script className="structured-data-list" type="application/ld+json">
            {structuredData(product)}
          </script>
          <Media query={{ maxWidth: smallScreen }}>
            {matches =>
              matches ? (
                <>
                  <h2
                    className="product-page__product__name"
                    data-test="productName"
                  >
                    {product.name}
                  </h2>
                  <GalleryCarousel images={getImages()} />
                  <div className="product-page__product__info">
                    {productInfoSection}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="product-page__product__gallery"
                    ref={productGallery}
                  >
                    <ProductGallery images={getImages()} />
                  </div>
                  <div className="product-page__product__info">
                    <div
                      className={classNames(
                        "product-page__product__info--fixed"
                      )}
                    >
                      {productInfoSection}
                    </div>
                  </div>
                </>
              )
            }
          </Media>
        </div>
      </div>
      <div className="container product-page__container">
        <div className="product-page__product-details">
          <div className="product-page__product-details__col-1">
            {product.description && (
              <ProductInfo
                title={intl.formatMessage(commonMessages.description)}
                data={product.description}
              />
            )}
            {product.details && (
              <ProductInfo
                title={intl.formatMessage(commonMessages.serviceDetails)}
                data={product.details}
              />
            )}
            <Separator />
            <Media query={{ minWidth: smallScreen }}>
              <ProductReviews
                isStaff = {user?.isStaff}
                product={data?.product}
                onClick={() => setShowRatingModal(true)}
                onDelete={(reviewID: string) => {
                  setReviewToDelete(reviewID);
                  setShowDeleteModal(true);
                }}
              />
            </Media>
          </div>
          <div className="product-page__product-details__col-2">
            {/* When model ready > check also for coords */}
            {product.address && (
              <>
                <Media query={{ minWidth: smallScreen }}>
                  <Separator marginTop="0" />
                </Media>
                <ProductAddress address={product.address} />
              </>
            )}
            <ProductMediaShare url={window.location.href} />
            {!!getActiveMethods(product.paymentMethods).length && (
              <>
                <Separator />
                <ProductMethods
                  title={intl.formatMessage(commonMessages.paymentMethods)}
                  methods={getActiveMethods(product.paymentMethods)}
                />
              </>
            )}
            <Separator mobileMarginBottom="16" />
            {product.categories && (
              <ProductCategories
                categories={mapEdgesToItems(product.categories)}
              />
            )}
            <Separator mobileMarginTop="16" />
            <Media query={{ maxWidth: smallScreen }}>
              <>
                <ProductReviews
                  isStaff = {user?.isStaff}
                  product={data?.product}
                  onClick={() => setShowRatingModal(true)}
                  onDelete={(reviewID: string) => {
                    setReviewToDelete(reviewID);
                    setShowDeleteModal(true);
                  }}
                />
                <Separator mobileMarginTop="26" />
              </>
            </Media>

            <ProductCompany
              company={product.company}
              onClick={() =>
                push(generatePath(paths.company, { id: product.company.id }))
              }
            />
          </div>
        </div>
      </div>
      <div className="container product-page__other-products__container">
        <OtherProducts products={product.category.products.edges} />
      </div>

      <PageBottomSpacing />

      {showRatingModal && (
        <RatingModal
          serviceToReview={{
            serviceId: product.id,
            serviceImage: product.thumbnail?.url || defaultImage,
            serviceName: product.name,
          }}
          hide={() => setShowRatingModal(false)}
          refetchProductRatings={() => refetch()}
          showSucessModal={() => setShowConfirmationModal(true)}
        />
      )}
      {showConfirmationModal && (
        <RatingConfirmationModal hide={() => setShowConfirmationModal(false)} />
      )}
      {showDeleteModal && (
        <RatingDeleteModal
          ratingID={reviewToDelete}
          refetch={() => refetch()}
          hide={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default Page;
