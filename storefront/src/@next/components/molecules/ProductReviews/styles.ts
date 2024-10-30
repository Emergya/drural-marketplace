import { Button } from "@components/atoms";
import { media, styled } from "@styles";

// 1. Wrappers
export const Container = styled.div``;

export const HeaderWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-bottom: 2rem;

  ${media.smallScreen`
  padding-bottom: 26px;
  `}
`;

export const ContentWrapper = styled.div``;

export const ReviewsWrapper = styled.div``;
export const ReviewTile = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const FooterWrapper = styled.div``;

// 2. Typografy
export const Title = styled.h3``;

export const StyledButton = styled(Button)`
  margin-bottom: 38px;
  width: 390px;

  ${media.smallScreen`
    margin-bottom: 26px;
    width: 100%;
  `}
`;
export const DeleteIcon = styled.div`
  display: flex;
  align-items: center;
  border-radius: 100%;
  &:hover {
    background-color: ${props => props.theme.colors.primaryLight};
  }
`;

export const ReportIcon = styled.div`
  display: flex;
  align-items: center;
  border-radius: 100%;
  &:hover {
    background-color: ${props => props.theme.colors.primaryLight};
  }
`;