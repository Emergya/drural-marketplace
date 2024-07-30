import {
  CookieGroupEnum,
  Cookies,
  ICookie,
} from "@components/organisms/CookieWarning/types";

export interface IProps {
  cookies: Cookies;
  show: boolean;
  onHide: () => void;
  onSubmit: (preferences: Cookies) => void;
}

export type Preferences = Record<
  CookieGroupEnum,
  { selectAll: boolean; cookies: ICookie[] }
>;

export interface ICookieGroupMessage {
  title: string;
  description: string;
}
