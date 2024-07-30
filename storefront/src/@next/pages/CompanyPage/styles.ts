import { Button, Separator } from "@components/atoms";
import { styled } from "@styles";

// 1. Wrappers
export const SpaceRow = styled.section`
  margin-top: 80px;

  @media (max-width: ${props => props.theme.breakpoints.smallScreen}) {
    margin-top: 56px;
  }
`;

export const TabsRow = styled.section`
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};

  & > div {
    margin-top: 0;
  }
`;

export const DetailsRow = styled.section`
  padding-top: 56px;
  padding-bottom: 54px;

  & > div {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0;
  }

  @media (max-width: ${props => props.theme.breakpoints.smallScreen}) {
    display: block;

    padding-top: 3rem;
    padding-bottom: 3rem;
  }
`;

export const DetailsColumn = styled.div`
  &:first-child {
    flex-basis: 28%;

    @media (max-width: ${props => props.theme.breakpoints.largeScreen}) {
      flex-basis: 38%;
    }

    @media (max-width: ${props => props.theme.breakpoints.mediumScreen}) {
      flex-basis: 100%;
    }
  }

  &:last-child {
    display: flex;
    flex-basis: 65%;
    flex-wrap: wrap;
    width: fit-content;

    @media (max-width: ${props => props.theme.breakpoints.largeScreen}) {
      flex-basis: 54%;
    }

    @media (max-width: ${props => props.theme.breakpoints.mediumScreen}) {
      flex-basis: 100%;
    }
  }
`;

export const ContentRow = styled.section`
  background-color: ${props => props.theme.colors.white};
  padding-top: 66px;
  padding-bottom: 80px;

  & > div {
    margin-top: 0;
  }

  @media (max-width: ${props => props.theme.breakpoints.smallScreen}) {
    display: block;

    padding-top: 3rem;
    padding-bottom: 3rem;
  }
`;

export const ProductsWrapper = styled.div`
  > div:first-child {
    margin-top: 0;
  }

  > div:first-child {
    margin-bottom: 0;
  }
`;

export const ReviewsWrapper = styled.div`
  display: flex;

  & > div:first-child {
    min-width: 370px;
  }

  & > div:last-child {
    margin-left: 2rem;
    width: 100%;
  }

  @media (max-width: ${props => props.theme.breakpoints.largeScreen}) {
    display: block;

    & > div:first-child {
      margin-bottom: 1.5rem;
      min-width: auto;
    }

    & > div:last-child {
      margin-left: 0;
    }
  }
`;

export const ButtonWrapper = styled.div`
  margin-left: 32%;
`;

// 2. Elements
export const Description = styled.p<{
  isChatActive: boolean;
}>`
  flex-basis: ${props => (props.isChatActive ? "65%" : "100%")};
  margin-right: ${props => (props.isChatActive ? "2rem" : "0")};
  margin-bottom: 1.5rem;

  @media (max-width: ${props => props.theme.breakpoints.largeScreen}) {
    flex-basis: 100%;
    margin-right: 0;
  }
`;

export const HorizontalSeparator = styled(Separator)`
  width: 100%;
`;

export const StyledButton = styled(Button)`
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  span {
    align-items: center;
    display: flex;
    font-size: ${props => props.theme.typography.smallFontSize};
  }

  svg {
    margin-right: 0.75rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mediumScreen}) {
    width: auto;
  }
`;

export const ButtonText = styled.p`
  max-width: 135px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ContentTitle = styled.h2`
  margin-bottom: 54px;
  text-align: center;

  @media (max-width: ${props => props.theme.breakpoints.smallScreen}) {
    margin-bottom: 1rem;
  }
`;

export const LightTitle = styled.p`
  font-size: ${props => props.theme.typography.lightTitleFontSize};
  font-weight: ${props => props.theme.typography.lightFontWeight};
  line-height: ${props => props.theme.typography.lightTitleLineHeight};
  text-align: center;
`;
