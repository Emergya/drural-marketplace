import { css } from "styled-components";

import { styled } from "@styles";

const inputStyle = css<{ checked: boolean; disabled: boolean }>`
  ${props => props.checked && `color: #000000;`}
  ${props => props.disabled && `color: #C1BEC8;`}

  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    ${props =>
      props.checked &&
      `> div {
          border: 2px solid ${props.theme.colors.primary};

          > span {
            background: ${props.theme.colors.primary};
          }
      }`}
    
    ${props =>
      props.disabled &&
      `> div {
        border: 2px solid #C1BEC8;
      }`}

    ${props =>
      props.checked &&
      props.disabled &&
      `> div > span {
        background: #C1BEC8;
      }`}
  }

  input[type="radio"] {
    opacity: 0;
    position: fixed;
    width: 0;
  }
  > div {
    display: inline-block;
    width: 1em;
    height: 1em;
    margin: 0.25em 1em 0.25em 0.25em;
    border: 2px solid #1a1a1a;
    border-radius: 0.5em;
    background: #ffffff;
    vertical-align: bottom;
  }
  ${props =>
    props.checked &&
    `> div {
      border: 2px solid ${props.theme.colors.primary};
    }`}

  ${props =>
    props.disabled &&
    `> div {
      border: 2px solid #C1BEC8;
    }`}

  ${props =>
    props.checked &&
    `> div > span {
      display: block;
      width: 0.5em;
      height: 0.5em;
      margin: 0.125em;
      border-radius: 0.25em;
      background: ${props.theme.colors.primary};
    }`}

  ${props =>
    props.checked &&
    props.disabled &&
    `> div > span {
      background: #C1BEC8;
    }`}
`;

export const Input = styled.div<{ checked: boolean; disabled: boolean }>`
  ${inputStyle}
`;

export const LabeledInput = styled.label<{
  checked: boolean;
  disabled: boolean;
}>`
  ${inputStyle}
`;
