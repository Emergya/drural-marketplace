import { channelSlug } from "@temp/constants";
import {
  getFeaturedProducts,
  getSaleorApi,
  getShopAttributes,
} from "@utils/ssr";

import { CollectionData } from "./Page";

export type InitialData = ({ id: string } & CollectionData) | undefined | null;

export const getInitialData = async (slug: string): Promise<InitialData> => {
  let data = null;
  const { api } = await getSaleorApi();
  const { data: details } = await api.collections.getDetails({
    slug,
    channel: channelSlug,
  });

  if (details) {
    const { id } = details;

    const [attributes, featuredProducts] = await Promise.all([
      getShopAttributes({ collectionId: id }),
      getFeaturedProducts(),
    ]);
    data = {
      details,
      featuredProducts,
      attributes,
      id,
    };
  }

  return data;
};
