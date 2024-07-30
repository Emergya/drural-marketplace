export interface IProps {
  hoverable?: boolean;
  isSelected?: boolean;
  status?: "success" | "error";
  onClick?: () => void;
}
