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
  id?: string; //Se agrega ese campo para poner id en elementos necesarios para test automáticos
}
