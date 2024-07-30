import { Attribute } from "@graphql/gqlTypes/Attribute";
import { IFilters } from "@types";
import {
  getFeaturedProducts,
  getSaleorApi,
  getShopAttributes,
} from "@utils/ssr";
import { UknownObject } from "@utils/tsUtils";

import { CategoryData } from "./Page";

export type InitialData = ({ id: string } & CategoryData) | undefined | null;

export interface Filters {
  attributes: AttributeList;
  pageSize: number;
  sortBy: string;
  priceLte: number;
  priceGte: number;
}
export interface AttributeList {
  [attributeSlug: string]: string[];
}

export const filtersChangeHandler = (
  filters: IFilters,
  attributeFilters: UknownObject<string[]>,
  setAttributeFilters: (newValue: UknownObject<string[]>) => void
) => (name: string, value: string) => {
  if (attributeFilters && attributeFilters.hasOwnProperty(name)) {
    if (attributeFilters[name].includes(value)) {
      if (filters.attributes[name].length === 1) {
        const att = { ...attributeFilters };
        delete att[name];
        setAttributeFilters({
          ...att,
        });
      } else {
        setAttributeFilters({
          ...attributeFilters,
          [name]: attributeFilters[name].filter(item => item !== value),
        });
      }
    } else {
      setAttributeFilters({
        ...attributeFilters,
        [name]: [...attributeFilters[name], value],
      });
    }
  } else {
    setAttributeFilters({ ...attributeFilters, [name]: [value] });
  }
};

export const getActiveFilterAttributes = (
  filterAttributes: AttributeList | undefined,
  attributes: Attribute[]
) => {
  const getAttribute = (attributeSlug: string, valueSlug: string) => {
    const valueName = attributes
      ?.find(({ slug }) => attributeSlug === slug)
      .choices.edges?.map(({ node }) => node)
      .find(({ slug }) => valueSlug === slug).name;

    return valueName
      ? {
          attributeSlug,
          valueName,
          valueSlug,
        }
      : undefined;
  };

  return (
    filterAttributes &&
    Object.keys(filterAttributes)
      .reduce(
        (acc, key) =>
          acc.concat(
            filterAttributes[key].map(valueSlug => getAttribute(key, valueSlug))
          ),
        []
      )
      .filter(Boolean)
  );
};

export const getInitialData = async (slug: string): Promise<InitialData> => {
  let data = null;
  const { api } = await getSaleorApi();
  const { data: details } = await api.categories.getDetails({ slug });

  if (details) {
    const { id } = details;

    const [attributes, featuredProducts, ancestors] = await Promise.all([
      getShopAttributes({ categoryId: id }),
      getFeaturedProducts(),
      api.categories.getAncestors({ first: 5, id }).then(({ data }) => data),
    ]);
    data = {
      details,
      ancestors,
      featuredProducts,
      attributes,
      id,
    };
  }

  return data;
};
