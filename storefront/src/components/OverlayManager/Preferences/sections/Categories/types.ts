import { PreferenceObject } from "../../utils";

export interface IProps {
  preferences: Record<string, PreferenceObject>;
  onChange?: (event: React.SyntheticEvent, name: string) => void;
}
