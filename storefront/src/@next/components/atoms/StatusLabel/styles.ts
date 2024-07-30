import { styled } from "@styles";

export const Dot = styled.div`
  border-radius: 100%;
  box-shadow: none;
  height: 8px;
  width: 8px;
  background-color: ${props => props.theme.colors.error};
`;
export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const AlertDot = styled(Dot)`
  background-color: ${props => props.theme.colors.secondary};
`;
export const ErrorDot = styled(Dot)`
  background-color: ${props => props.theme.colors.error};
`;
export const NeutralDot = styled(Dot)`
  background-color: ${props => props.theme.colors.druralGray};
`;
export const SuccessDot = styled(Dot)`
  background-color: ${props => props.theme.colors.primary};
`;
export const TextContainer = styled.div`
  margin-left: 0.5rem;
  display: flex;
  flex-direction: column;
`;
