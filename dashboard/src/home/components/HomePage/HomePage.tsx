import { makeStyles } from "@drural/macaw-ui";
import { UilAnalysis, UilShoppingBag } from "@iconscout/react-unicons";
import { darken } from "@material-ui/core";
import AnalyticsCard from "@saleor/components/AnalyticsCard";
import CardSpacer from "@saleor/components/CardSpacer";
import Container from "@saleor/components/Container";
import Grid from "@saleor/components/Grid";
import Money from "@saleor/components/Money";
import RequirePermissions from "@saleor/components/RequirePermissions";
import { UserPermissionProps } from "@saleor/types";
import { PermissionEnum } from "@saleor/types/globalTypes";
import React from "react";
import { useIntl } from "react-intl";

import {
  Home_activities_edges_node,
  Home_featuredProducts_edges_node,
  Home_productTopToday_edges_node,
  Home_salesToday_gross
} from "../../types/Home";
import HomeActivityCard from "../HomeActivityCard";
import HomeHeader from "../HomeHeader";
import HomeNotificationTable from "../HomeNotificationTable/HomeNotificationTable";
import HomeProductListCard from "../HomeProductListCard";

const useStyles = makeStyles(
  theme => ({
    cardContainer: {
      display: "grid",
      gridColumnGap: theme.spacing(3),
      gridTemplateColumns: "1fr 1fr",
      [theme.breakpoints.down("sm")]: {
        gridColumnGap: theme.spacing(1)
      },
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "1fr"
      }
    },
    icon: {
      "& path": {
        fill: theme.palette.primary.main
      }
    },
    iconPrimary: {
      color: darken(theme.palette.primary.main, 0.3)
    },
    iconBlueGrey: {
      color: darken(theme.customColors.blueGray, 0.4)
    }
  }),
  { name: "HomePage" }
);

export interface HomePageProps extends UserPermissionProps {
  activities: Home_activities_edges_node[];
  orders: number | null;
  ordersToCapture: number | null;
  ordersToFulfill: number | null;
  sales: Home_salesToday_gross;
  topProducts: Home_productTopToday_edges_node[] | null;
  featuredProducts: Home_featuredProducts_edges_node[] | null;
  inactiveProducts: number;
  userName: string;
  onCreateNewChannelClick: () => void;
  onOrdersToCaptureClick: () => void;
  onOrdersToFulfillClick: () => void;
  onProductClick: (productId: string) => void;
  onInactiveProductsClick: () => void;
  noChannel: boolean;
  featuredProductsCollectionId: string | null;
}

const HomePage: React.FC<HomePageProps> = props => {
  const {
    userName,
    orders,
    sales,
    // topProducts,
    featuredProducts,
    onProductClick,
    activities,
    onCreateNewChannelClick,
    onOrdersToCaptureClick,
    onOrdersToFulfillClick,
    onInactiveProductsClick,
    ordersToCapture = 0,
    ordersToFulfill = 0,
    inactiveProducts = 0,
    userPermissions = [],
    noChannel,
    featuredProductsCollectionId
  } = props;

  const intl = useIntl();
  const classes = useStyles(props);

  return (
    <Container>
      <HomeHeader userName={userName} />
      <CardSpacer />
      <Grid>
        <div>
          <RequirePermissions
            userPermissions={userPermissions}
            requiredPermissions={[PermissionEnum.MANAGE_ORDERS]}
          >
            <div className={classes.cardContainer}>
              <AnalyticsCard
                title={intl.formatMessage({
                  defaultMessage: "Orders today"
                })}
                backgroundColor="primary"
                icon={<UilShoppingBag className={classes.iconPrimary} />}
              >
                {noChannel ? 0 : orders !== undefined ? orders : "-"}
              </AnalyticsCard>
              <AnalyticsCard
                title={intl.formatMessage({
                  defaultMessage: "Sales today"
                })}
                backgroundColor="blueGrey"
                icon={<UilAnalysis className={classes.iconBlueGrey} />}
              >
                {noChannel ? 0 : sales ? <Money money={sales} /> : "-"}
              </AnalyticsCard>
            </div>
          </RequirePermissions>
          <HomeNotificationTable
            onCreateNewChannelClick={onCreateNewChannelClick}
            onOrdersToCaptureClick={onOrdersToCaptureClick}
            onOrdersToFulfillClick={onOrdersToFulfillClick}
            onInactiveProductsClick={onInactiveProductsClick}
            ordersToCapture={ordersToCapture}
            ordersToFulfill={ordersToFulfill}
            inactiveProducts={inactiveProducts}
            userPermissions={userPermissions}
            noChannel={noChannel}
          />
          <CardSpacer />
          {featuredProducts && featuredProductsCollectionId && (
            <RequirePermissions
              userPermissions={userPermissions}
              requiredPermissions={[
                PermissionEnum.MANAGE_ORDERS,
                PermissionEnum.MANAGE_PRODUCTS
              ]}
            >
              <HomeProductListCard
                testId="top-products"
                onRowClick={onProductClick}
                featuredProducts={featuredProducts}
              />
              <CardSpacer />
            </RequirePermissions>
          )}
        </div>
        {activities && (
          <div>
            <RequirePermissions
              userPermissions={userPermissions}
              requiredPermissions={[PermissionEnum.MANAGE_ORDERS]}
            >
              <HomeActivityCard
                activities={activities}
                testId="activity-card"
              />
            </RequirePermissions>
          </div>
        )}
      </Grid>
    </Container>
  );
};
HomePage.displayName = "HomePage";
export default HomePage;
