import {
  ProductDetails_product_thumbnail,
  ProductDetails_product_thumbnail2x,
} from "@drural/sdk/lib/queries/gqlTypes/ProductDetails";

export interface ISource {
  thumbnail?: Omit<ProductDetails_product_thumbnail, "__typename"> | null;
  thumbnail2x?: Omit<ProductDetails_product_thumbnail2x, "__typename"> | null;
}

export interface IProps {
  source: ISource;
  noPhotoDefault?: boolean;
  children?: any;
}
