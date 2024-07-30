import { media, styled } from "@styles";

export const Wrapper = styled.div``;

export const DescriptionWrapper = styled.div`
  padding-bottom: 26px;
`;

export const InfoWrapper = styled.div`
  padding-bottom: 30px;
`;

export const Grid = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(2, 1fr);

  ${media.smallScreen`
    grid-template-columns: repeat(1, 1fr);
  `}
`;

export const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid
    ${props => props.theme.colors.baseFontColorTransparent};
  margin: 0 0 20px 0;
`;

export const Title = styled.h3`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  padding: 0 0 38px 0;
`;

export const Subtitle = styled.p`
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.typography.preTitleFontSize};
  font-weight: ${props => props.theme.typography.boldFontWeight};
  letter-spacing: 0.05em;
  line-height: ${props => props.theme.typography.preTitleLineHeight};
  margin-bottom: 0.5rem;
  text-transform: uppercase;
`;

export const Text = styled.p``;

export const SubTitle = styled.h4`
  padding: 0.6rem 0 1.4rem 0;
  font-size: ${props => props.theme.typography.baseFontSize};
  color: rgba(50, 50, 50, 0.6);
`;

export const TextSummary = styled.p``;

export const ErrorMessages = styled.div`
  margin-top: 30px;
`;
