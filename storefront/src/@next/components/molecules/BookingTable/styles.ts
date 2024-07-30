import { styled } from "@styles";

export const Title = styled.h3`
  margin-bottom: 22px;
`;

export const Table = styled.table`
  margin: 0;
`;

export const THead = styled.thead``;

export const TBody = styled.tbody`
  & tr:last-child {
    border-bottom: none;
  }
`;

export const Th = styled.th`
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.typography.baseFontSize};
  line-height: ${props => props.theme.typography.baseLineHeight};

  &:not(:fist-child):not(last-child) {
    padding: 1rem;
  }

  &:first-child {
    padding: 1rem 1rem 1rem 24px;
  }

  &:last-child {
    padding: 1rem 24px 1rem 1rem;
    text-align: right;
  }
`;

export const NameTh = styled(Th)`
  width: 25%;
`;

export const DateTh = styled(Th)`
  width: 20%;
`;

export const Td = styled.td`
  color: ${props => props.theme.colors.druralGray};
  font-size: ${props => props.theme.typography.baseFontSize};
  line-height: ${props => props.theme.typography.baseLineHeight};

  &:not(:fist-child):not(last-child) {
    padding: 1rem;
  }

  &:first-child {
    padding: 1rem 1rem 1rem 24px;
  }

  &:last-child {
    padding: 1rem 24px 1rem 1rem;
    text-align: right;
  }
`;

export const NameTd = styled(Td)`
  width: 25%;
`;

export const DateTd = styled(Td)`
  width: 20%;
`;
