interface ISource {
  url: string | null;
  alt?: string | null;
}

export interface IProps {
  address?: string;
  image: ISource;
  publishedProducts?: number;
  rating?: number;
  title: string;
}
