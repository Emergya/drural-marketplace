import { styled } from "@styles";

export const Wrapper = styled.div`
  box-shadow: ${props => props.theme.boxShadow.light};
  background-color: ${props => props.theme.colors.white};
  height: fit-content;
  max-width: 33%;
  min-width: min(300px, 100vw);
  flex: 1;
  @media (max-width: ${props => props.theme.breakpoints.mediumScreen}) {
    margin-right: 0px;
    max-width: 100%;
  }
`;
export const ListHeader = styled.div`
  padding-top: 24px;
  padding-left: 32px;
  padding-bottom: 8px;
`;

export const ListTile = styled.div<{
  active: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 96px;
  border-left: ${props =>
    props.active ? `6px solid ${props.theme.colors.primary}` : ""};
  padding: ${props =>
    props.active ? "16px 32px 16px 26px" : "16px 32px 16px 32px"};
  background-color: ${props =>
    props.active ? props.theme.colors.primary100 : "transparent"};
  font-weight: ${props => (props.active ? 600 : 400)};
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    left: 5%;
    bottom: 0;
    height: 1px;
    width: 90%;
    border-bottom: 1px solid #e0dee3;
  }
`;

export const Image = styled.div`
  display: flex;
  width: 64px;
  height: 64px;
  margin-right: 1rem;

  > img {
    object-fit: cover;
    width: 64px;
    height: 64px;
  }
`;

export const ListInfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
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
