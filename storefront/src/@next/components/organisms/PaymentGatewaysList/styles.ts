import { styled } from "@styles";

export const Wrapper = styled.div`
  display: grid;
  grid-gap: 20px;
`;

export const Tile = styled.label<{ checked: boolean }>`
  display: block;
  padding: 20px;
  cursor: pointer;
`;
