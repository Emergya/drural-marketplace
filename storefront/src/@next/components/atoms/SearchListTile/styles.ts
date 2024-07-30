import { styled } from "@styles";

export const Overlay = styled.div`
  position: absolute;
  top: 130px;
  left: 0;
  width: max(100%, 376px);
  padding-top: 22px;
  padding-bottom: 22px;
  height: auto;
  min-height: 130px;
  z-index: 5;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  ul {
    > div {
      height: 85px;
      > div {
        span {
          height: 12px;
          width: 12px;
        }
      }
    }
  }
  li {
    font-weight: ${props => props.theme.typography.boldFontWeight};
    cursor: pointer;
    text-align: left;
    width: 100%;
    padding: 5px 32px 5px 32px;
    &:hover {
      background-color: ${props => props.theme.colors.primaryLight};
    }
  }
`;
