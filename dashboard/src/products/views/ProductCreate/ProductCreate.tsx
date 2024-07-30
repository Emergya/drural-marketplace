import { useResourceListQuery } from "@saleor/bookableResources/queries";
import { ChannelData, createSortedChannelsData } from "@saleor/channels/utils";
import useAppChannel from "@saleor/components/AppLayout/AppChannelContext";
import { BusinessContext } from "@saleor/components/BusinessProvider";
import ChannelsAvailabilityDialog from "@saleor/components/ChannelsAvailabilityDialog";
import { WindowTitle } from "@saleor/components/WindowTitle";
import {
  DEFAULT_INITIAL_SEARCH_DATA,
  VALUES_PAGINATE_BY
} from "@saleor/config";
import { useFileUploadMutation } from "@saleor/files/mutations";
import useChannels from "@saleor/hooks/useChannels";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import usePaginator, {
  createPaginationState
} from "@saleor/hooks/usePaginator";
import ProductCreatePage from "@saleor/products/components/ProductCreatePage";
import {
  useProductChannelListingUpdate,
  useProductDeleteMutation,
  useProductVariantChannelListingUpdate,
  useVariantCreateMutation
} from "@saleor/products/mutations";
import { useProductCreateMutation } from "@saleor/products/mutations";
import { useGetPaymentMethods } from "@saleor/products/queries";
import {
  productAddUrl,
  ProductCreateUrlDialog,
  ProductCreateUrlQueryParams,
  productListUrl,
  productUrl
} from "@saleor/products/urls";
import useCategorySearch from "@saleor/searches/useCategorySearch";
import useCollectionSearch from "@saleor/searches/useCollectionSearch";
import { getProductErrorMessage } from "@saleor/utils/errors";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import createMetadataCreateHandler from "@saleor/utils/handlers/metadataCreateHandler";
import { mapEdgesToItems } from "@saleor/utils/maps";
import {
  useMetadataUpdate,
  usePrivateMetadataUpdate
} from "@saleor/utils/metadata/updateMetadata";
import React from "react";
import { useIntl } from "react-intl";

import { businessStripeConfigurationUrl } from "../../../business/urls";
import { createHandler } from "./handlers";

interface ProductCreateProps {
  params: ProductCreateUrlQueryParams;
}

