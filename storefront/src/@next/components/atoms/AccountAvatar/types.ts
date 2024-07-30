export interface IProps {
  source: string | undefined;
  imageUpload: (file: File) => void;
  imageDelete: () => void;
}
