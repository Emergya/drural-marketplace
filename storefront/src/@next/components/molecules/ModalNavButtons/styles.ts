import { styled } from "@styles";

import { Button } from "../../atoms/Button";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px;
`;

export const RestyledButton = styled(Button)`
  margin-left: 8px;
  margin-right: 8px;
  width: auto;
`;
