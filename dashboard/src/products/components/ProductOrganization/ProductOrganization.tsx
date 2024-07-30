import { makeStyles } from "@drural/macaw-ui";
import { Card, CardContent } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import { FormSpacer } from "@saleor/components/FormSpacer";
import MultiAutocompleteSelectField, {
  MultiAutocompleteChoiceType
} from "@saleor/components/MultiAutocompleteSelectField";
import StaticAutocompleteData from "@saleor/components/StaticAutocompleteData";
import { ProductErrorFragment } from "@saleor/fragments/types/ProductErrorFragment";
import { ChangeEvent } from "@saleor/hooks/useForm";
import useUser from "@saleor/hooks/useUser";
import { FetchMoreProps } from "@saleor/types";
import { getFormErrors, getProductErrorMessage } from "@saleor/utils/errors";
import React from "react";
import { useIntl } from "react-intl";

interface ProductType {
  hasVariants: boolean;
  id: string;
  name: string;
}

const useStyles = makeStyles(
  theme => ({
    card: {
      overflow: "visible"
    },
    cardContent: {
      // "& div:nth-child(1)": {
      //   paddingBottom: 0
      // },
      "& div:nth-child(2)": {
        marginTop: 0
      }
    },
    cardSubtitle: {
      fontSize: theme.typography.body1.fontSize,
      marginBottom: theme.spacing(0.5)
    },
    label: {
      marginBottom: theme.spacing(0.5)
    }
  }),
  { name: "ProductOrganization" }
);

interface ProductOrganizationProps {
  categories?: MultiAutocompleteChoiceType[];
  categoriesInputDisplayValue: MultiAutocompleteChoiceType[];
  collections?: MultiAutocompleteChoiceType[];
  collectionsInputDisplayValue: MultiAutocompleteChoiceType[];
  data: {
    categories: string[];
    collections: string[];
    productType?: ProductType;
  };
  disabled: boolean;
  errors: ProductErrorFragment[];
  fetchCategories: (query: string) => void;
  fetchCollections: (query: string) => void;
  fetchMoreCategories: FetchMoreProps;
  fetchMoreCollections: FetchMoreProps;
  isUpdatePage?: boolean;
  onCategoryChange: (event: ChangeEvent) => void;
  onCollectionChange: (event: ChangeEvent) => void;
}

const ProductOrganization: React.FC<ProductOrganizationProps> = props => {
  const {
    categories,
    categoriesInputDisplayValue,
    collections,
    collectionsInputDisplayValue,
    data,
    disabled,
    errors,
    fetchCategories,
    fetchCollections,
    fetchMoreCategories,
    fetchMoreCollections,
    isUpdatePage,
    onCategoryChange,
    onCollectionChange
  } = props;

  const classes = useStyles(props);
  const intl = useIntl();
  const { user } = useUser();

  const formErrors = getFormErrors(
    ["productType", "category", "collections"],
    errors
  );

  return (
    <Card className={classes.card}>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Organize Service",
          description: "section header"
        })}
      />
      <CardContent className={classes.cardContent}>
        <MultiAutocompleteSelectField
          displayValues={categoriesInputDisplayValue}
          error={!!formErrors.category}
          label={intl.formatMessage({
            defaultMessage: "Categories"
          })}
          choices={disabled ? [] : categories}
          name="categories"
          value={data.categories}
          helperText={getProductErrorMessage(formErrors.category, intl)}
          onChange={onCategoryChange}
          fetchChoices={fetchCategories}
          data-test="categories"
          required
          {...fetchMoreCategories}
        />
        {user.isStaff ? (
          <>
            <FormSpacer />
            <MultiAutocompleteSelectField
              displayValues={collectionsInputDisplayValue}
              error={!!formErrors.collections}
              label={intl.formatMessage({
                defaultMessage: "Collections"
              })}
              choices={disabled ? [] : collections}
              name="collections"
              value={data.collections}
              helperText={
                getProductErrorMessage(formErrors.collections, intl) ||
                intl.formatMessage({
                  defaultMessage:
                    "Optional. Adding service to collection helps users find it.",
                  description: "field is optional"
                })
              }
              cardColor="secondary"
              onChange={onCollectionChange}
              fetchChoices={fetchCollections}
              data-test="collections"
              testId="collection"
              {...fetchMoreCollections}
            />
          </>
        ) : isUpdatePage && collectionsInputDisplayValue.length > 0 ? (
          <>
            <FormSpacer />
            <StaticAutocompleteData
              displayValues={collectionsInputDisplayValue}
              cardColor="secondary"
            />
          </>
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
};
ProductOrganization.displayName = "ProductOrganization";
export default ProductOrganization;
