import { styled } from "@styles";

export const AvatarWrapper = styled.div`
  position: relative;
  padding: 0;
  display: flex;
`;

export const Avatar = styled.div`
  display: flex;
  flex-direction: column
  border-radius: 100%;
  height: 104px;
  width: 104px;
  justify-content: center;
  background-color: ${props => props.theme.colors.druralGray};
  align-items: center;
  overflow: hidden;
  @media (max-width: ${props => props.theme.breakpoints.mediumScreen}) {
    height: 64px;
    width: 64px;
    svg {
      height: 24px;
    }
  }
`;
export const AvatarImage = styled.img`
  width: 100%;
  pointer-events: none;
`;

export const AvatarImageInput = styled.input`
  display: none;
`;
export const AvatarTextContainer = styled.div`
  position: absolute;
  display:flex;
  flex-direction: column
  justify-content: center;
  align-items: center;
  height: 104px;
  width: 104px;
  opacity: 0;
  border-radius: 100%;
  transition: opacity 0.5s
  background-color: rgba( 0 , 0 , 0 , 0.502 );
  &:hover {
    opacity: 1;
  }
  @media (max-width: ${props => props.theme.breakpoints.mediumScreen}) {
    height: 64px;
    width: auto;
    position: static;
    align-items: flex-start;
    opacity: 1;
    background-color: transparent;
    border-radius: 0;
    margin-left: 17px;
    svg {
      display: none;
    }
  }

`;
export const TextAction = styled.p`
  font-size: 12px;
  cursor: pointer;
  color: ${props => props.theme.colors.primaryDark};
  text-transform: uppercase;
  &:hover {
    text-decoration: underline;
  }
  @media (max-width: ${props => props.theme.breakpoints.mediumScreen}) {
    text-transform: none;
    font-weight: ${props => props.theme.typography.boldFontWeight};
  }
`;
