import { getFooterColumns } from "@components/organisms/Footer/utils";
import { media, styled } from "@styles";

import { Thumbnail } from "../Thumbnail";

export const Container = styled.div`
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.typography.smallTextFontSize};
`;

export const ContainerInner = styled.div`
  margin-top: 0 !important;
`;

//  Row 1: logo

export const RowLogo = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1.5rem;
  padding-bottom: 1rem;
`;

export const Logo = styled.div`
  svg {
    width: 56px;
    height: 56px;
  }
  ${media.smallScreen`
    svg {
        width: 40px;
        height: 40px;
    }
  `}
`;

export const EuFlag = styled(Thumbnail)`
  border: 2px solid #fff;
  height: 58px;
  margin-left: 1.5rem;
  width: 84px;
`;

// Row 2: links

export const RowLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 1rem;
  text-align: center;
`;

export const LinksColumn = styled.div<{
  colsNum: number;
}>`
  flex-basis: ${props => getFooterColumns(props.colsNum)};
  margin-bottom: 1.5rem;

  ${media.smallScreen`
    flex-basis: 100%;
    padding-bottom: 1.5rem;
  `}
`;

export const LinkTitle = styled.h5`
  font-size: ${props => props.theme.typography.baseFontSize};
  margin-bottom: 12px;
`;

export const PlusIconWrapper = styled.div<{ isOpen?: boolean }>`
  display: flex;
  transition: 0.3s all;
  transform: ${props => (props.isOpen ? "rotate(180deg)" : "")};
`;

export const LinksContent = styled.div``;

export const Link = styled.p`
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 8px;
  }

  &:hover {
    text-decoration: underline;
  }

  a {
    font-weight: ${props => props.theme.typography.normalFontWeight};
    opacity: 0.6;
  }
`;

// Row 3: consotium

export const RowConsorcium = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1.5rem;
  padding-bottom: 2.5rem;
`;

export const ConsorciumParragraph = styled.p`
  text-align: center;
`;

// Row 3: otrhers

export const RowOthers = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 1.125rem;
`;

const OthersColumn = styled.div`
  align-items: center;
  display: flex;
  flex-basis: 33%;

  ${media.smallScreen`
    flex-basis: 100%;
    justify-content: center;
    padding-bottom: 1.5rem;
  `}
`;

export const LanguageSelectorColumn = styled(OthersColumn)`
  margin-left: -12px;
  ${media.smallScreen`
    margin-left: 0px;
  `}
`;

export const PolicyLinksColumn = styled(OthersColumn)`
  justify-content: center;
`;

export const PolicyLink = styled.p`
  cursor: pointer;
  opacity: 0.6;
  text-decoration: underline;

  &:not(:last-child) {
    margin-right: 1.5rem;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const SocialMediaIconsColumn = styled(OthersColumn)`
  justify-content: flex-end;
`;

export const SocialMediaIconWrapper = styled.div`
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 2.75rem;
  }
`;

export const CopyrightColumn = styled(OthersColumn)`
  justify-content: flex-end;
`;

export const Copyright = styled.div`
  font-size: ${props => props.theme.typography.extraSmallTextFontSize};
  opacity: 0.5;
`;
