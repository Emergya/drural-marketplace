import { styled } from "@styles";

export const Dot = styled.div<{ done?: boolean }>`
  color: ${props => props.theme.colors.white};
  position: relative;
  border-radius: 50%;
  font-size: ${props => props.theme.typography.smallFontSize};
  width: 24px;
  height: 24px;
  background-color: ${props =>
    props.done
      ? props.theme.colors.primaryDark
      : props.theme.colors.druralGray_200};
  display: flex;
  justify-content: center;
  transition: 0.3s all;

  &:hover {
    background-color: ${props =>
      props.done
        ? props.theme.colors.primary
        : props.theme.colors.druralGray_200};
  }
`;
export const DotNumber = styled.div`
  color: ${props => props.theme.colors.white};
  font-size: 14px;
`;
export const ActiveDot = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

export const Label = styled.span`
  white-space: pre;
  display: block;
  position: absolute;
  top: 35px;
  transform: translateX(-50%);
  font-size: ${[props => props.theme.typography.smallFontSize]};
  letter-spacing: 2%;
  color: ${props => props.theme.colors.black};
`;

export const LeftLabel = styled(Label)`
  transform: none;
  top: 35px;
`;
export const RightLabel = styled(Label)`
  transform: none;
  top: 35px;
  right: 0;
`;

export const ProgressBar = styled.div<{ done?: boolean }>`
  margin: 8px;
  width: 100%;
  height: 4px;
  background-color: ${props =>
    props.done
      ? props.theme.colors.primary
      : props.theme.colors.druralGray_200};
  border-radius: 10px;
`;

export const Step = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  &:not(:last-child) {
    width: 100%;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;
