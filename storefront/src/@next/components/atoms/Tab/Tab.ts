import { media, styled } from "@styles";

import { IProps } from "./types";

export const Tab = styled.div<IProps>`
  align-items: center;
  border-bottom: ${props =>
    props.isActive ? `4px solid ${props.theme.colors.primaryDark}` : "0"};
  cursor: pointer;
  display: flex;
  font-weight: ${props =>
    props.isActive
      ? props.theme.typography.extraBoldFontWeight
      : props.theme.typography.normalFontWeight};
  line-height: 2rem;
  padding: 0.5rem;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }

  ${media.largeScreen`
    border-bottom: 0;
    padding: 13px 14px 13px 18px;

    &:first-child {
      padding-left: 13px;
    }
  
    &:last-child {
      padding-right: 18px;
    }
  `}
`;
