import { styled } from "@styles";

export const Wrapper = styled.div``;

export const ServiceWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1.75rem;
`;

export const BookingWrapper = styled.div``;

export const ImageWrapper = styled.div`
  width: 64px;
  height: 64px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  margin-right: 1rem;

  img {
    object-fit: cover;
    max-width: 170%;
  }
`;

export const ContentWrapper = styled.div`
  padding-top: 0.25rem;
`;

export const InfoWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

export const Photo = styled.div`
  grid-area: photo;
  width: min-content;

  img {
    height: auto;
    max-width: 60px;
  }
`;
export const Sku = styled.div`
  grid-area: sku;
  color: ${props => props.theme.colors.baseFontColorSemiTransparent};
  font-size: ${props => props.theme.typography.smallFontSize};
`;

export const Title = styled.p`
  color: ${props => props.theme.colors.druralGray};
  font-size: ${props => props.theme.typography.preTitleFontSize};
  font-weight: ${props => props.theme.typography.boldFontWeight};
  letter-spacing: 0.05em;
  line-height: ${props => props.theme.typography.preTitleLineHeight};
  margin-bottom: 0.4rem;
  text-transform: uppercase;
`;

export const Text = styled.div`
  font-size: ${props => props.theme.typography.linkFontSize};
  line-height: ${props => props.theme.typography.linkLineHeight};
`;

export const Price = styled.div`
  grid-area: price;
  text-align: right;
  font-size: ${props => props.theme.typography.smallFontSize};
`;
export const Quantity = styled.div`
  grid-area: quantity;
  color: ${props => props.theme.colors.baseFontColorSemiTransparent};
  font-size: ${props => props.theme.typography.smallFontSize};
`;
