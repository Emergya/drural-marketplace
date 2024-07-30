import { media, styled } from "@styles";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
`;

export const TileWrapper = styled.div`
  height: auto;
  margin-bottom: 1.5rem;
`;

export const Header = styled.div`
  width: 100%;
  padding-bottom: 30px;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  font-size: ${props => props.theme.typography.h3FontSize};
  line-height: ${props => props.theme.typography.h3LineHeight};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 4rem;
`;

export const HeaderSmall = styled.div`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 25px;
  width: 100%;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  ${media.mediumScreen`
  flex-direction: column;
`}
`;

export const ContentWithAvatar = styled.div`
  min-width: 200px;
  margin-bottom: 33px;
`;
export const ContentWithoutAvatar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  form {
    width: 100%;
  }
`;

export const ContentOneLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 70%;
  ${media.smallScreen`
    flex-direction: column;
    width: 100%;
  `}
`;
export const ContentEdit = styled.div`
  width: 100%;
  ${media.smallScreen`
     width: 100%;
  `}
`;

export const ContentEditOneLine = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > div {
    width: 48%;
    ${media.smallScreen`
      width: 100%;
    `}
  }

  ${media.smallScreen`
     flex-direction: column;
  `}
`;

export const ContentExtendInput = styled.div`
  width: 60%;
`;

export const Form = styled.form`
  background-color: ${props => props.theme.colors.white};
`;

export const ColumnForm = styled.form`
  background-color: ${props => props.theme.tile.backgroundColor};
  > div {
    width: 60%;
    ${media.smallScreen`
      width: 100%;
    `}
  }
  > div:last-child {
    width: 100%;
  }
`;
export const FormButtons = styled.div`
  height: 5rem;
  padding-top: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  button {
    margin-left: 2rem;
  }
`;
