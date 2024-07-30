import { Button } from "@components/atoms";
import { media, styled } from "@styles";

// 1. Wrappers
export const Container = styled.div``;

export const HeaderWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-bottom: 2rem;
  ${media.smallScreen`
    padding-bottom: 1rem;
  `}
`;

export const ContentWrapper = styled.div`
  margin-top: 40px;

  ${media.smallScreen`
    margin-top: 0;
  `}
`;
export const SelectWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 30px;
  @media (max-width: ${props => props.theme.breakpoints.mediumScreen}) {
    flex-direction: column;
  }
  @media (max-width: ${props => props.theme.breakpoints.smallScreen}) {
    margin-bottom: 0;
  }
`;
export const SelectOrderFilter = styled.div`
  width: 30%;
  padding-right: 24px;
  @media (max-width: ${props => props.theme.breakpoints.mediumScreen}) {
    width: 256px;
  }
`;
export const SelectTitle = styled.div`
  font-size: ${props => props.theme.typography.extraSmallTextFontSize};
  font-weight: ${props => props.theme.typography.boldFontWeight};
  color: ${props => props.theme.colors.druralGray};
  letter-spacing: 0.05em;
`;

export const ReviewsWrapper = styled.div`
  max-width: 95%;
  overflow-wrap: break-word;
`;

export const ReviewTile = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const ReviewsTable = styled.table`
  margin: 0;

  tr {
    border-bottom: 0;

    td img {
      margin-right: 0;
    }
  }
`;

export const TableHead = styled.thead`
  padding-bottom: 1.5rem;
`;

export const TableBody = styled.tbody`
  tr:first-child {
    td {
      padding-top: 1.5rem;
    }
  }
`;

export const TableRow = styled.tr`
  th:first-child,
  td:first-child {
    width: 29%;
  }

  th:first-child {
    padding: 0 12px 8px 0;
  }

  th:last-child {
    padding: 0 0 8px 12px;
  }

  td:first-child {
    padding: 0 12px 0 0;
  }

  td:last-child {
    padding: 0 0 0 12px;
  }
`;

export const HeadCell = styled.th`
  border-bottom: 1px solid ${props => props.theme.colors.druralGray_100};
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.typography.baseFontSize};
  font-weight: ${props => props.theme.typography.semiBoldFontWeight};
  line-height: ${props => props.theme.typography.baseLineHeight};
`;

export const DataCell = styled.td`
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.typography.baseFontSize};
  line-height: ${props => props.theme.typography.baseLineHeight};
  vertical-align: baseline;
`;

export const DataCellProduct = styled(DataCell)`
  font-weight: ${props => props.theme.typography.semiBoldFontWeight};
`;

export const DataCellReview = styled(DataCell)`
  font-weight: ${props => props.theme.typography.normalFontWeight};
`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  position: relative;
  margin: 0 auto;
  &:before {
    content: "";
    position: absolute;
    left: 1%;
    bottom: 0;
    height: 1px;
    width: 98%;
    border-bottom: 1px solid ${props => props.theme.colors.druralGray_100};
  }
`;

export const FooterWrapper = styled.div``;

// 2. Typografy
export const Title = styled.h3``;

export const StyledButton = styled(Button)`
  margin-bottom: 38px;
  width: 30%;
  min-width: 225px;

  @media (max-width: ${props => props.theme.breakpoints.largeScreen}) {
    width: 50%;
  }
  @media (max-width: ${props => props.theme.breakpoints.mediumScreen}) {
    width: 100%;
  }
  ${media.smallScreen`
    margin-bottom: 26px;
    width: 100%;
  `}
`;

export const DeleteIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  height: 38px;
  width: 38px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  > svg {
    color: ${props => props.theme.colors.primaryDark};
  }
  &:hover {
    background-color: ${props => props.theme.colors.primaryLight};
  }
`;
