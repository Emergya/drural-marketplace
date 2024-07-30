export interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: FormError[];
  helpText?: string;
  label?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

interface FormError {
  message: string;
  field?: string;
}
