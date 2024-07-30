import placeholderImg from "@assets/images/placeholder255x255.png";
import {
  darken,
  DialogContentText,
  IconButton,
  lighten,
  makeStyles
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useAttributeValueDeleteMutation } from "@saleor/attributes/mutations";
import { useResourceListQuery } from "@saleor/bookableResources/queries";
import { businessStripeConfigurationUrl } from "@saleor/business/urls";
import ChannelsWithVariantsAvailabilityDialog from "@saleor/channels/components/ChannelsWithVariantsAvailabilityDialog";
import {
  ChannelData,
  createChannelsDataWithPrice,
  createSortedChannelsDataFromProduct
} from "@saleor/channels/utils";
import ActionDialog from "@saleor/components/ActionDialog";
import useAppChannel from "@saleor/components/AppLayout/AppChannelContext";
import { AttributeInput } from "@saleor/components/Attributes";
import ChannelsAvailabilityDialog from "@saleor/components/ChannelsAvailabilityDialog";
import NotFoundPage from "@saleor/components/NotFoundPage";
import { useShopLimitsQuery } from "@saleor/components/Shop/query";
import { WindowTitle } from "@saleor/components/WindowTitle";
import {
  DEFAULT_INITIAL_SEARCH_DATA,
  VALUES_PAGINATE_BY
} from "@saleor/config";
import { useFileUploadMutation } from "@saleor/files/mutations";
import { getSearchFetchMoreProps } from "@saleor/hooks/makeTopLevelSearch/utils";
import useBulkActions from "@saleor/hooks/useBulkActions";
import useChannels from "@saleor/hooks/useChannels";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import useOnSetDefaultVariant from "@saleor/hooks/useOnSetDefaultVariant";
import usePaginator, {
  createPaginationState
} from "@saleor/hooks/usePaginator";
import useShop from "@saleor/hooks/useShop";
import useUser from "@saleor/hooks/useUser";
import { commonMessages, errorMessages } from "@saleor/intl";
import { ProductUpdatePageSubmitData } from "@saleor/products/components/ProductUpdatePage/types";
import ProductVariantCreateDialog from "@saleor/products/components/ProductVariantCreateDialog";
import {
  useProductChannelListingUpdate,
  useProductDeleteMutation,
  useProductMediaCreateMutation,
  useProductMediaDeleteMutation,
  useProductMediaReorder,
  useProductUpdateMutation,
  useProductVariantBulkDeleteMutation,
  useProductVariantChannelListingUpdate,
  useProductVariantReorderMutation,
  useSimpleProductUpdateMutation,
  useVariantCreateMutation
} from "@saleor/products/mutations";
import useCategorySearch from "@saleor/searches/useCategorySearch";
import useCollectionSearch from "@saleor/searches/useCollectionSearch";
import usePageSearch from "@saleor/searches/usePageSearch";
import useProductSearch from "@saleor/searches/useProductSearch";
import { getProductErrorMessage } from "@saleor/utils/errors";
import useAttributeValueSearchHandler from "@saleor/utils/handlers/attributeValueSearchHandler";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import createMetadataUpdateHandler from "@saleor/utils/handlers/metadataUpdateHandler";
import { mapEdgesToItems } from "@saleor/utils/maps";
import {
  useMetadataUpdate,
  usePrivateMetadataUpdate
} from "@saleor/utils/metadata/updateMetadata";
// import { useWarehouseList } from "@saleor/warehouses/queries";
// import { warehouseAddPath } from "@saleor/warehouses/urls";
import React from "react";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";

import { getMutationState } from "../../../misc";
import { ProductUpdatePage } from "../../components/ProductUpdatePage";
import { useGetPaymentMethods, useProductDetails } from "../../queries";
import { ProductMediaCreateVariables } from "../../types/ProductMediaCreate";
import { ProductUpdate as ProductUpdateMutationResult } from "../../types/ProductUpdate";
import {
  productImageUrl,
  productListUrl,
  productUrl,
  ProductUrlDialog,
  ProductUrlQueryParams,
  productVariantAddUrl,
  productVariantCreatorUrl,
  productVariantEditUrl
} from "../../urls";
import {
  createImageReorderHandler,
  createImageUploadHandler,
  createUpdateHandler,
  createVariantReorderHandler
} from "./handlers";
import useChannelsWithProductVariants from "./useChannelsWithProductVariants";

