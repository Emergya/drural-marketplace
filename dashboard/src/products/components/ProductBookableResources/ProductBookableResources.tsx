import { CardContent, Typography } from "@material-ui/core";
import Hr from "@saleor/components/Hr";
import { sectionNames } from "@saleor/intl";
import ProductBookableResourceList from "@saleor/products/components/ProductBookableResourceList";
import React from "react";
import { useIntl } from "react-intl";

import ProductBookableResourceListEmpty from "../ProductBookableResourceListEmpty";
import { useStyles } from "./styles";
import { ProductBookableResourcesProps } from "./types";

export const ProductBookableResources: React.FC<ProductBookableResourcesProps> = ({
  bookableResources,
  data,
  disabled,
  pageInfo,
  totalCount,
  onBookableResourceChange,
  onNextPage,
  onPreviousPage,
  onRowClick
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const hasResources = !!bookableResources?.length;

  return (
    <>
      <CardContent>
        <Typography className={classes.title} variant="body1">
          {intl.formatMessage(sectionNames.bookableResources)}
        </Typography>
        {!hasResources ? (
          <ProductBookableResourceListEmpty />
        ) : (
          <Typography className={classes.text} variant="body2">
            {intl.formatMessage({
              defaultMessage:
                "Select the bookable resources you want to add to this service."
            })}
          </Typography>
        )}
      </CardContent>
      {hasResources && (
        <>
          <Hr />
          <ProductBookableResourceList
            bookableResources={bookableResources}
            data={data}
            disabled={disabled}
            pageInfo={pageInfo}
            totalCount={totalCount}
            onBookableResourceChange={onBookableResourceChange}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
            onRowClick={onRowClick}
          />
        </>
      )}
    </>
  );
};
ProductBookableResources.displayName = "ProductBookableResources";
export default ProductBookableResources;
