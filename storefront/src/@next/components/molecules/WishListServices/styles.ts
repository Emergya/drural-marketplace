import { styled } from "@styles";

export const Wrapper = styled.div`
  box-shadow: ${props => props.theme.boxShadow.light};
  background-color: ${props => props.theme.colors.white};
  height: fit-content;
  flex: 1;
  min-width: min(300px, 100vw);
  max-width: 65%;
  margin-left: 10px;
  @media (max-width: ${props => props.theme.breakpoints.mediumScreen}) {
    max-width: 100%;
    margin-left: 0;
  }
`;
export const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  padding-left: 32px;
  padding-bottom: 8px;
  padding-right: 41px;
`;

export const ListTile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 160px;
  padding: 16px 0px 16px 48px;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    left: 2%;
    bottom: 0;
    height: 1px;
    width: 96%;
    border-bottom: 1px solid #e0dee3;
  }
  @media (min-width: ${props =>
      props.theme.breakpoints.mediumScreen}) and (max-width: ${props =>
      props.theme.breakpoints.largeScreen}) {
    padding: 16px 10px 16px 10px;
  }
`;

export const Image = styled.div`
  display: flex;
  width: 128px;
  height: 128px;
  margin-right: 1rem;

  > img {
    object-fit: cover;
    width: 128px;
    height: 128px;
  }
  @media (min-width: ${props =>
      props.theme.breakpoints.mediumScreen}) and (max-width: ${props =>
      props.theme.breakpoints.largeScreen}) {
    width: 100px;
    height: 100px;
    > img {
      width: 100px;
      height: 100px;
    }
  }
`;

export const ListInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const DeleteIcon = styled.div`
  display: flex;
  align-items: center;
  border-radius: 100%;
  svg {
    color: ${props => props.theme.colors.primary};
  }
  &:hover {
    background-color: ${props => props.theme.colors.primaryLight};
  }
`;
export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 128px;
  button {
    padding: 0;
    height: auto;
    span {
      display: flex;
      align-items: center;

      svg {
        margin-right: 10px;
        color: ${props => props.theme.colors.primary};
      }
    }
    @media (max-width: ${props => props.theme.breakpoints.mediumScreen}) {
      width: 100%;
    }
  }
`;

export const Illustration = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 300px;
  margin: 50px auto 80px;
  align-items: center;
  justify-content: space-between;
`;

export const Text = styled.p`
  font-weight: ${props => props.theme.typography.lightFontWeight};
  font-size: ${props => props.theme.typography.lightTitleFontSize};
  text-align: center;
`;
