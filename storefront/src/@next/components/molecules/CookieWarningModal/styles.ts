import { CSSProperties } from "react";

import { styled } from "@styles";

export const lightboxStyles: CSSProperties = {
  minHeight: "auto",
  width: 640,
};

export const contentStyles: CSSProperties = {
  maxHeight: "74vh",
  overflowY: "scroll",
  paddingTop: "3rem",
};

export const ContentWrapper = styled.div``;

export const GroupWrapper = styled.div`
  margin-bottom: 3rem;
`;

export const Title = styled.h3`
  margin-bottom: 1rem;
`;

export const Description = styled.p`
  font-size: ${props => props.theme.typography.smallFontSize};
  margin-bottom: 1rem;
`;

export const Table = styled.table`
  margin: 0;
`;

export const THead = styled.thead``;

export const Th = styled.th`
  padding: 0.5rem;
`;

export const SwitchTh = styled(Th)`
  text-align: right;
`;

export const TBody = styled.tbody``;

export const Td = styled.td`
  padding: 0.5rem;
`;

export const SwitchTd = styled(Td)`
  text-align: right;
`;

export const StyledSwitchInput = styled.div`
  button {
    scale: 0.8;
  }
`;
