import { media, styled } from "@styles";

// 1. Wrappers
export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const HeaderMenu = styled.div`
  display: flex;
  align-items: center;
`;

export const DropdownMenuWrapper = styled.div`
  border-radius: 100px;
  box-shadow: ${props => props.theme.boxShadow.light};
`;

export const ContentWrapper = styled.div`
  display: flex;

  ${media.largeScreen`
  flex-wrap: wrap;
`}
`;

export const MainWrapper = styled.div`
  margin-left: 2rem;
  width: 100%;

  ${media.largeScreen`
    margin-left: 0;
  `}
`;

export const CardWrapper = styled.div`
  ${media.largeScreen`
    min-width: fit-content;
  `}
`;

export const StatusLabelsWrapper = styled.div`
  padding-top: 1rem;
  padding-left: 1rem;
`;

export const AddressWrapper = styled.div`
  color: ${props => props.theme.colors.druralGray};
  padding: 16px 24px 0;
`;

// 2. Elements
export const Title = styled.h3`
  margin-bottom: 22px;
`;

export const Spacer = styled.div`
  height: 2rem;
`;
