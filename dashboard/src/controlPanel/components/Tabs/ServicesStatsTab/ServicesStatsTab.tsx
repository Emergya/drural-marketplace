import { makeStyles } from "@drural/macaw-ui";
import {
  UilClockEight,
  UilShoppingBag,
  UilShoppingBasket,
  UilStar
} from "@iconscout/react-unicons";
import AnalyticsCard from "@saleor/components/AnalyticsCard";
import CardSpacer from "@saleor/components/CardSpacer";
// import CardSpacer from "@saleor/components/CardSpacer";
import Grid from "@saleor/components/Grid";
import SmallList from "@saleor/components/SmallList";
// import SmallList from "@saleor/components/SmallList";
import {
  useContractedServiesStatQuery,
  useFeaturedProductsTotalCountQuery,
  useGetProductsStatsQuery,
  useIncludedServicesStatQuery,
  useRecentlyCreatedServices
} from "@saleor/controlPanel/queries";
import useNavigator from "@saleor/hooks/useNavigator";
import { productListUrl, productUrl } from "@saleor/products/urls";
import { OrderDirection, ProductOrderField } from "@saleor/types/globalTypes";
import { mapEdgesToItems } from "@saleor/utils/maps";
import React from "react";
import { useIntl } from "react-intl";

import ContractedServiesChart from "../../Charts/ContractedServicesChart";
import IncludedServicesChart from "../../Charts/IncludedServicesChart";

