import { IconProps } from "@material-ui/core/Icon";

export interface AnalyticsCardProps {
  backgroundColor?: "primary" | "secondary" | "blueGrey" | "red";
  children?: React.ReactNode;
  clickable?: boolean;
  childrenWrapperClassName?: string;
  icon: React.ReactElement<IconProps>;
  loading?: boolean;
  testId?: string;
  title: string;

  onClick?: () => void;
}
