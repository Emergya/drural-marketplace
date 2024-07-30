import { makeStyles } from "@drural/macaw-ui";
import { UilHistoryAlt, UilPower, UilShop } from "@iconscout/react-unicons";
import { BusinessActiveShopEnum } from "@saleor/business/components/BusinessesListPage";
import { useBusinessesTotalCountQuery } from "@saleor/business/queries";
import {
  businessesListUrl,
  BusinessesListUrlColumnsEnum,
  BusinessesListUrlSortField,
  businessListPath,
  businessUrl
} from "@saleor/business/urls";
import AnalyticsCard from "@saleor/components/AnalyticsCard";
import CardSpacer from "@saleor/components/CardSpacer";
import Grid from "@saleor/components/Grid";
import SmallList from "@saleor/components/SmallList";
import {
  useBusinessesNumberStatsQuery,
  useMostSalesBusinessesQuery
} from "@saleor/controlPanel/queries";
import useNavigator from "@saleor/hooks/useNavigator";
import {
  CompanySortField,
  CompanyStatusEnum,
  OrderDirection
} from "@saleor/types/globalTypes";
import { mapEdgesToItems } from "@saleor/utils/maps";
import React from "react";
import { useIntl } from "react-intl";

import BusinessNumberChart from "../../Charts/BusinessNumberChart";

const useStyles = makeStyles(
  theme => ({
    cardContainer: {
      display: "grid",
      gridColumnGap: "2.6rem",
      gridTemplateColumns: "1fr 1fr 1fr",
      [theme.breakpoints.down("sm")]: {
        gridColumnGap: theme.spacing(2)
      },
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "1fr"
      }
    },
    iconPrimary: {
      "& path": {
        fill: theme.palette.primary.main
      }
    },
    iconSecondary: {
      "& path": {
        fill: theme.palette.alert.paper.warning
      }
    },
    iconBlueGray: {
      "& path": {
        fill: theme.customColors.blueGray
      }
    },
    tableContainer: {
      display: "grid",
      gridColumnGap: "2.6rem",
      gridTemplateColumns: "1fr",
      [theme.breakpoints.down("sm")]: {
        gridColumnGap: theme.spacing(2)
      },
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "1fr"
      }
    }
  }),
  { name: "BusinessStatsTab" }
);

interface BusinessesStatsTabProps {
  chartsTheme: string;
  startDate: string;
  endDate: string;
}

const BusinessesStatsTab: React.FC<BusinessesStatsTabProps> = ({
  chartsTheme,
  startDate,
  endDate
}) => {
  const intl = useIntl();
  const classes = useStyles();
  const navigate = useNavigator();

  const timeRange = {
    gte: startDate,
    lte: endDate
  };

  const registeredBusinessesQueryVariables = { first: 12 };
  const pendingValidationBusinessesQueryVariables = {
    first: 12,
    filter: { status: [CompanyStatusEnum.PENDING] }
  };
  const activeBusinessesQueryVariables = {
    first: 12,
    filter: { isEnabled: true }
  };
  const businessesNumberStatsVariables = {
    period: { ...timeRange }
  };
  const mostSalesBusinessListQueryVariables = {
    first: 5,
    filter: {
      consumption: {
        ...timeRange
      }
    },
    sortBy: { field: CompanySortField.SALES, direction: OrderDirection.DESC }
  };

  const { data } = useBusinessesNumberStatsQuery({
    displayLoader: true,
    variables: businessesNumberStatsVariables
  });
  const { data: registeredBusinesses } = useBusinessesTotalCountQuery({
    displayLoader: true,
    variables: registeredBusinessesQueryVariables
  });
  const { data: pendingValidationBusinesses } = useBusinessesTotalCountQuery({
    displayLoader: true,
    variables: pendingValidationBusinessesQueryVariables
  });
  const { data: activeBusinesses } = useBusinessesTotalCountQuery({
    displayLoader: true,
    variables: activeBusinessesQueryVariables
  });
  const {
    data: mostSalesBusinesses,
    loading: loadingBusinessList
  } = useMostSalesBusinessesQuery({
    displayLoader: true,
    variables: mostSalesBusinessListQueryVariables
  });
  return (
    <>
      <div className={classes.cardContainer}>
        <AnalyticsCard
          title={intl.formatMessage({
            defaultMessage: "Registered shops"
          })}
          testId="sales-analytics"
          icon={<UilShop className={classes.iconPrimary} />}
          backgroundColor="primary"
          onClick={() => navigate(businessListPath)}
          clickable
        >
          {registeredBusinesses
            ? registeredBusinesses?.companies.totalCount
            : "-"}
        </AnalyticsCard>
        <AnalyticsCard
          title={intl.formatMessage({
            defaultMessage: "Awaiting validation"
          })}
          testId="sales-analytics"
          icon={<UilHistoryAlt className={classes.iconSecondary} />}
          backgroundColor="secondary"
          clickable
          onClick={() =>
            navigate(
              businessesListUrl({
                status: [CompanyStatusEnum.PENDING],
                columns: [BusinessesListUrlColumnsEnum.modified]
              })
            )
          }
        >
          {pendingValidationBusinesses
            ? pendingValidationBusinesses?.companies.totalCount
            : "-"}
        </AnalyticsCard>
        <AnalyticsCard
          title={intl.formatMessage({
            defaultMessage: "Active shops"
          })}
          testId="sales-analytics"
          icon={<UilPower className={classes.iconBlueGray} />}
          backgroundColor="blueGrey"
          clickable
          onClick={() =>
            navigate(
              businessesListUrl({
                activeShop: [BusinessActiveShopEnum.ACTIVE]
              })
            )
          }
        >
          {activeBusinesses ? activeBusinesses?.companies.totalCount : "-"}
        </AnalyticsCard>
      </div>
      <Grid variant="uniform">
        <div>
          <BusinessNumberChart
            chartsTheme={chartsTheme}
            data={data?.companyAdditionStat}
          />
          <CardSpacer />
        </div>
        <div>
          <div className={classes.tableContainer}>
            <SmallList
              businesses={mapEdgesToItems(mostSalesBusinesses?.companies)}
              loading={loadingBusinessList}
              title={intl.formatMessage({
                defaultMessage: "Shops with the most sales"
              })}
              onLinkClick={() =>
                navigate(
                  businessesListUrl({
                    asc: false,
                    sort: BusinessesListUrlSortField.sales
                  })
                )
              }
              onRowClick={id => () => navigate(businessUrl(id))}
            />
          </div>
          <CardSpacer />
        </div>
      </Grid>
    </>
  );
};
export default BusinessesStatsTab;
