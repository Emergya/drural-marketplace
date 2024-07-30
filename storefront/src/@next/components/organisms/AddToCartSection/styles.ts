import { media, styled } from "@styles";

export const AddToCartSelection = styled.div``;

export const ProductNameHeader = styled.h2`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  margin-bottom: ${props => props.theme.spacing.spacer};
`;

export const MainInfoWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 1.5rem;

  ${media.smallScreen`
    padding-bottom: 1rem;
  `}
`;

export const ButtonsWrapper = styled.div`
  button {
    margin-bottom: 1.5rem;

    ${media.smallScreen`
      margin-bottom: 1rem;  
    `}
  }
`;

export const ReportServiceWrapper = styled.div`
  align-items: center;
  display: flex;
  padding-top: 28px;

  ${media.smallScreen`
    padding-top: 20px;  
  `}

  &:hover {
    button,
    svg {
      color: ${props => props.theme.colors.primary};
    }
  }

  button {
    margin-left: 0.5rem;
  }

  svg {
    color: ${props => props.theme.colors.primaryDark};
  }
`;

export const ProductPricing = styled.h4`
  font-size: 2rem;
  line-height: ${props => props.theme.typography.h2LineHeight};
  font-weight: ${props => props.theme.typography.boldFontWeight};

  ${media.smallScreen`
    font-size: 24px;
    line-height: 32px;
  `}
`;

export const UndiscountedPrice = styled.span`
  text-decoration: line-through;
  color: ${props => props.theme.colors.baseFontColorSemiTransparent};
  font-size: ${props => props.theme.typography.smallFontSize};
`;

export const VariantPicker = styled.div`
  display: grid;

  .react-select-wrapper,
  .input {
    width: 50%;
    margin-bottom: 1rem;
  }
`;

export const QuantityInput = styled.div`
  padding-bottom: 26px;

  ${media.smallScreen`
  padding-bottom: 18px;
  `}

  & > div {
    margin-bottom: 0;
  }
`;

export const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.error};
`;
