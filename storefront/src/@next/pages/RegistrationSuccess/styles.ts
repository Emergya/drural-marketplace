import { styled } from "@styles";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  @media (min-width: ${props => props.theme.breakpoints.smallScreen}) {
    flex-direction: row;
  }
`;

export const ImageDiv = styled.div`
  margin: 0;

  svg {
    height: 224px;
    width: 253px;
  }

  @media (min-width: ${props => props.theme.breakpoints.smallScreen}) {
    margin-right: 85px;
    svg {
      height: 258px;
      width: 292px;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.mediumScreen}) {
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
    .email-title {
      position: absolute;
      top: 96px;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }
  }
`;
