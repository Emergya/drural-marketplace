export interface IProps {
  placeholder?: string | React.ReactNode;
  onChange: (value: any, name?: any) => void;
  value: any;
  options: any;
  name?: any;
}
