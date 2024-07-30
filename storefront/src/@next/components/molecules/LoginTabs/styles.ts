import { styled } from "@styles";

import { Button } from "../../atoms/Button";

export const RestyledButton = styled(Button)<{ middleline?: boolean }>`
  border-right: ${props => (props.middleline ? "1px solid #000000" : "none")};
  border-radius: 0;
  height: 22px;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 24px;
  padding-right: 24px;
  width: auto;
  span {
    font-weight: 700;
    text-decoration: ${props =>
      props.color === "labelOnlyPrimary" ? "underline" : "none"};
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;
