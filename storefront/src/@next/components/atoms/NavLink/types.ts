export interface IProps {
  fullWidth?: boolean;
  item: IItem;
}

export interface IItem {
  name: string;
  url?: string | null;
  category?: IPiece;
  collection?: IPiece;
  page?: IPiece;
}

type IPiece = {
  name?: string;
  slug: string;
} | null;
