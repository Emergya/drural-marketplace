import {
  OrderDirection,
  ProductRatingSortingField,
  ProductRatingSortingInput,
} from "gqlTypes/globalTypes";

export const convertSortByFromStringReviews = (
  sortBy: string
): ProductRatingSortingInput | null => {
  if (!sortBy) {
    return null;
  }

  const direction = sortBy.startsWith("-")
    ? OrderDirection.DESC
    : OrderDirection.ASC;

  let field;

  switch (sortBy.replace(/^-/, "")) {
    case ProductRatingSortingField.RATING:
      field = ProductRatingSortingField.RATING;
      break;

    case ProductRatingSortingField.DATE:
      field = ProductRatingSortingField.DATE;
      break;

    default:
      return null;
  }
  return { field, direction };
};
