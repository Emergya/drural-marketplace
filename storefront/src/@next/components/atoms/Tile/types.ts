export interface IProps {
  boxShadow?: string;
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  tileType?: "hover" | "addNew";
  mobilePadding?: string;
  padding?: string;
  height?: string;
  left?: boolean;
}
