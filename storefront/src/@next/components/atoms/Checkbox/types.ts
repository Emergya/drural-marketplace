export interface IProps {
  name: string;
  checked?: boolean;
  disabled?: boolean;
  helpText?: string;
  onChange?: (event: React.SyntheticEvent) => void;
  children?: React.ReactNode;
}
