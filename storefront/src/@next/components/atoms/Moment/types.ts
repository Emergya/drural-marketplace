import { MomentProps } from "react-moment";

export type IProps = Omit<MomentProps, ExcludedProps>;

type ExcludedProps = "locale";
