import { makeStyles } from "@drural/macaw-ui";
import Hr from "@saleor/components/Hr";
import RadioGroupField, {
  RadioGroupFieldChoice
} from "@saleor/components/RadioGroupField";
import { ExportErrorFragment } from "@saleor/fragments/types/ExportErrorFragment";
import { ChangeEvent } from "@saleor/hooks/useForm";
import useUser from "@saleor/hooks/useUser";
import {
  ExportProductsInput,
  ExportScope,
  FileTypesEnum
} from "@saleor/types/globalTypes";
import { getFormErrors } from "@saleor/utils/errors";
import getExportErrorMessage from "@saleor/utils/errors/export";
import React from "react";
import { useIntl } from "react-intl";

const useStyles = makeStyles(
  theme => ({
    hr: {
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(3)
    }
  }),
  {
    name: "ProductExportDialogSettings"
  }
);

export type ProductQuantity = Record<"all" | "filter", number>;
export interface ProductExportDialogSettingsProps {
  data: ExportProductsInput;
  errors: ExportErrorFragment[];
  productQuantity: ProductQuantity;
  selectedProducts: number;
  onChange: (event: ChangeEvent) => void;
}

const formFields: Array<keyof ExportProductsInput> = ["fileType", "scope"];

const ProductExportDialogSettings: React.FC<ProductExportDialogSettingsProps> = ({
  data,
  errors,
  onChange,
  productQuantity,
  selectedProducts
}) => {
  const { user } = useUser();
  const classes = useStyles({});
  const intl = useIntl();

  const formErrors = getFormErrors(formFields, errors);

  const exportAllProductsChoice: RadioGroupFieldChoice<ExportScope> = {
    label: intl.formatMessage(
      {
        defaultMessage: "All services ({number})",
        description: "export all services to csv file"
      },
      {
        number: productQuantity.all || "..."
      }
    ),
    value: ExportScope.ALL
  };

  const exportFilterProductsChioce: RadioGroupFieldChoice<ExportScope> = {
    disabled: selectedProducts === 0,
    label: intl.formatMessage(
      {
        defaultMessage: "Selected services ({number})",
        description: "export selected services to csv file"
      },
      {
        number: selectedProducts
      }
    ),
    value: ExportScope.IDS
  };

  const exportProductsByIdChoice: RadioGroupFieldChoice<ExportScope> = {
    label: intl.formatMessage(
      {
        defaultMessage: "Current search ({number})",
        description: "export filtered services to csv file"
      },
      {
        number: productQuantity.filter || "..."
      }
    ),
    value: ExportScope.FILTER
  };

  const productsToExportChoices: Array<RadioGroupFieldChoice<
    ExportScope
  >> = user.isStaff
    ? [
        exportAllProductsChoice,
        exportFilterProductsChioce,
        exportProductsByIdChoice
      ]
    : [exportFilterProductsChioce, exportProductsByIdChoice];

  const productExportTypeChoices: Array<RadioGroupFieldChoice<
    FileTypesEnum
  >> = [
    {
      label: intl.formatMessage({
        defaultMessage: "Spreadsheet for Excel, Numbers etc.",
        description: "export services as spreadsheet"
      }),
      value: FileTypesEnum.XLSX
    },
    {
      label: intl.formatMessage({
        defaultMessage: "Plain CSV file",
        description: "export services as csv file"
      }),
      value: FileTypesEnum.CSV
    }
  ];

  return (
    <>
      <RadioGroupField
        choices={productsToExportChoices}
        error={!!formErrors.scope}
        hint={getExportErrorMessage(formErrors.scope, intl)}
        label={intl.formatMessage({
          defaultMessage: "Export information for:",
          description: "export services to csv file, choice field label"
        })}
        name={"scope" as keyof ExportProductsInput}
        onChange={onChange}
        value={data.scope}
      />
      <Hr className={classes.hr} />
      <RadioGroupField
        choices={productExportTypeChoices}
        error={!!formErrors.fileType}
        hint={getExportErrorMessage(formErrors.fileType, intl)}
        label={intl.formatMessage({
          defaultMessage: "Export as:",
          description: "export services as csv or spreadsheet file"
        })}
        name={"fileType" as keyof ExportProductsInput}
        onChange={onChange}
        value={data.fileType}
      />
    </>
  );
};

ProductExportDialogSettings.displayName = "ProductExportDialogSettings";
export default ProductExportDialogSettings;
