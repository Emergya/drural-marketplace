export interface IMoney {
  amount: number;
  currency: string;
}
export interface IProps {
  money?: IMoney | null;
  defaultValue?: string;
}