export const ProductCreateView: React.FC<ProductCreateProps> = ({ params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const paginate = usePaginator();
  const intl = useIntl();
  const [productCreateComplete, setProductCreateComplete] = React.useState(
    false
  );
  // Business data
  const { activeBusiness } = React.useContext(BusinessContext);
  const businessId = activeBusiness?.active.node.id;
  const { isEnabled: isStripeEnabled } =
    activeBusiness?.active.node.stripeCredentials || {};

  const [hasStripeWarning, setStripeWarning] = React.useState(false);

  const onWarningClose = () => setStripeWarning(false);

  const onConfigureStripe = () =>
    navigate(businessStripeConfigurationUrl(businessId));

  const [openModal, closeModal] = createDialogActionHandlers<
    ProductCreateUrlDialog,
    ProductCreateUrlQueryParams
  >(navigate, params => productAddUrl(params), params);

  const {
    loadMore: loadMoreCategories,
    search: searchCategory,
    result: searchCategoryOpts
  } = useCategorySearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA
  });
  const {
    loadMore: loadMoreCollections,
    search: searchCollection,
    result: searchCollectionOpts
  } = useCollectionSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA
  });
  const [updateMetadata] = useMetadataUpdate({});
  const [updatePrivateMetadata] = usePrivateMetadataUpdate({});

  const { availableChannels } = useAppChannel(false);
  const allChannels: ChannelData[] = createSortedChannelsData(
    availableChannels
  );

  const {
    channelListElements,
    channelsToggle,
    currentChannels,
    handleChannelsConfirm,
    handleChannelsModalClose,
    isChannelSelected,
    isChannelsModalOpen,
    setCurrentChannels,
    toggleAllChannels
  } = useChannels(allChannels, params?.action, {
    closeModal,
    openModal
  });

  // Payment methods
  const {
    data: paymentMethodsData,
    loading: loadingPaymentMethods
  } = useGetPaymentMethods({
    variables: { first: 20 }
  });

  // Bookable resources
  const paginationState = createPaginationState(VALUES_PAGINATE_BY, params);

  const {
    data: bookableResourcesData,
    loading: loadingResources
  } = useResourceListQuery({
    skip: !businessId,
    variables: {
      ...paginationState,
      company: businessId
    }
  });

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    bookableResourcesData?.bookableResources?.pageInfo,
    paginationState,
    params
  );

  const handleSuccess = (productId: string) => {
    notify({
      status: "success",
      text: intl.formatMessage({
        defaultMessage: "Product created"
      })
    });
    navigate(productUrl(productId));
  };

  const [, /* uploadFile */ uploadFileOpts] = useFileUploadMutation({});

  const [updateChannels, updateChannelsOpts] = useProductChannelListingUpdate(
    {}
  );
  const [
    updateVariantChannels,
    updateVariantChannelsOpts
  ] = useProductVariantChannelListingUpdate({});

  const handleBack = () => navigate(productListUrl());

  const [productCreate, productCreateOpts] = useProductCreateMutation({
    onCompleted: data => {
      const { errors } = data.productCreate;

      if (errors.length) {
        errors.forEach(error =>
          notify({
            status: "error",
            text: getProductErrorMessage(error, intl)
          })
        );
      }
    }
  });
  const [deleteProduct] = useProductDeleteMutation({});
  const [
    productVariantCreate,
    productVariantCreateOpts
  ] = useVariantCreateMutation({
    onCompleted: data => {
      const errors = data.productVariantCreate.errors;
      if (errors.length) {
        errors.map(error =>
          notify({
            status: "error",
            text: getProductErrorMessage(error, intl)
          })
        );
      }
    }
  });

  // HandleSubmit form function
  const handleSubmit = async data => {
    const result = await createMetadataCreateHandler(
      createHandler(
        variables => productCreate({ variables }),
        variables => productVariantCreate({ variables }),
        updateChannels,
        updateVariantChannels,
        deleteProduct
      ),
      updateMetadata,
      updatePrivateMetadata
    )(data);

    if (result) {
      setProductCreateComplete(true);
    }
  };

  React.useEffect(() => {
    const productId = productCreateOpts.data?.productCreate?.product?.id;

    if (productCreateComplete && productId) {
      handleSuccess(productId);
    }
  }, [productCreateComplete]);

  const fetchMoreCollections = {
    hasMore: searchCollectionOpts.data?.search?.pageInfo?.hasNextPage,
    loading: searchCollectionOpts.loading,
    onFetchMore: loadMoreCollections
  };
  const fetchMoreCategories = {
    hasMore: searchCategoryOpts.data?.search?.pageInfo?.hasNextPage,
    loading: searchCategoryOpts.loading,
    onFetchMore: loadMoreCategories
  };

  const loading =
    uploadFileOpts.loading ||
    productCreateOpts.loading ||
    productVariantCreateOpts.loading ||
    updateChannelsOpts.loading ||
    updateVariantChannelsOpts.loading ||
    loadingPaymentMethods ||
    loadingResources;

  // Sets stripeWarning after page loading
  React.useEffect(() => {
    setStripeWarning(!isStripeEnabled);
  }, [isStripeEnabled]);

  return (
    <>
      <WindowTitle
        title={intl.formatMessage({
          defaultMessage: "Create Product",
          description: "window title"
        })}
      />
      {!!allChannels?.length && (
        <ChannelsAvailabilityDialog
          isSelected={isChannelSelected}
          disabled={!channelListElements.length}
          channels={allChannels}
          onChange={channelsToggle}
          onClose={handleChannelsModalClose}
          open={isChannelsModalOpen}
          title={intl.formatMessage({
            defaultMessage: "Manage Products Channel Availability"
          })}
          confirmButtonState="default"
          selected={channelListElements.length}
          onConfirm={handleChannelsConfirm}
          toggleAll={toggleAllChannels}
        />
      )}
      <ProductCreatePage
        activeBusiness={businessId}
        currentChannels={currentChannels}
        categories={mapEdgesToItems(searchCategoryOpts?.data?.search) || []}
        collections={mapEdgesToItems(searchCollectionOpts?.data?.search) || []}
        loading={loading}
        errors={[
          ...(productCreateOpts.data?.productCreate.errors || []),
          ...(productVariantCreateOpts.data?.productVariantCreate.errors || [])
        ]}
        channelsErrors={
          updateVariantChannelsOpts.data?.productVariantChannelListingUpdate
            ?.errors || []
        }
        paymentMethods={mapEdgesToItems(paymentMethodsData?.paymentMethods)}
        bookableResources={mapEdgesToItems(
          bookableResourcesData?.bookableResources
        )}
        pageInfo={pageInfo}
        onNextPage={loadNextPage}
        onPreviousPage={loadPreviousPage}
        totalCount={bookableResourcesData?.bookableResources.totalCount}
        fetchCategories={searchCategory}
        fetchCollections={searchCollection}
        header={intl.formatMessage({
          defaultMessage: "New Service",
          description: "page header"
        })}
        onBack={handleBack}
        onSubmit={handleSubmit}
        saveButtonBarState={productCreateOpts.status}
        fetchMoreCategories={fetchMoreCategories}
        fetchMoreCollections={fetchMoreCollections}
        isStripeEnabled={isStripeEnabled}
        hasStripeWarning={hasStripeWarning}
        onChannelsChange={setCurrentChannels}
        onConfigureStripe={onConfigureStripe}
        onWarningClose={onWarningClose}
      />
    </>
  );
};
export default ProductCreateView;
