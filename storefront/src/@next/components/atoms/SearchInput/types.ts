export interface IProps {
  disabled?: boolean;
  fullWidth?: boolean;
  placeholder: string;
  textSize?: "normal" | "small";
  theming?: "light" | "dark";
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}
