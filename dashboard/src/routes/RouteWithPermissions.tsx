import useUser from "@saleor/hooks/useUser";
import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

export enum UserRoleEnum {
  customer = "customer",
  seller = "seller",
  staff = "staff"
}

interface RouteWithPermissionsProps extends RouteProps {
  userPermissions?: UserRoleEnum[];
  redirectUrl: string;
}

export const RouteWithPermissions: React.FC<RouteWithPermissionsProps> = ({
  userPermissions = [],
  redirectUrl,
  ...rest
}) => {
  const { user } = useUser();

  const getHasUserPermission = (userPermissions: UserRoleEnum[]): boolean => {
    let hasUserPermission = false;

    for (const userPermission of userPermissions) {
      switch (userPermission) {
        case UserRoleEnum.customer:
          hasUserPermission = !user.isSeller && !user.isStaff;
          break;
        case UserRoleEnum.seller:
          hasUserPermission = user.isSeller && !user.isStaff;
          break;
        case UserRoleEnum.staff:
          hasUserPermission = !user.isSeller && user.isStaff;
          break;
      }

      if (hasUserPermission) {
        break;
      }
    }

    return hasUserPermission;
  };

  return getHasUserPermission(userPermissions) ? (
    <Route {...rest} />
  ) : (
    <Redirect to={redirectUrl} />
  );
};
