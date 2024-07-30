import { styled } from "@styles";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const ImageDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 65px;
  margin-right: 13px;
  margin-left: 13px;
    button {
      padding:0;
    }
  }
`;
export const Image = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  &.service-sell {
    background-color: #fde6c6;
  }
  &.service-buy {
    background-color: #23c290;
  }

  svg {
    height: 184px;
    width: 184px;
    margin-bottom: -20px;
    margin-top: -20px;
  }

  @media (min-width: ${props => props.theme.breakpoints.smallScreen}) {
    svg {
      height: 288px;
      width: 305px;
    }
  }
  @media (min-width: ${props => props.theme.breakpoints.mediumScreen}) {
    svg {
      height: 288px;
      width: 380px;
    }
  }
`;

export const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: ${props => props.theme.breakpoints.smallScreen}) {
    text-align: center;
    width: 100%;
  }
`;

export const ImagesWrapper = styled.div`
  display: flex;
  width: 80vw;
  justify-content: space-around;
`;
