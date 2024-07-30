import { styled } from "@styles";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 168px;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary100};
  margin-bottom: 14px;
  svg {
    fill: ${props => props.theme.colors.primary};
  }
`;

export const RelativeCheckbox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-45px, -67px);
  margin: 0;
  padding: 0;
`;

export const ThumbnailTitle = styled.p`
  font-weight: 500;
  font-size: ${props => props.theme.typography.baseFontSize};
`;
