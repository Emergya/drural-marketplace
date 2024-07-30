import React from "react";

import { Loader, NavLink } from "@components/atoms";
import { mapEdgesToItems } from "@utils/misc";

import * as S from "./styles";
import { IProps } from "./types";

export const PreFooter: React.FC<IProps> = ({ categories, loading }) => (
  <S.Container>
    <S.ContainerInner className="container">
      {loading ? (
        <Loader />
      ) : (
        <S.Row>
          {categories.map(({ id, name, slug, children }) => (
            <S.CategoryColumn colsNum={categories.length} key={id}>
              <S.Category>
                <NavLink item={{ name, category: { slug } }} />
              </S.Category>
              {children &&
                mapEdgesToItems(children)?.map(({ id, name, slug }) => (
                  <S.SubCategory key={id}>
                    <NavLink item={{ name, category: { slug } }} />
                  </S.SubCategory>
                ))}
            </S.CategoryColumn>
          ))}
        </S.Row>
      )}
    </S.ContainerInner>
  </S.Container>
);
