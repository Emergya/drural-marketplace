import { media, styled } from "@styles";

// 1. Wrappers
export const MainWrapper = styled.div`
  display: flex;

  ${media.largeScreen`
    flex-wrap: wrap;
  `}
`;

export const ContentWrapper = styled.div`
  margin-left: 2rem;
  width: 100%;

  ${media.largeScreen`
    margin-left: 0;
  `}
`;

export const TilesWrapper = styled.div``;

export const ButtonsWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  flex-wrap: wrap-reverse;
  flex-direction: row;
  justify-content: flex-end;

  button {
    margin-bottom: 0;
    margin-top: 0;
    width: inherit;

    ${media.smallScreen`
      padding-left: 26px;
      padding-right: 26px;
    `}

    &:first-child {
      ${media.smallScreen`
        flex-basis: 36%;
      `}
    }

    &:last-child {
      margin-left: 1.25rem;

      ${media.smallScreen`
        flex-basis: 60%;
        margin-bottom: 0.5rem;
        margin-left: 4%;
      `}
    }
  }
`;

// 2. Elements
export const Title = styled.h2`
  margin-bottom: 2.75rem;
`;
