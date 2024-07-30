import { styled } from "@styles";

export const AvatarDefault = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.druralGray};
  @media (min-width: ${props => props.theme.breakpoints.mediumScreen}) {
    width: 48px;
    height: 48px;
  }
`;

export const Avatar = styled.div<{ src: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-image: url(${props => props.src});
  background-position: center;
  background-size: cover;
  @media (min-width: ${props => props.theme.breakpoints.mediumScreen}) {
    width: 48px;
    height: 48px;
  }
`;
