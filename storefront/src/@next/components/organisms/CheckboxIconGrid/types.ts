import { PreferenceObject } from "@temp/components/OverlayManager/Preferences/utils";

export interface IProps {
  preferences: Record<string, PreferenceObject>;
  onChange?: (event: React.SyntheticEvent, name: string) => void;
}
