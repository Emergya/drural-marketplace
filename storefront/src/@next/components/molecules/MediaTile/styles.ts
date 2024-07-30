import { CachedImage } from "@components/molecules";
import { styled } from "@styles";

export const Overlay = styled.div<{
  loading?: boolean;
}>`
  align-items: ${props => props.loading && "center"};
  background: rgba(0, 0, 0, 0.6);
  // cursor: move;
  display: ${props => (props.loading ? "flex" : "none")};
  height: 148px;
  justify-content: ${props => props.loading && "center"};
  left: 0;
  padding: 6px 8px;
  position: absolute;
  top: 0;
  width: 148px;
`;

export const Wrapper = styled.div`
  &:hover,
  &.dragged {
    & ${Overlay} {
      display: block;
    }
  }

  &:not(:last-child) {
    margin-bottom: 16px;
    margin-right: 16px;
  }

  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.druralGray_400};
  height: 148px;
  overflow: hidden;
  position: relative;
  width: 148px;
`;

export const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Image = styled(CachedImage)`
  height: 100%;
  object-fit: contain;
  user-select: none;
  width: 100%;
`;
