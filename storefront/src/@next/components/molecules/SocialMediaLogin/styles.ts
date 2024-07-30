import { styled } from "@styles";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 2vh;
  margin-bottom: 2vh;
  justify-content: space-between;
  align-items: center;
  button {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
    span {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 230px;
    }
  }
`;
