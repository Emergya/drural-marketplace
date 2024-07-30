import { media, styled } from "@styles";

// 1. List
export const Wrapper = styled.div``;

export const ListWrapper = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: repeat(
    ${props => (props.columns ? props.columns : 1)},
    1fr
  );
  column-gap: 1.25rem;
  row-gap: 1.25rem;


  ${media.largeScreen`
    grid-template-columns: repeat(
      ${(props: { columns?: number }) =>
        props.columns ? props.columns / 2 : 1},
      1fr
    );
  `}

  ${media.smallScreen`
    grid-template-columns: 1fr 1fr;
  `}

  ${media.extraSmallScreen`
    grid-template-columns: 1fr ;
  `}
`;

export const Title = styled.h2`
  margin-bottom: 3.75rem;
  text-align: center;

  ${media.smallScreen`
    margin-bottom: 1rem;
  `}
`;

// 2. Loader
export const LoaderWrapper = styled.div`
  text-align: center;
  margin: 2.5rem 0;
`;
