import classNames from "classnames";
import Link from "next/link";
import * as React from "react";
import { generatePath } from "react-router";

import { TaxedMoney } from "@components/containers";
import { Thumbnail } from "@components/molecules";
import { paths } from "@paths";

import * as S from "./styles";
import { EditableProductRowProps, ReadProductRowProps } from "./types";

const ProductRow: React.FC<ReadProductRowProps & EditableProductRowProps> = ({
  mediumScreen,
  processing,
  line,
}) => {
  const productUrl = generatePath(paths.product, { slug: line.product.slug });

  return (
    <tr
      className={classNames({
        "cart-table-row--processing": processing,
      })}
    >
      <S.Td className="cart-table__thumbnail">
        <div>
          {mediumScreen && (
            <Link href={productUrl}>
              <a>
                <S.StyledThumbnail>
                  <Thumbnail source={line.product} />
                </S.StyledThumbnail>
              </a>
            </Link>
          )}
          <Link href={productUrl}>
            <a>{line.product.name}</a>
          </Link>
        </div>
      </S.Td>

      {mediumScreen && (
        <S.Td>
          <TaxedMoney taxedMoney={line.pricing.price} />
        </S.Td>
      )}

      {/* <S.Td>
        {line.attributes.map(({ attribute, values }, attributeIndex) => (
          <p key={attribute.id}>
            {attribute.name}: {values.map(value => value.name).join(", ")}
          </p>
        ))}
      </S.Td> */}

      <S.Td className="cart-table__quantity-cell">
        <p>{line.quantity}</p>
      </S.Td>

      <S.Td colSpan={2}>
        <TaxedMoney taxedMoney={line.totalPrice} />
      </S.Td>
    </tr>
  );
};

export default ProductRow;
