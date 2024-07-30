import { LocationInterface } from "./types";

export interface PreferenceObject {
  id?: string;
  icon: any;
  title: string;
  value: boolean;
}

export const initialLocation: LocationInterface = {
  accessLocation: false,
  distanceNearMe: 0,
};
