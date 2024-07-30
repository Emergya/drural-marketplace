import { getFooterColumns } from "@components/organisms/Footer/utils";
import { media, styled } from "@styles";

export const Container = styled.div`
  background-color: ${props => props.theme.colors.druralGray};
  color: ${props => props.theme.colors.white};
`;

export const ContainerInner = styled.div`
  margin-top: 0 !important;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 3rem;
  padding-bottom: 6px;
  text-align: center;
`;

export const CategoryColumn = styled.div<{
  colsNum: number;
}>`
  flex-basis: ${props => getFooterColumns(props.colsNum)};
  padding-bottom: 2.25rem;

  ${media.smallScreen`
    flex-basis: 100%;
  `}
`;

export const Category = styled.h5`
  margin-bottom: 6px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const SubCategory = styled.p`
  font-size: ${props => props.theme.typography.extraSmallTextFontSize};
  line-height: ${props => props.theme.typography.extraSmallTextLineHeight};
  opacity: 0.6;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  a {
    font-weight: ${props => props.theme.typography.normalFontWeight};
  }
`;