const useStyles = makeStyles(
  theme => ({
    cardContainer: {
      display: "grid",
      gridColumnGap: "2.6rem",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
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
    iconRed: {
      "& path": {
        fill: "#FFA3A3"
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
  { name: "ServicesStatsTab" }
);
interface ServicesStatsTabProps {
  chartsTheme: string;
  startDate: string;
  endDate: string;
}
const ServicesStatsTab: React.FC<ServicesStatsTabProps> = ({
  chartsTheme,
  startDate,
  endDate
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const navigate = useNavigator();

  // getting last 30 days date to get recently created services data
  const [todayDate] = React.useState(new Date());
  const [priorDateNumber] = React.useState(
    new Date().setDate(todayDate.getDate() - 30)
  );
  const [priorDate] = React.useState(new Date(priorDateNumber));

  // date variables to be used on the query variable
  const timeRange = {
    gte: startDate,
    lte: endDate
  };

  // Query variables
  const includedServicesQueryVariables = {
    period: { ...timeRange }
  };
  const contractedServicesQueryVariables = {
    period: { ...timeRange }
  };
  const totalServicesQueryVariables = {
    first: 1
  };
  const totalPublishedServicesQueryVariables = {
    first: 1,
    filter: { isPublished: true }
  };
  const totalFeaturedServicesQueryVariables = {
    first: 1,
    filter: { search: "featured-products" }
  };
  const recentlyCreatedServicesQueryVariables = {
    first: 1,
    filter: {
      createdDate: {
        gte: priorDate.toISOString(),
        lte: todayDate.toISOString()
      }
    }
  };
  const mostContractedServicesQueryVariables = {
    first: 5,
    filter: {
      consumption: {
        ...timeRange
      }
    },
    sortBy: {
      field: ProductOrderField.CONSUMPTION,
      direction: OrderDirection.DESC
    }
  };
  const lastCreatedServicesQueryVariables = {
    first: 5,
    filter: {
      createdDate: {
        ...timeRange
      }
    },
    sortBy: {
      field: ProductOrderField.PUBLICATION_DATE,
      direction: OrderDirection.DESC
    }
  };
  const worstRatedServicesQueryVariable = {
    first: 5,
    filter: {
      hasReviewInRange: {
        ...timeRange
      }
    },
    sortBy: {
      field: ProductOrderField.RATING,
      direction: OrderDirection.ASC
    }
  };
  const bestRatedServicesQueryVariable = {
    first: 5,
    filter: {
      hasReviewInRange: {
        ...timeRange
      }
    },
    sortBy: {
      field: ProductOrderField.RATING,
      direction: OrderDirection.DESC
    }
  };

  const { data: includedServicesData } = useIncludedServicesStatQuery({
    displayLoader: true,
    variables: includedServicesQueryVariables
  });
  const { data: contractedServicesData } = useContractedServiesStatQuery({
    displayLoader: true,
    variables: contractedServicesQueryVariables
  });
  const { data: totalServices } = useGetProductsStatsQuery({
    displayLoader: true,
    variables: totalServicesQueryVariables
  });
  const { data: totalPublishedServices } = useGetProductsStatsQuery({
    displayLoader: true,
    variables: totalPublishedServicesQueryVariables
  });
  const { data: totalFeaturedServices } = useFeaturedProductsTotalCountQuery({
    displayLoader: true,
    variables: totalFeaturedServicesQueryVariables
  });
  const { data: recentlyCreatedServices } = useRecentlyCreatedServices({
    displayLoader: true,
    variables: recentlyCreatedServicesQueryVariables
  });
  const { data: mostContractedServices } = useGetProductsStatsQuery({
    displayLoader: true,
    variables: mostContractedServicesQueryVariables
  });
  const { data: lastCreatedServices } = useGetProductsStatsQuery({
    displayLoader: true,
    variables: lastCreatedServicesQueryVariables
  });
  const { data: bestRatedServices } = useGetProductsStatsQuery({
    displayLoader: true,
    variables: bestRatedServicesQueryVariable
  });
  const { data: worstRatedServices } = useGetProductsStatsQuery({
    displayLoader: true,
    variables: worstRatedServicesQueryVariable
  });

  return (
    <>
      <div className={classes.cardContainer}>
        <AnalyticsCard
          title={intl.formatMessage({
            defaultMessage: "Total Services",
            description: "Stadistics card title"
          })}
          icon={<UilShoppingBag className={classes.iconPrimary} />}
          backgroundColor="primary"
        >
          {totalServices ? totalServices?.products.totalCount : "-"}
        </AnalyticsCard>
        <AnalyticsCard
          title={intl.formatMessage({
            defaultMessage: "Active Services",
            description: "Stadistics card title"
          })}
          icon={<UilShoppingBasket className={classes.iconSecondary} />}
          backgroundColor="secondary"
        >
          {totalPublishedServices
            ? totalPublishedServices?.products.totalCount
            : "-"}
        </AnalyticsCard>
        {/* TODO GET  RECENTLY CREATED AND FEATURED DATA*/}
        <AnalyticsCard
          title={intl.formatMessage({
            defaultMessage: "Featured Services",
            description: "Stadistics card title"
          })}
          icon={<UilStar className={classes.iconBlueGray} />}
          backgroundColor="blueGrey"
        >
          {totalFeaturedServices &&
          totalFeaturedServices?.collections?.edges.length
            ? totalFeaturedServices?.collections?.edges[0]?.node.products
                .totalCount
            : "-"}
        </AnalyticsCard>
        <AnalyticsCard
          title={intl.formatMessage({
            defaultMessage: "Recently Created",
            description: "Stadistics card title"
          })}
          icon={<UilClockEight className={classes.iconRed} />}
          backgroundColor="red"
        >
          {recentlyCreatedServices?.products.totalCount >= 0
            ? recentlyCreatedServices?.products.totalCount
            : "-"}
        </AnalyticsCard>
      </div>
      <Grid variant="uniform">
        <div>
          <IncludedServicesChart
            chartsTheme={chartsTheme}
            data={includedServicesData?.productAdditionStat}
          />
          <CardSpacer />
          <SmallList
            title={intl.formatMessage({
              defaultMessage: "Most consumed services"
            })}
            services={mapEdgesToItems(mostContractedServices?.products)}
            category
            onLinkClick={() => navigate(productListUrl())}
            onRowClick={id => () => navigate(productUrl(id))}
          />
          <CardSpacer />
          <SmallList
            title={intl.formatMessage({
              defaultMessage: "Best rated services"
            })}
            services={mapEdgesToItems(bestRatedServices?.products)}
            rating
            onLinkClick={() => navigate(productListUrl())}
            onRowClick={id => () => navigate(productUrl(id))}
          />
        </div>
        <div>
          <ContractedServiesChart
            chartsTheme={chartsTheme}
            data={contractedServicesData?.productConsumptionStat}
          />
          <CardSpacer />
          <SmallList
            title={intl.formatMessage({
              defaultMessage: "Last services created"
            })}
            services={mapEdgesToItems(lastCreatedServices?.products)}
            category
            onLinkClick={() => navigate(productListUrl())}
            onRowClick={id => () => navigate(productUrl(id))}
          />
          <CardSpacer />
          <SmallList
            title={intl.formatMessage({
              defaultMessage: "Worst rated services"
            })}
            services={mapEdgesToItems(worstRatedServices?.products)}
            rating
            onLinkClick={() => navigate(productListUrl())}
            onRowClick={id => () => navigate(productUrl(id))}
          />
        </div>
      </Grid>
    </>
  );
};
export default ServicesStatsTab;
