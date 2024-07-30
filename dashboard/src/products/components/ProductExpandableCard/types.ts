export enum ProductTypeEnum {
  isBillable = "isBillable",
  isShipabble = "isShippable",
  isBookable = "isBookable"
}

export interface ProductExpandableCardProps {
  checked: boolean;
  disabled: boolean;
  label: React.ReactNode;
  name: ProductTypeEnum;
  readOnly?: boolean;
  title: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
