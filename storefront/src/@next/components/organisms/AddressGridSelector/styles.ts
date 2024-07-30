import { AddNewTile } from "@components/atoms";
import { styled } from "@styles";

export const AddressesWrapper = styled.div`
  margin-top: 0;
  margin-bottom: 0;
  padding-bottom: 18px;
`;

export const StyledAddNewTile = styled(AddNewTile)`
  padding: 0;

  & > div > div {
    flex-direction: row;

    & > div {
      height: 40px;
      width: 40px;

      svg {
        width: 20px;
      }
    }

    p {
      padding-left: 8px;
      transition: 0.25s all;
    }
  }

  &:hover {
    & > div > div {
      p {
        color: ${props => props.theme.colors.primary};
      }
    }
  }
`;
