import { media, styled } from "@styles";

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const Content = styled.div<{
  contentPosition?: "left" | "right";
}>`
  border-radius: 4px;
  box-shadow: ${props => props.theme.dropdown.boxShadow};
  background-color: ${props => props.theme.dropdown.backgroundColor};

  position: absolute;
  left: ${props => (props.contentPosition === "right" ? 0 : "auto")};
  right: ${props => (props.contentPosition === "right" ? "auto" : 0)};
  z-index: 2;

  ul {
    margin: 0;
    list-style-type: none;
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;
    font-style: normal;
    font-weight: normal;

    line-height: ${props => props.theme.typography.baseLineHeight};
    align-items: flex-start;

    li {
      cursor: pointer;
      padding: 14px 48px 14px 24px;
      width: fill-available;
      white-space: nowrap;

      &:hover {
        background-color: ${props => props.theme.colors.primaryLight};
      }

      ${media.smallScreen`
        padding: 14px 24px;
      `}
    }
  }
`;
