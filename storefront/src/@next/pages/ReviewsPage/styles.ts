import { styled } from "@styles";

import arrowImage from "../../../images/dRuralImages/chevron-left.svg";

export const GLobalContainer = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  margin: ${props => props.theme.header.height.desktop} auto;
  @media (max-width: ${props => props.theme.breakpoints.largeScreen}) {
    margin: ${props => props.theme.header.height.mobile} auto;
  }
  @media (max-width: ${props => props.theme.breakpoints.smallScreen}) {
    width: 95%;
  }
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  @media (max-width: ${props => props.theme.breakpoints.largeScreen}) {
    flex-direction: column;
  }
`;

export const Title = styled.h2`
  margin-bottom: 30px;
`;

export const Wrapper = styled.div`
  box-shadow: ${props => props.theme.boxShadow.light};
  background-color: ${props => props.theme.colors.white};
  height: fit-content;
  flex: 1;

  max-width: 65%;
  padding: 32px;
  @media (max-width: ${props => props.theme.breakpoints.largeScreen}) {
    max-width: 100%;
  }
`;
export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const ServiceTileWrapper = styled.div`
  max-width: 33%;
  flex: 1;
  margin-bottom: 16px;
  box-shadow: ${props => props.theme.boxShadow.light};
  background-color: ${props => props.theme.colors.white};
  height: fit-content;
  @media (max-width: ${props => props.theme.breakpoints.largeScreen}) {
    max-width: min(100%, 500px);
  }
`;

export const ServiceTile = styled.div`
  display: flex;
  justify-content: flex-start;

  background-color: ${props => props.theme.colors.white};
  flex: 1;
  position: relative;
  align-items: center;
  height: 96px;
  padding: 16px 32px 16px 32px;
  &:before {
    content: "";
    position: absolute;
    left: 5%;
    bottom: 0;
    height: 1px;
    width: 90%;
    border-bottom: 1px solid ${props => props.theme.colors.druralGray_100};
  }
`;

export const ServiceTileText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ServiceTileTitle = styled.p`
  font-weight: ${props => props.theme.typography.semiBoldFontWeight};
  line-height: ${props => props.theme.typography.h3LineHeight};
`;

export const ServiceTileShopǸame = styled.p`
  display: flex;
  align-items: center;
  font-size: ${props => props.theme.typography.smallFontSize};
  color: ${props => props.theme.colors.druralGray};
  line-height: ${props => props.theme.typography.h5LineHeight};
  > svg {
    margin-right: 6px;
    color: ${props => props.theme.colors.druralGray_400};
  }
`;

export const Image = styled.div`
  display: flex;
  width: 64px;
  height: 64px;
  margin-right: 1rem;
  > img {
    object-fit: cover;
    width: 64px;
    height: 64px;
  }
`;

export const ListInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Link = styled.a`
  align-items: center;
  color: ${props => props.theme.colors.primaryDark};
  display: inline-flex;
  font-size: ${props => props.theme.typography.smallFontSize};
  font-weight: ${props => props.theme.typography.extraBoldFontWeight};
  text-decoration: underline;
  cursor: pointer;
  margin-top: 33px;
  margin-bottom: 15px;
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
  &:before {
    content: url(${arrowImage});
    display: inline-block;
    height: 18px;
  }
`;
