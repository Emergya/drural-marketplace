export interface IProps {
  icon: any;
  title: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (event: React.SyntheticEvent) => void;
}
