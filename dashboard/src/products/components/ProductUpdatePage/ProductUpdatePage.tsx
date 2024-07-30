import { Backlink } from "@drural/macaw-ui";
import { DialogContentText } from "@material-ui/core";
import {
  getAttributeValuesFromReferences,
  mergeAttributeValues
} from "@saleor/attributes/utils/data";
import ActionDialog from "@saleor/components/ActionDialog";
import AssignAttributeValueDialog from "@saleor/components/AssignAttributeValueDialog";
import Attributes from "@saleor/components/Attributes";
import CardSpacer from "@saleor/components/CardSpacer";
import ChannelsAvailabilityCard from "@saleor/components/ChannelsAvailabilityCard";
import Container from "@saleor/components/Container";
import Grid from "@saleor/components/Grid";
import Hr from "@saleor/components/Hr";
import Metadata from "@saleor/components/Metadata/Metadata";
import PageHeader from "@saleor/components/PageHeader";
import Savebar from "@saleor/components/Savebar";
import SeoForm from "@saleor/components/SeoForm";
import SeoKeywords from "@saleor/components/SeoKeywords";
import StripeWarning from "@saleor/components/StripeWarning";
import useStateFromProps from "@saleor/hooks/useStateFromProps";
import useUser from "@saleor/hooks/useUser";
import { commonMessages, sectionNames } from "@saleor/intl";
import { maybe } from "@saleor/misc";
import ProductExternalMediaDialog from "@saleor/products/components/ProductExternalMediaDialog";
import Title from "@saleor/products/components/ProductUpdatePage/Title";
// import ProductVariantPrice from "@saleor/products/components/ProductVariantPrice";
import { PermissionEnum } from "@saleor/types/globalTypes";
import { mapEdgesToItems } from "@saleor/utils/maps";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import ChannelsWithVariantsAvailabilityCard from "../../../channels/ChannelsWithVariantsAvailabilityCard/ChannelsWithVariantsAvailabilityCard";
import { getChoices } from "../../utils/data";
import ProductBookableResources from "../ProductBookableResources";
import ProductCompany from "../ProductCompany";
import ProductDetailsForm from "../ProductDetailsForm";
import ProductDuration from "../ProductDuration";
import { getDuration } from "../ProductDuration/utils";
import ProductExpandableCard from "../ProductExpandableCard";
import { ProductTypeEnum } from "../ProductExpandableCard/types";
import ProductMedia from "../ProductMedia";
import ProductMethods from "../ProductMethods";
import ProductOrganization from "../ProductOrganization";
import ProductPurchaseEmail from "../ProductPurchaseEmail";
import ProductTaxes from "../ProductTaxes";
import { ProducUrl } from "../ProductUrl";
import ProductVariants from "../ProductVariants";
import ServiceLocation from "../ServiceLocation";
import ProductUpdateForm, {
  ProductUpdateData,
  ProductUpdateHandlers
} from "./form";
import { useStyles } from "./styles";
import { ProductUpdatePageProps } from "./types";

