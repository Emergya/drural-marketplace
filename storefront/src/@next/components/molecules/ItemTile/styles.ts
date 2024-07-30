import { styled } from "@styles";

export const Wrapper = styled.div`
  ${props => props.onClick && "cursor: pointer"}
`;

export const PictureWrapper = styled.div<{ pictureSize: number }>`
  border-radius: 100%;
  height: ${props => (props.pictureSize ? props.pictureSize : 144)}px;
  margin: auto;
  overflow: hidden;
  width: ${props => (props.pictureSize ? props.pictureSize : 144)}px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Name = styled.h4`
  margin-top: 22px;
  text-align: center;
  font-size: ${props => props.theme.typography.baseFontSize};
  font-weight: ${props => props.theme.typography.semiBoldFontWeight};
`;
