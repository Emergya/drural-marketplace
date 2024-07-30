import Link from "next/link";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { generatePath } from "react-router";

import { FeaturedProduct } from "@graphql/gqlTypes/FeaturedProduct";
import { paths } from "@paths";

import { ProductListItem } from "..";
import * as S from "./styles";

import "./scss/index.scss";

interface ProductsFeaturedProps {
  title: string | undefined;
  products: FeaturedProduct[] | undefined;
  link?: string;
}

export const ProductsFeatured: React.FC<ProductsFeaturedProps> = ({
  title,
  products,
  link,
}) =>
  products?.length ? (
    <div className="products-featured">
      <div className="container">
        <h2>{title}</h2>
        <div className="products-container">
          {products.map(product => (
            <Link
              href={generatePath(paths.product, { slug: product.slug })}
              key={product.id}
            >
              <a>
                <ProductListItem product={product} />
              </a>
            </Link>
          ))}
        </div>
        <div className="products-container" id="more-products-container">
          {/* TODO: slug of link should be changed to featured-services when addapted in Backend */}
          {link ? (
            <Link href={link}>
              <S.MoreProducts id="more-products">
                <FormattedMessage defaultMessage="More" />
              </S.MoreProducts>
            </Link>
          ) : (
            <Link
              href={generatePath(paths.collection, {
                slug: "featured-products",
              })}
            >
              <S.MoreProducts id="more-products">
                <FormattedMessage defaultMessage="More" />
              </S.MoreProducts>
            </Link>
          )}
        </div>
      </div>
    </div>
  ) : null;
