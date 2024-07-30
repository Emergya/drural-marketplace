import CardSpacer from "@saleor/components/CardSpacer";
import Grid from "@saleor/components/Grid";
import {
  useActiveUserQuantityQuery,
  useRegisterUserQuantityQuery,
  useUserQuantityQuery
} from "@saleor/controlPanel/queries";
import React from "react";

import ActiveUserChart from "../../Charts/ActiveUsersChart";
import RegisteredUserChart from "../../Charts/RegisteredUsersChart";
import TotalUserChart from "../../Charts/TotalUsersChart";

interface UserStatsTabProps {
  chartsTheme: string;
  startDate: string;
  endDate: string;
}

const UserStatsTab: React.FC<UserStatsTabProps> = ({
  chartsTheme,
  startDate,
  endDate
}) => {
  // date variables to be used on the query variable
  const timeRange = {
    gte: startDate,
    lte: endDate
  };
  const usersQueryVariable = {
    period: { ...timeRange }
  };
  const { data: userQuantityData } = useUserQuantityQuery({
    displayLoader: true,
    variables: usersQueryVariable
  });
  const { data: registeredUsersData } = useRegisterUserQuantityQuery({
    displayLoader: true,
    variables: usersQueryVariable
  });
  const { data: activeUsersData } = useActiveUserQuantityQuery({
    displayLoader: true,
    variables: usersQueryVariable
  });

  return (
    <Grid variant="uniform">
      <div>
        <TotalUserChart
          chartsTheme={chartsTheme}
          data={userQuantityData?.userQuantityStat}
        />
        <CardSpacer />
        <ActiveUserChart
          chartsTheme={chartsTheme}
          data={activeUsersData?.activeUserQuantityStat}
        />
      </div>
      <div>
        <RegisteredUserChart
          chartsTheme={chartsTheme}
          data={registeredUsersData?.userQuantityStat}
        />
        <CardSpacer />
      </div>
    </Grid>
  );
};
export default UserStatsTab;
