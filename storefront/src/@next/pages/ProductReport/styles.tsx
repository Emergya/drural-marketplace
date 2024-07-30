import { media, styled } from "@styles";

// 1. Wrappers
export const Wrapper = styled.div`
  display: flex;

  ${media.largeScreen`
    flex-wrap: wrap;
  `}
`;

export const SideWrapper = styled.div`
  min-width: 370px;

  ${media.xLargeScreen`
    min-width: 320px;
  `}

  ${media.largeScreen`
    margin-bottom: 1rem;
    min-width: 100%;
  `}
`;
export const MainWrapper = styled.div`
  margin-left: 2rem;
  width: 100%;

  ${media.largeScreen`
    margin-left: 0;
  `}
`;

export const Form = styled.form`
  & > div {
    margin-top: auto;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const FormButtons = styled.div`
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

    &:last-child {
      margin-left: 1.25rem;

      ${media.smallScreen`
        margin-bottom: 0.5rem;
        margin-left: 1rem;
      `}
    }
  }
`;

// 2. Elements

export const Title = styled.h2`
  margin-bottom: 30px;
`;
