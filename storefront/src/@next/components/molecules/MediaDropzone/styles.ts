import { styled } from "@styles";

// 1. Wrappers
export const Dropzone = styled.div<{
  cursorEnabled: boolean;
}>`
  cursor: ${props => (props.cursorEnabled ? "pointer" : "auto")};
`;

export const MediaGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

// 2. Elements
export const MediaUpload = styled.input`
  display: none;
`;
