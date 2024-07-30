import { styled } from "@styles";

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  opacity: 0.5;

  &:first-child {
    padding-right: 22px;
  }
`;

export const Dot = styled.div<{
  status: "success" | "error";
}>`
  background-color: ${props =>
    props.status === "success"
      ? props.theme.colors.primary_300
      : props.theme.colors.errorRed_200}
  border-radius: 100px;
  height: 1rem;
  margin-right: 6px;
  width: 1rem;
`;

export const Caption = styled.p``;
