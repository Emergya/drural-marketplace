import { IFilterAttribute, IFilters } from "@types";

export const checkIfAttributeIsChecked = (
  filters: IFilters,
  value: IFilterAttribute,
  slug: string
) => {
  if (filters!.attributes && filters.attributes.hasOwnProperty(slug)) {
    if (filters.attributes[slug].find(filter => filter === value.slug)) {
      return true;
    }
    return false;
  }
  return false;
};

export const MARKER_OPTIONS = { color: "#3CDCAA" };
