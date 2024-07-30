import { styled } from "@styles";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  @media (max-width: ${props => props.theme.breakpoints.smallScreen}) {
    flex-direction: column;
  }
`;

export const ImageDiv = styled.div`
  margin-right: 85px;
  @media (max-width: ${props => props.theme.breakpoints.smallScreen}) {
    margin: 0;
    margin-top: 30px;
  }
`;

export const TextDiv = styled.div`
  display: inherit;
  flex-direction: column;
  gap: 30px;
  width: 30%;
  button {
    width: 220px;
  }
  @media (max-width: ${props => props.theme.breakpoints.smallScreen}) {
    text-align: center;
    width: 100%;
    button {
      align-self: center;
      width: 88%;
    }
  }
`;
