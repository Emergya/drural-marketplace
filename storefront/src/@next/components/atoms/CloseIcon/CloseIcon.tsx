import { UilMultiply } from "@iconscout/react-unicons";
import React from "react";

import * as S from "./styles";

export interface CloseIconProps {
  className?: string;
  onClose?: () => void;
  size?: number;
  backGroundColor?: boolean;
}

export const CloseIcon: React.FC<CloseIconProps> = ({
  className,
  onClose,
  size = 24,
  backGroundColor = false,
}) => {
  return (
    <S.Wrapper
      className={className}
      onClick={onClose}
      backGroundColor={backGroundColor}
    >
      <UilMultiply size={`${size}`} />
    </S.Wrapper>
  );
};
CloseIcon.displayName = "CloseIcon";