const messages = defineMessages({
  deleteProductDialogTitle: {
    defaultMessage: "Delete Service",
    description: "delete service dialog title"
  },
  deleteProductDialogSubtitle: {
    defaultMessage: "Are you sure you want to delete {name}?",
    description: "delete product dialog subtitle"
  },
  deleteVariantDialogTitle: {
    defaultMessage: "Delete Service Variants",
    description: "delete variant dialog title"
  },
  deleteVariantDialogSubtitle: {
    defaultMessage:
      "{counter,plural,one{Are you sure you want to delete this variant?} other{Are you sure you want to delete {displayQuantity} variants?}}",
    description: "delete variant dialog subtitle"
  }
});

interface ProductUpdateProps {
  id: string;
  params: ProductUrlQueryParams;
}

const useStyles = makeStyles(
  theme => ({
    toolbarIconButton: {
      backgroundColor: theme.palette.common.white,
      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
      color: darken(theme.palette.primary.main, 0.1),
      "&:hover": {
        backgroundColor: lighten(theme.palette.primary.main, 0.9)
      }
    },
    textAlignCenter: {
      textAlign: "center"
    }
  }),
  { name: "ProductUpdateView" }
);

export const ProductUpdate: React.FC<ProductUpdateProps> = ({ id, params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const paginate = usePaginator();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
    params.ids
  );
  const classes = useStyles();
  const { user } = useUser();
  const intl = useIntl();
  const {
    loadMore: loadMoreCategories,
    search: searchCategories,
    result: searchCategoriesOpts
  } = useCategorySearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA
  });
  const {
    loadMore: loadMoreCollections,
    search: searchCollections,
    result: searchCollectionsOpts
  } = useCollectionSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA
  });
  const {
    loadMore: loadMorePages,
    search: searchPages,
    result: searchPagesOpts
  } = usePageSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA
  });
  const {
    loadMore: loadMoreProducts,
    search: searchProducts,
    result: searchProductsOpts
  } = useProductSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA
  });
  const {
    loadMore: loadMoreAttributeValues,
    search: searchAttributeValues,
    result: searchAttributeValuesOpts,
    reset: searchAttributeReset
  } = useAttributeValueSearchHandler(DEFAULT_INITIAL_SEARCH_DATA);
  // const warehouses = useWarehouseList({
  //   displayLoader: true,
  //   variables: {
  //     first: 50
  //   }
  // });
  const shop = useShop();
  const [updateMetadata] = useMetadataUpdate({});
  const [updatePrivateMetadata] = usePrivateMetadataUpdate({});
  const [
    productVariantCreate,
    productVariantCreateOpts
  ] = useVariantCreateMutation({});

  const { availableChannels, channel } = useAppChannel(false);
  const { data, loading, refetch } = useProductDetails({
    displayLoader: true,
    variables: {
      id,
      channel: channel.slug,
      firstValues: VALUES_PAGINATE_BY,
      sellerRequest: user.isStaff ? false : true
    }
  });

  // Payment methods
  const {
    data: paymentMethodsData,
    loading: loadingPaymentMethods
  } = useGetPaymentMethods({
    variables: { first: 20 }
  });

  // Bookable resources
  const businessId = data?.product?.company.id;
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

  // Stripe warning
  const { isEnabled: isStripeEnabled } =
    data?.product?.company.stripeCredentials || {};

  const [hasStripeWarning, setStripeWarning] = React.useState(false);

  const onWarningClose = () => setStripeWarning(false);

  const onConfigureStripe = () =>
    navigate(businessStripeConfigurationUrl(businessId));

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    bookableResourcesData?.bookableResources?.pageInfo,
    paginationState,
    params
  );

  const limitOpts = useShopLimitsQuery({
    variables: {
      productVariants: true
    }
  });

  const [uploadFile, uploadFileOpts] = useFileUploadMutation({});

  const handleUpdate = (data: ProductUpdateMutationResult) => {
    const { errors } = data.productUpdate;

    if (errors.length === 0) {
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges)
      });
    } else {
      errors.forEach(error =>
        notify({
          status: "error",
          text: error.message
        })
      );
    }
  };
  const [updateProduct, updateProductOpts] = useProductUpdateMutation({
    onCompleted: handleUpdate
  });
  const [
    updateSimpleProduct,
    updateSimpleProductOpts
  ] = useSimpleProductUpdateMutation({
    onCompleted: handleUpdate
  });

  const [
    reorderProductImages,
    reorderProductImagesOpts
  ] = useProductMediaReorder({});

  const [deleteProduct, deleteProductOpts] = useProductDeleteMutation({
    onCompleted: () => {
      notify({
        status: "success",
        text: intl.formatMessage({
          defaultMessage: "Service removed"
        })
      });
      navigate(productListUrl());
    }
  });

  const [
    createProductImage,
    createProductImageOpts
  ] = useProductMediaCreateMutation({
    onCompleted: data => {
      const imageError = data.productMediaCreate.errors.find(
        error => error.field === ("image" as keyof ProductMediaCreateVariables)
      );
      if (imageError) {
        notify({
          status: "error",
          title: intl.formatMessage(errorMessages.imgageUploadErrorTitle),
          text: intl.formatMessage(errorMessages.imageUploadErrorText)
        });
      }
    }
  });

  const [deleteProductImage] = useProductMediaDeleteMutation({
    onCompleted: () =>
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges)
      })
  });

  const [
    bulkProductVariantDelete,
    bulkProductVariantDeleteOpts
  ] = useProductVariantBulkDeleteMutation({
    onCompleted: data => {
      if (data.productVariantBulkDelete.errors.length === 0) {
        closeModal();
        reset();
        refetch();
        limitOpts.refetch();
      }
    }
  });

  const [openModal, closeModal] = createDialogActionHandlers<
    ProductUrlDialog,
    ProductUrlQueryParams
  >(navigate, params => productUrl(id, params), params);

  // Saleor product
  const product = data?.product;

  const allChannels: ChannelData[] = createChannelsDataWithPrice(
    product,
    availableChannels
  ).sort((channel, nextChannel) =>
    channel.name.localeCompare(nextChannel.name)
  );

  // Saleor simple / variant product
  const isSimpleProduct = !data?.product?.productType?.hasVariants;

  const {
    channelsWithVariantsData,
    haveChannelsWithVariantsDataChanged,
    setHaveChannelsWithVariantsChanged,
    onChannelsAvailiabilityModalOpen,
    channelsData,
    setChannelsData,
    ...channelsWithVariantsProps
  } = useChannelsWithProductVariants({
    channels: allChannels,
    variants: product?.variants,
    action: params?.action,
    openModal,
    closeModal
  });

  const productChannelsChoices: ChannelData[] = createSortedChannelsDataFromProduct(
    product
  );

  const {
    channelListElements,
    channelsToggle,
    currentChannels,
    handleChannelsConfirm,
    handleChannelsModalClose,
    handleChannelsModalOpen,
    isChannelSelected,
    isChannelsModalOpen,
    setCurrentChannels,
    toggleAllChannels
  } = useChannels(productChannelsChoices, params?.action, {
    closeModal,
    openModal
  });

  const [updateChannels, updateChannelsOpts] = useProductChannelListingUpdate({
    onCompleted: data => {
      if (!!data.productChannelListingUpdate.errors.length) {
        data.productChannelListingUpdate.errors.forEach(error =>
          notify({
            status: "error",
            text: getProductErrorMessage(error, intl)
          })
        );
      }
    }
  });

  const [
    updateVariantChannels,
    updateVariantChannelsOpts
  ] = useProductVariantChannelListingUpdate({});

  const [
    createProductMedia,
    createProductMediaOpts
  ] = useProductMediaCreateMutation({
    onCompleted: data => {
      const errors = data.productMediaCreate.errors;

      if (errors.length) {
        errors.map(error =>
          notify({
            status: "error",
            text: getProductErrorMessage(error, intl)
          })
        );
      } else {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges)
        });
      }
    }
  });

  const handleMediaUrlUpload = (mediaUrl: string) => {
    const variables = {
      alt: "",
      mediaUrl,
      product: product.id
    };

    createProductMedia({
      variables
    });
  };

  const [
    deleteAttributeValue,
    deleteAttributeValueOpts
  ] = useAttributeValueDeleteMutation({});

  const handleBack = () => navigate(productListUrl());

  const handleVariantAdd = () => navigate(productVariantAddUrl(id));
  const handleVariantsAdd = () => navigate(productVariantCreatorUrl(id));

  const handleImageDelete = (id: string) => () =>
    deleteProductImage({ variables: { id } });
  const handleImageEdit = (imageId: string) => () =>
    navigate(productImageUrl(id, imageId));

  // Saleor handleSubmit function
  const handleSubmit = createMetadataUpdateHandler(
    product,
    createUpdateHandler(
      product,
      allChannels,
      variables => uploadFile({ variables }),
      variables => updateProduct({ variables }),
      variables => updateSimpleProduct({ variables }),
      updateChannels,
      updateVariantChannels,
      productVariantCreate,
      variables => deleteAttributeValue({ variables })
    ),
    variables => updateMetadata({ variables }),
    variables => updatePrivateMetadata({ variables }),
    refetch
  );

  const handleImageUpload = createImageUploadHandler(id, variables =>
    createProductImage({ variables })
  );
  const handleImageReorder = createImageReorderHandler(product, variables =>
    reorderProductImages({ variables })
  );

  const [
    reorderProductVariants,
    reorderProductVariantsOpts
  ] = useProductVariantReorderMutation({});

  const handleVariantReorder = createVariantReorderHandler(product, variables =>
    reorderProductVariants({ variables })
  );

  const handleAssignAttributeReferenceClick = (attribute: AttributeInput) =>
    navigate(
      productUrl(id, {
        action: "assign-attribute-value",
        id: attribute.id
      })
    );

  const disableFormSave =
    uploadFileOpts.loading ||
    createProductImageOpts.loading ||
    deleteProductOpts.loading ||
    reorderProductImagesOpts.loading ||
    updateProductOpts.loading ||
    reorderProductVariantsOpts.loading ||
    updateChannelsOpts.loading ||
    updateVariantChannelsOpts.loading ||
    productVariantCreateOpts.loading ||
    deleteAttributeValueOpts.loading ||
    createProductMediaOpts.loading ||
    loadingPaymentMethods ||
    loadingResources ||
    loading;

  const formTransitionState = getMutationState(
    updateProductOpts.called || updateSimpleProductOpts.called,
    updateProductOpts.loading || updateSimpleProductOpts.loading,
    updateProductOpts.data?.productUpdate.errors,
    updateSimpleProductOpts.data?.productUpdate.errors,
    updateSimpleProductOpts.data?.productVariantUpdate.errors,
    createProductMediaOpts.data?.productMediaCreate.errors
  );

  const categories = mapEdgesToItems(searchCategoriesOpts?.data?.search) || [];

  const collections =
    mapEdgesToItems(searchCollectionsOpts?.data?.search) || [];

  const attributeValues =
    mapEdgesToItems(searchAttributeValuesOpts?.data?.attribute.choices) || [];

  const errors = [
    ...(updateProductOpts.data?.productUpdate.errors || []),
    ...(updateSimpleProductOpts.data?.productUpdate.errors || []),
    ...(productVariantCreateOpts.data?.productVariantCreate.errors || [])
  ];

  const onSetDefaultVariant = useOnSetDefaultVariant(
    product ? product.id : null,
    null
  );
  const channelsErrors = [
    ...(updateChannelsOpts?.data?.productChannelListingUpdate?.errors || []),
    ...(updateVariantChannelsOpts?.data?.productVariantChannelListingUpdate
      ?.errors || [])
  ];

  const fetchMoreCollections = getSearchFetchMoreProps(
    searchCollectionsOpts,
    loadMoreCollections
  );

  const fetchMoreCategories = getSearchFetchMoreProps(
    searchCategoriesOpts,
    loadMoreCategories
  );

  const fetchMoreReferencePages = getSearchFetchMoreProps(
    searchPagesOpts,
    loadMorePages
  );

  const fetchMoreReferenceProducts = getSearchFetchMoreProps(
    searchProductsOpts,
    loadMoreProducts
  );

  const fetchMoreAttributeValues = {
    hasMore: !!searchAttributeValuesOpts.data?.attribute?.choices?.pageInfo
      ?.hasNextPage,
    loading: !!searchAttributeValuesOpts.loading,
    onFetchMore: loadMoreAttributeValues
  };

  // Sets stripeWarning after page loading
  React.useEffect(() => {
    setStripeWarning(!isStripeEnabled);
  }, [isStripeEnabled]);

  if (product === null) {
    return <NotFoundPage onBack={handleBack} />;
  }

  return (
    <>
      <WindowTitle title={data?.product?.name} />
      {!!allChannels?.length &&
        (isSimpleProduct ? (
          <ChannelsAvailabilityDialog
            isSelected={isChannelSelected}
            channels={allChannels}
            onChange={channelsToggle}
            onClose={handleChannelsModalClose}
            open={isChannelsModalOpen}
            title={intl.formatMessage({
              defaultMessage: "Manage Service Channel Availability"
            })}
            confirmButtonState="default"
            selected={channelListElements.length}
            onConfirm={handleChannelsConfirm}
            toggleAll={toggleAllChannels}
          />
        ) : (
          <ChannelsWithVariantsAvailabilityDialog
            channelsWithVariantsData={channelsWithVariantsData}
            haveChannelsWithVariantsDataChanged={
              haveChannelsWithVariantsDataChanged
            }
            {...channelsWithVariantsProps}
            channels={allChannels}
            variants={product?.variants}
          />
        ))}
      <ProductUpdatePage
        hasChannelChanged={
          haveChannelsWithVariantsDataChanged ||
          productChannelsChoices?.length !== currentChannels?.length
        }
        isSimpleProduct={isSimpleProduct}
        openChannelsModal={handleChannelsModalOpen}
        onChannelsChange={setCurrentChannels}
        channelsErrors={channelsErrors}
        currentChannels={currentChannels}
        allChannelsCount={allChannels?.length}
        channelsData={channelsData}
        setChannelsData={setChannelsData}
        categories={categories}
        collections={collections}
        attributeValues={attributeValues}
        channelsWithVariantsData={channelsWithVariantsData}
        defaultWeightUnit={shop?.defaultWeightUnit}
        disabled={disableFormSave}
        onSetDefaultVariant={onSetDefaultVariant}
        errors={errors}
        fetchCategories={searchCategories}
        fetchCollections={searchCollections}
        fetchAttributeValues={searchAttributeValues}
        limits={limitOpts.data?.shop.limits}
        saveButtonBarState={formTransitionState}
        media={data?.product?.media}
        header={product?.name}
        placeholderImage={placeholderImg}
        product={product}
        warehouses={/* mapEdgesToItems(warehouses?.data?.warehouses) || */ []}
        taxTypes={data?.taxTypes}
        variants={product?.variants}
        onBack={handleBack}
        onDelete={() => openModal("remove")}
        onImageReorder={handleImageReorder}
        onMediaUrlUpload={handleMediaUrlUpload}
        onSubmit={(formData: ProductUpdatePageSubmitData) => {
          setHaveChannelsWithVariantsChanged(false);
          return handleSubmit(formData);
        }}
        onWarehouseConfigure={() => null /* navigate(warehouseAddPath) */}
        onVariantAdd={handleVariantAdd}
        onVariantsAdd={() => openModal("add-variants")}
        onVariantShow={variantId => () =>
          navigate(productVariantEditUrl(product.id, variantId))}
        onVariantReorder={handleVariantReorder}
        onImageUpload={handleImageUpload}
        onImageEdit={handleImageEdit}
        onImageDelete={handleImageDelete}
        toolbar={
          <IconButton
            className={classes.toolbarIconButton}
            color="primary"
            onClick={() =>
              openModal("remove-variants", {
                ids: listElements
              })
            }
          >
            <DeleteIcon />
          </IconButton>
        }
        isChecked={isSelected}
        selected={listElements.length}
        toggle={toggle}
        toggleAll={toggleAll}
        fetchMoreCategories={fetchMoreCategories}
        fetchMoreCollections={fetchMoreCollections}
        selectedChannelId={channel?.id}
        assignReferencesAttributeId={
          params.action === "assign-attribute-value" && params.id
        }
        onAssignReferencesClick={handleAssignAttributeReferenceClick}
        referencePages={mapEdgesToItems(searchPagesOpts?.data?.search) || []}
        referenceProducts={
          mapEdgesToItems(searchProductsOpts?.data?.search) || []
        }
        fetchReferencePages={searchPages}
        fetchMoreReferencePages={fetchMoreReferencePages}
        fetchReferenceProducts={searchProducts}
        fetchMoreReferenceProducts={fetchMoreReferenceProducts}
        fetchMoreAttributeValues={fetchMoreAttributeValues}
        onCloseDialog={() => navigate(productUrl(id))}
        onAttributeSelectBlur={searchAttributeReset}
        // New ones

        bookableResources={mapEdgesToItems(
          bookableResourcesData?.bookableResources
        )}
        isStripeEnabled={isStripeEnabled}
        hasStripeWarning={hasStripeWarning}
        pageInfo={pageInfo}
        totalCount={bookableResourcesData?.bookableResources.totalCount}
        paymentMethods={mapEdgesToItems(paymentMethodsData?.paymentMethods)}
        params={params}
        openModal={openModal}
        closeModal={closeModal}
        onConfigureStripe={onConfigureStripe}
        onNextPage={loadNextPage}
        onPreviousPage={loadPreviousPage}
        onWarningClose={onWarningClose}
      />
      <ActionDialog
        open={params.action === "remove"}
        onClose={closeModal}
        confirmButtonState={deleteProductOpts.status}
        onConfirm={() => deleteProduct({ variables: { id } })}
        variant="default"
        title={intl.formatMessage(messages.deleteProductDialogTitle)}
      >
        <DialogContentText className={classes.textAlignCenter}>
          <FormattedMessage
            {...messages.deleteProductDialogSubtitle}
            values={{ name: product?.name }}
          />
        </DialogContentText>
      </ActionDialog>
      <ActionDialog
        open={params.action === "remove-variants"}
        onClose={closeModal}
        confirmButtonState={bulkProductVariantDeleteOpts.status}
        onConfirm={() =>
          bulkProductVariantDelete({
            variables: {
              ids: params.ids
            }
          })
        }
        variant="default"
        title={intl.formatMessage(messages.deleteVariantDialogTitle)}
      >
        <DialogContentText className={classes.textAlignCenter}>
          <FormattedMessage
            {...messages.deleteVariantDialogSubtitle}
            values={{
              counter: params?.ids?.length,
              displayQuantity: <strong>{params?.ids?.length}</strong>
            }}
          />
        </DialogContentText>
      </ActionDialog>
      <ProductVariantCreateDialog
        open={params.action === "add-variants"}
        onClose={closeModal}
        onConfirm={option =>
          option === "multiple" ? handleVariantsAdd() : handleVariantAdd()
        }
      />
    </>
  );
};
export default ProductUpdate;
