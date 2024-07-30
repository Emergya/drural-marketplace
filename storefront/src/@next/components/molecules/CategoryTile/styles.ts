import { media, styled } from "@styles";

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  transition: 0.3s;

  ${media.largeScreen`
    padding: 1rem;
  `}
`;

export const IconWrapper = styled.div<{
  iconBackgroundSize?: number;
}>`
  background-color: ${props => props.theme.colors.primaryTransparent};
  align-items: center;

  border-radius: 100px;
  display: flex;
  justify-content: center;
  height: ${props =>
    props.iconBackgroundSize ? props.iconBackgroundSize : 64}px;
  width: ${props =>
    props.iconBackgroundSize ? props.iconBackgroundSize : 64}px;

  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

export const ImageWrapper = styled.div`
  border-radius: 50%;
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  width: 144px;

  > img {
    flex-grow: 1;
    height: 144px;
    object-fit: contain;
  }
`;

export const Title = styled.h4`
  font-weight: ${props => props.theme.typography.semiBoldFontWeight};
  font-size: ${props => props.theme.typography.baseFontSize};
  margin-top: ${props => props.theme.typography.thumbTitleSpace};
`;
