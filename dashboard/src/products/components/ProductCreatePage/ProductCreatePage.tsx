import { Backlink } from "@drural/macaw-ui";
import CardSpacer from "@saleor/components/CardSpacer";
import Container from "@saleor/components/Container";
import Grid from "@saleor/components/Grid";
import Hr from "@saleor/components/Hr";
import { MultiAutocompleteChoiceType } from "@saleor/components/MultiAutocompleteSelectField";
import PageHeader from "@saleor/components/PageHeader";
import Savebar from "@saleor/components/Savebar";
import StripeWarning from "@saleor/components/StripeWarning";
import useStateFromProps from "@saleor/hooks/useStateFromProps";
import useUser from "@saleor/hooks/useUser";
import { commonMessages, sectionNames } from "@saleor/intl";
import {} from "@saleor/products";
import { getChoices } from "@saleor/products/utils/data";
import React from "react";
import { useIntl } from "react-intl";

import ProductBookableResources from "../ProductBookableResources";
import ProductDetailsForm from "../ProductDetailsForm";
import ProductDuration from "../ProductDuration";
import { getDuration } from "../ProductDuration/utils";
import ProductExpandableCard from "../ProductExpandableCard";
import { ProductTypeEnum } from "../ProductExpandableCard/types";
import ProductMethods from "../ProductMethods";
import ProductOrganization from "../ProductOrganization";
import { ProducUrl } from "../ProductUrl";
import ServiceLocation from "../ServiceLocation";
import ProductCreateForm from "./form";
import { IProductCreatePageProps } from "./types";

export const ProductCreatePage: React.FC<IProductCreatePageProps> = ({
  activeBusiness,
  bookableResources,
  currentChannels,
  loading,
  categories: categoryChoiceList,
  collections: collectionChoiceList,
  errors,
  channelsErrors,
  paymentMethods,
  fetchCategories,
  fetchCollections,
  fetchMoreCategories,
  fetchMoreCollections,
  isStripeEnabled,
  hasStripeWarning,
  header,
  initial,
  pageInfo,
  saveButtonBarState,
  totalCount,
  onBack,
  onChannelsChange,
  onConfigureStripe,
  onNextPage,
  onPreviousPage,
  onSubmit,
  onWarningClose
}) => {
  const intl = useIntl();
  const { user } = useUser();
  const showStripeWarning = user.isSeller && !loading && hasStripeWarning;

  // Display values
  const [selectedCategories, setSelectedCategories] = useStateFromProps<
    MultiAutocompleteChoiceType[]
  >([]);

  const [selectedCollections, setSelectedCollections] = useStateFromProps<
    MultiAutocompleteChoiceType[]
  >([]);

  const categories = getChoices(categoryChoiceList);
  const collections = getChoices(collectionChoiceList);

  return (
    <ProductCreateForm
      onSubmit={onSubmit}
      initial={initial}
      categories={categories}
      collections={collections}
      selectedCollections={selectedCollections}
      selectedCategories={selectedCategories}
      setSelectedCategories={setSelectedCategories}
      setSelectedCollections={setSelectedCollections}
      setChannels={onChannelsChange}
      currentChannels={currentChannels}
      activeBusiness={activeBusiness}
    >
      {({
        change,
        data,
        disabled: formDisabled,
        handlers,
        hasChanged,
        submit
      }) => {
        // Simple product is set to true untill we start managing variants.
        // Comparing explicitly to false because `hasVariants` can be undefined
        // const isSimpleProduct = data.productType?.hasVariants === false;
        const isSimpleProduct = true;

        return (
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
            <PageHeader title={header} />
            <Grid>
              <div>
                <ProductDetailsForm
                  data={data}
                  disabled={loading}
                  isSimpleProduct={isSimpleProduct}
                  errors={errors}
                  channelsErrors={channelsErrors}
                  onChange={change}
                  onDescriptionChange={handlers.changeDescription}
                  onDetailsChange={handlers.changeDetails}
                  onHasNoPriceChange={handlers.changeHasNoPrice}
                  onPriceChange={handlers.changeChannelPrice}
                />
                <CardSpacer />
                <ProductExpandableCard
                  checked={data.isBillable}
                  disabled={loading || data.hasNoPrice}
                  label={intl.formatMessage(commonMessages.billableService)}
                  name={ProductTypeEnum.isBillable}
                  title={intl.formatMessage(
                    commonMessages.paymentConfiguration
                  )}
                  onChange={change}
                >
                  {data.isBillable && (
                    <ProductMethods
                      data={data}
                      disabled={loading}
                      isStripeEnabled={isStripeEnabled}
                      methods={paymentMethods}
                      title={intl.formatMessage(commonMessages.paymentMethods)}
                      onMethodChange={handlers.changeMethod}
                    />
                  )}
                </ProductExpandableCard>
                <CardSpacer />
                <ProductExpandableCard
                  checked={data.isBookable}
                  disabled={loading}
                  label={intl.formatMessage(commonMessages.bookableService)}
                  name={ProductTypeEnum.isBookable}
                  title={intl.formatMessage(
                    commonMessages.bookingConfiguration
                  )}
                  onChange={change}
                >
                  {data.isBookable && (
                    <>
                      <ProductDuration
                        disabled={loading}
                        duration={getDuration(data.duration)}
                        errors={errors}
                        onDurationChange={handlers.changeDuration}
                      />
                      <Hr />
                      <ProductBookableResources
                        bookableResources={bookableResources}
                        data={data}
                        disabled={loading}
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
                  )}
                </ProductExpandableCard>
              </div>
              <div>
                <ProductOrganization
                  data={data}
                  disabled={loading}
                  errors={errors}
                  categories={categories}
                  collections={collections}
                  categoriesInputDisplayValue={selectedCategories}
                  collectionsInputDisplayValue={selectedCollections}
                  onCategoryChange={handlers.selectCategory}
                  onCollectionChange={handlers.selectCollection}
                  fetchCategories={fetchCategories}
                  fetchCollections={fetchCollections}
                  fetchMoreCategories={fetchMoreCategories}
                  fetchMoreCollections={fetchMoreCollections}
                />
                <CardSpacer />
                <ServiceLocation
                  data={data}
                  errors={errors}
                  disabled={loading}
                  onChange={change}
                />
                <CardSpacer />
                <ProducUrl
                  url={data.url}
                  disabled={loading}
                  errors={errors}
                  onChange={change}
                />
              </div>
            </Grid>

            <Savebar
              onCancel={onBack}
              onSubmit={submit}
              state={saveButtonBarState}
              disabled={loading || !onSubmit || formDisabled || !hasChanged}
            />
          </Container>
        );
      }}
    </ProductCreateForm>
  );
};
ProductCreatePage.displayName = "ProductCreatePage";
export default ProductCreatePage;
