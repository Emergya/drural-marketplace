export interface IProps {
  name: string;
  disabled?: boolean;
  onChange?: (event: React.SyntheticEvent) => void;
  children?: React.ReactNode;
  defaultValue?: boolean;
}
