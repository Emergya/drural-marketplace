import { styled } from "@styles";

export const CloseIcon = styled.div`
  position: absolute;
  top: 1.5%;
  left: 91.5%;
  width: 15px;
  @media (min-width: ${props => props.theme.breakpoints.mediumScreen}) {
    top: 2%;
    left: 96%;
  }
  @media (min-width: ${props => props.theme.breakpoints.largeScreen}) {
    top: 2%;
    left: 96.5%;
  }
`;
export const NavButtons = styled.div`
  position: static;
  @media (min-width: ${props => props.theme.breakpoints.largeScreen}) {
    // position: absolute;
    // bottom: 2%;
    // left: 50%;
    // transform: translate(-50%, 0);
  }
`;

export const LoadingDiv = styled.div`
  .loader {
    height: ${props => props.theme.modal.modalMinHeight / 2}px;
    .loader__items > span {
      background-color: ${props => props.theme.colors.primary};
    }
  }
`;
