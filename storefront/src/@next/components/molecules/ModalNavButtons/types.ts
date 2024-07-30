export interface IProps {
  textNext: string;
  textBack: string;
  onNext?: () => void;
  onBack: () => void;
  displayNext?: boolean;
  displayBack?: boolean;
  type?: "submit" | "button" | "reset";
}