export const ProductUpdatePage: React.FC<ProductUpdatePageProps> = ({
  // defaultWeightUnit,
  disabled,
  categories: categoryChoiceList,
  channelsErrors,
  collections: collectionChoiceList,
  attributeValues,
  isSimpleProduct,
  errors,
  fetchCategories,
  fetchCollections,
  fetchMoreCategories,
  fetchMoreCollections,
  media,
  hasChannelChanged,
  // header,
  limits,
  placeholderImage,
  product,
  saveButtonBarState,
  variants,
  warehouses,
  setChannelsData,
  taxTypes,
  referencePages = [],
  referenceProducts = [],
  onBack,
  onDelete,
  allChannelsCount,
  currentChannels,
  onImageDelete,
  onImageEdit,
  onImageReorder,
  onImageUpload,
  onMediaUrlUpload,
  openChannelsModal,
  onSeoClick,
  onSubmit,
  onVariantAdd,
  channelsData,
  onVariantsAdd,
  onSetDefaultVariant,
  onVariantShow,
  onVariantReorder,
  // onWarehouseConfigure,
  isChecked,
  isMediaUrlModalVisible,
  selected,
  selectedChannelId,
  toggle,
  toggleAll,
  toolbar,
  assignReferencesAttributeId,
  onAssignReferencesClick,
  fetchReferencePages,
  fetchMoreReferencePages,
  fetchReferenceProducts,
  fetchMoreReferenceProducts,
  fetchAttributeValues,
  fetchMoreAttributeValues,
  onCloseDialog,
  channelsWithVariantsData,
  onChannelsChange,
  // New ones
  bookableResources,
  isStripeEnabled,
  hasStripeWarning,
  paymentMethods,
  params,
  pageInfo,
  totalCount,
  openModal,
  closeModal,
  onAttributeSelectBlur,
  onConfigureStripe,
  onNextPage,
  onPreviousPage,
  onWarningClose
}) => {
  const intl = useIntl();
  const classes = useStyles();
  const { user } = useUser();
  const showStripeWarning = user.isSeller && !disabled && hasStripeWarning;

  // const [selectedCategory, setSelectedCategory] = useStateFromProps(
  //   product?.category?.name || ""
  // );

  const [mediaUrlModalStatus, setMediaUrlModalStatus] = useStateFromProps(
    isMediaUrlModalVisible || false
  );

  const [selectedCategories, setSelectedCategories] = useStateFromProps(
    getChoices(maybe(() => mapEdgesToItems(product?.categories), []))
  );

  const [selectedCollections, setSelectedCollections] = useStateFromProps(
    getChoices(maybe(() => product.collections, []))
  );

  const [selectedTaxType, setSelectedTaxType] = useStateFromProps(
    product?.taxType.description
  );

  const categories = getChoices(categoryChoiceList);
  const collections = getChoices(collectionChoiceList);
  const hasVariants = product?.productType?.hasVariants;
  const taxTypeChoices =
    taxTypes?.map(taxType => ({
      label: taxType.description,
      value: taxType.taxCode
    })) || [];

  const canOpenAssignReferencesAttributeDialog = !!assignReferencesAttributeId;

  const handleAssignReferenceAttribute = (
    attributeValues: string[],
    data: ProductUpdateData,
    handlers: ProductUpdateHandlers
  ) => {
    handlers.selectAttributeReference(
      assignReferencesAttributeId,
      mergeAttributeValues(
        assignReferencesAttributeId,
        attributeValues,
        data.attributes
      )
    );
    onCloseDialog();
  };

  return (
    <ProductUpdateForm
      isSimpleProduct={isSimpleProduct}
      currentChannels={currentChannels}
      channelsData={channelsData}
      setChannelsData={setChannelsData}
      onSubmit={onSubmit}
      product={product}
      categories={categories}
      collections={collections}
      channelsWithVariants={channelsWithVariantsData}
      selectedCollections={selectedCollections}
      selectedCategories={selectedCategories}
      setSelectedCategories={setSelectedCategories}
      // setSelectedCategory={setSelectedCategory}
      setSelectedCollections={setSelectedCollections}
      setSelectedTaxType={setSelectedTaxType}
      setChannels={onChannelsChange}
      taxTypes={taxTypeChoices}
      warehouses={warehouses}
      hasVariants={hasVariants}
      referencePages={referencePages}
      referenceProducts={referenceProducts}
      fetchReferencePages={fetchReferencePages}
      fetchMoreReferencePages={fetchMoreReferencePages}
      fetchReferenceProducts={fetchReferenceProducts}
      fetchMoreReferenceProducts={fetchMoreReferenceProducts}
      assignReferencesAttributeId={assignReferencesAttributeId}
    >
      {({
        change,
        data,
        disabled: formDisabled,
        handlers,
        hasChanged,
        submit
      }) => (
        <>
          <Container>
            <Backlink onClick={onBack}>
              {intl.formatMessage(sectionNames.services)}
            </Backlink>
            {showStripeWarning && (
              <StripeWarning
                spacer
                text={intl.formatMessage(commonMessages.stripeWarningText)}
                onClose={onWarningClose}
                onConfigureStripe={onConfigureStripe}
              />
            )}
            <PageHeader
              title={
                <Title isSimpleProduct={isSimpleProduct} product={product} />
              }
              inline
            />
            <Grid>
              <div>
                <ProductDetailsForm
                  data={data}
                  disabled={disabled}
                  isSimpleProduct={isSimpleProduct}
                  isUpdatePage={true}
                  errors={errors}
                  channelsErrors={channelsErrors}
                  onChange={change}
                  onDetailsChange={handlers.changeDetails}
                  onDescriptionChange={handlers.changeDescription}
                  onHasNoPriceChange={() => null}
                  onPriceChange={handlers.changeChannelPrice}
                />
                <CardSpacer />
                <ProductMedia
                  media={media}
                  placeholderImage={placeholderImage}
                  onImageDelete={onImageDelete}
                  onImageReorder={onImageReorder}
                  onImageEdit={onImageEdit}
                  onImageUpload={onImageUpload}
                  openMediaUrlModal={() => setMediaUrlModalStatus(true)}
                />
                <CardSpacer />
                {data.attributes.length > 0 && (
                  <Attributes
                    attributes={data.attributes}
                    attributeValues={attributeValues}
                    errors={errors}
                    loading={disabled}
                    disabled={disabled}
                    onChange={handlers.selectAttribute}
                    onMultiChange={handlers.selectAttributeMultiple}
                    onFileChange={handlers.selectAttributeFile}
                    onReferencesRemove={handlers.selectAttributeReference}
                    onReferencesAddClick={onAssignReferencesClick}
                    onReferencesReorder={handlers.reorderAttributeValue}
                    fetchAttributeValues={fetchAttributeValues}
                    fetchMoreAttributeValues={fetchMoreAttributeValues}
                    onAttributeSelectBlur={onAttributeSelectBlur}
                  />
                )}
                {/* <CardSpacer />
                {isSimpleProduct && (
                  <>
                    <ProductVariantPrice
                      ProductVariantChannelListings={data.channelListings}
                      errors={channelsErrors}
                      loading={disabled}
                      onChange={handlers.changeChannelPrice}
                    />
                    <CardSpacer />
                  </>
                )} */}
                {hasVariants ? (
                  <ProductVariants
                    disabled={disabled}
                    limits={limits}
                    variants={variants}
                    product={product}
                    onRowClick={onVariantShow}
                    onVariantAdd={onVariantAdd}
                    onVariantsAdd={onVariantsAdd}
                    onVariantReorder={onVariantReorder}
                    onSetDefaultVariant={onSetDefaultVariant}
                    toolbar={toolbar}
                    isChecked={isChecked}
                    selected={selected}
                    selectedChannelId={selectedChannelId}
                    toggle={toggle}
                    toggleAll={toggleAll}
                  />
                ) : (
                  <>
                    {/* <ProductShipping
                      data={data}
                      disabled={disabled}
                      errors={errors}
                      weightUnit={product?.weight?.unit || defaultWeightUnit}
                      onChange={change}
                    />
                    <CardSpacer />
                    <ProductStocks
                      data={data}
                      disabled={disabled}
                      hasVariants={false}
                      errors={errors}
                      stocks={data.stocks}
                      warehouses={warehouses}
                      onChange={handlers.changeStock}
                      onFormDataChange={change}
                      onWarehouseStockAdd={handlers.addStock}
                      onWarehouseStockDelete={handlers.deleteStock}
                      onWarehouseConfigure={onWarehouseConfigure}
                    /> */}
                  </>
                )}
                {data.isBillable && (
                  <>
                    <CardSpacer />
                    <ProductExpandableCard
                      checked={data.isBillable}
                      disabled={disabled}
                      label={intl.formatMessage(commonMessages.billableService)}
                      name={ProductTypeEnum.isBillable}
                      readOnly
                      title={intl.formatMessage(
                        commonMessages.paymentConfiguration
                      )}
                    >
                      <ProductMethods
                        data={data}
                        disabled={disabled}
                        isStripeEnabled={isStripeEnabled}
                        methods={paymentMethods}
                        title={intl.formatMessage(
                          commonMessages.paymentMethods
                        )}
                        onMethodChange={handlers.changeMethod}
                      />
                    </ProductExpandableCard>
                  </>
                )}
                {/* TODO - add this card when model is ready */}
                {/* {data.isShippable && (
                  <>
                    <CardSpacer />
                    <ProductConfiguration
                      data={data}
                      disabled={disabled}
                      label={intl.formatMessage(
                        commonMessages.shippableService
                      )}
                      methodsTitle={intl.formatMessage(
                        commonMessages.shippingMethods
                      )}
                      readOnly
                      title={intl.formatMessage(
                        commonMessages.shippingConfiguration
                      )}
                      type={ProductConfigurationTypeEnum.isShipabble}
                      onMethodChange={handlers.changeMethod}
                    />
                  </>
                )} */}
                {data.isBookable && (
                  <>
                    <CardSpacer />
                    <ProductExpandableCard
                      checked={data.isBookable}
                      disabled={disabled}
                      label={intl.formatMessage(commonMessages.bookableService)}
                      name={ProductTypeEnum.isBookable}
                      readOnly
                      title={intl.formatMessage(
                        commonMessages.bookingConfiguration
                      )}
                      onChange={change}
                    >
                      <>
                        <ProductDuration
                          disabled={disabled}
                          duration={getDuration(data.duration)}
                          errors={errors}
                          onDurationChange={handlers.changeDuration}
                        />
                        <Hr />
                        <ProductBookableResources
                          bookableResources={bookableResources}
                          data={data}
                          disabled={disabled}
                          pageInfo={pageInfo}
                          totalCount={totalCount}
                          onBookableResourceChange={
                            handlers.changeBookableResource
                          }
                          onNextPage={onNextPage}
                          onPreviousPage={onPreviousPage}
                          onRowClick={() => undefined}
                        />
                      </>
                    </ProductExpandableCard>
                  </>
                )}
                <CardSpacer />
                <SeoForm
                  errors={errors}
                  title={data.seoTitle}
                  titlePlaceholder={data.name}
                  description={data.seoDescription}
                  descriptionPlaceholder={""} // TODO: cast description to string
                  slug={data.slug}
                  slugPlaceholder={data.name}
                  loading={disabled}
                  onClick={onSeoClick}
                  onChange={change}
                  helperText={intl.formatMessage({
                    defaultMessage:
                      "Add search engine title and description to make this servive easier to find"
                  })}
                />
                <CardSpacer />
                <SeoKeywords
                  keywords={data.keywords}
                  disabled={disabled}
                  onChange={change}
                />
                <CardSpacer />
                <Metadata data={data} onChange={handlers.changeMetadata} />
              </div>
              <div>
                <ProductOrganization
                  // canChangeType={false}
                  categories={categories}
                  categoriesInputDisplayValue={selectedCategories}
                  // categoryInputDisplayValue={selectedCategory}
                  collections={collections}
                  collectionsInputDisplayValue={selectedCollections}
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  fetchCategories={fetchCategories}
                  fetchCollections={fetchCollections}
                  fetchMoreCategories={fetchMoreCategories}
                  fetchMoreCollections={fetchMoreCollections}
                  // productType={product?.productType}
                  isUpdatePage
                  onCategoryChange={handlers.selectCategory}
                  onCollectionChange={handlers.selectCollection}
                />
                <CardSpacer />
                {isSimpleProduct ? (
                  <ChannelsAvailabilityCard
                    managePermissions={[PermissionEnum.MANAGE_PRODUCTS]}
                    messages={{
                      hiddenLabel: intl.formatMessage({
                        defaultMessage: "Not published",
                        description: "product label"
                      }),
                      visibleLabel: intl.formatMessage({
                        defaultMessage: "Published",
                        description: "product label"
                      })
                    }}
                    errors={channelsErrors}
                    selectedChannelsCount={data.channelListings.length}
                    allChannelsCount={allChannelsCount}
                    channels={data.channelListings}
                    disabled={disabled}
                    onChange={handlers.changeChannels}
                    openModal={openChannelsModal}
                  />
                ) : (
                  <ChannelsWithVariantsAvailabilityCard
                    messages={{
                      hiddenLabel: intl.formatMessage({
                        defaultMessage: "Not published",
                        description: "product label",
                        id: "not published channel"
                      }),
                      visibleLabel: intl.formatMessage({
                        defaultMessage: "Published",
                        description: "product label",
                        id: "published channel"
                      })
                    }}
                    errors={channelsErrors}
                    channels={data.channelsData}
                    channelsWithVariantsData={channelsWithVariantsData}
                    variants={variants}
                    onChange={handlers.changeChannels}
                    openModal={openChannelsModal}
                  />
                )}
                <CardSpacer />
                <ProductTaxes
                  data={data}
                  disabled={disabled}
                  selectedTaxTypeDisplayName={selectedTaxType}
                  taxTypes={taxTypes}
                  onChange={change}
                  onTaxTypeChange={handlers.selectTaxRate}
                />
                <CardSpacer />
                <ServiceLocation
                  data={data}
                  errors={errors}
                  disabled={disabled}
                  isProductUpdatePage={true}
                  onChange={change}
                />
                <CardSpacer />
                <ProducUrl
                  url={data.url}
                  disabled={disabled}
                  errors={errors}
                  onChange={change}
                />
                <CardSpacer />
                {(product?.isBillable || product?.isBookable) && (
                  <ProductPurchaseEmail
                    disabled={disabled}
                    hasEmail={!!product?.purchaseEmail}
                    productId={product?.id}
                  />
                )}
                <CardSpacer />
                <ProductCompany
                  company={product?.company}
                  rating={product?.rating}
                />
              </div>
            </Grid>
            <Savebar
              onCancel={onBack}
              onDelete={onDelete}
              onSubmit={() => {
                if (
                  !!product?.channelListings[0]?.isPublished !==
                  data?.channelListings[0]?.isPublished
                ) {
                  openModal("status-change");
                } else {
                  submit();
                }
              }}
              state={saveButtonBarState}
              disabled={
                disabled || formDisabled || (!hasChanged && !hasChannelChanged)
              }
            />
            {canOpenAssignReferencesAttributeDialog && (
              <AssignAttributeValueDialog
                attributeValues={getAttributeValuesFromReferences(
                  assignReferencesAttributeId,
                  data.attributes,
                  referencePages,
                  referenceProducts
                )}
                hasMore={handlers.fetchMoreReferences?.hasMore}
                open={canOpenAssignReferencesAttributeDialog}
                onFetch={handlers.fetchReferences}
                onFetchMore={handlers.fetchMoreReferences?.onFetchMore}
                loading={handlers.fetchMoreReferences?.loading}
                onClose={onCloseDialog}
                onSubmit={attributeValues =>
                  handleAssignReferenceAttribute(
                    attributeValues,
                    data,
                    handlers
                  )
                }
              />
            )}

            <ProductExternalMediaDialog
              product={product}
              onClose={() => setMediaUrlModalStatus(false)}
              open={mediaUrlModalStatus}
              onSubmit={onMediaUrlUpload}
            />

            <ActionDialog
              open={params.action === "status-change"}
              onClose={closeModal}
              confirmButtonState={"success"}
              onConfirm={() => {
                submit();
                closeModal();
              }}
              variant="default"
              title={intl.formatMessage({
                defaultMessage: "Change service status"
              })}
            >
              <DialogContentText className={classes.dialogContent}>
                <FormattedMessage
                  defaultMessage="Are you sure you want {isActive, select, true {activate} other {deactivate}} this service?"
                  values={{
                    isActive: data?.channelListings[0]?.isPublished
                  }}
                />
              </DialogContentText>
            </ActionDialog>
          </Container>
        </>
      )}
    </ProductUpdateForm>
  );
};
ProductUpdatePage.displayName = "ProductUpdatePage";
export default ProductUpdatePage;
