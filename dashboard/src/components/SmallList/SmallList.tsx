import faceImg from "@assets/images/NotAvailableFace.svg";
import { makeStyles } from "@drural/macaw-ui";
import {
  Card,
  lighten,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";
import Link from "@saleor/components/Link";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import TableCellAvatar from "@saleor/components/TableCellAvatar";
import { AVATAR_MARGIN } from "@saleor/components/TableCellAvatar/Avatar";
import { GetProducts_products_edges_node } from "@saleor/controlPanel/types/GetProducts";
import { MostSalesBusinesses_companies_edges_node } from "@saleor/controlPanel/types/MostSalesBusinesses";
import { maybe, renderCollection } from "@saleor/misc";
import React from "react";
import SVG from "react-inlinesvg";
import { FormattedMessage } from "react-intl";

import { BusinessesList_companies_edges_node } from "../../business/types/BusinessesList";
import DruralRating from "../Rating";

const useStyles = makeStyles(
  theme => ({
    colCount: {
      textAlign: "center"
    },
    colNameHeader: {
      cursor: "default"
    },
    colNameHeadertext: {
      marginLeft: AVATAR_MARGIN
    },
    publicName: {
      overflow: "hidden",
      paddingRight: 20,
      textOverflow: "ellipsis"
    },
    table: {
      [theme.breakpoints.up("xs")]: {
        marginBottom: theme.spacing(2)
      }
    },
    tableHeaderCustom: {
      borderBottom: `1px solid ${lighten(theme.palette.secondary.main, 0.8)}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 24px"
    },
    tableHeaderLink: {
      flexShrink: 0
    },
    noContent: {
      display: "flex",
      alignContent: "center",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "column",
      padding: "10%"
    }
  }),
  { name: "BusinessesListSmall" }
);

interface SmallListProps {
  businesses?:
    | BusinessesList_companies_edges_node[]
    | MostSalesBusinesses_companies_edges_node[];
  services?: GetProducts_products_edges_node[];
  loading?: boolean;
  title: string;
  onLinkClick: () => void;
  onRowClick: (id: string) => () => void;
  category?: boolean;
  rating?: boolean;
}

const SmallList: React.FC<SmallListProps> = ({
  businesses,
  services,
  rating,
  category,
  title,
  onLinkClick,
  onRowClick
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.table}>
      <div className={classes.tableHeaderCustom}>
        <Typography variant="h6">{title}</Typography>
        <Link className={classes.tableHeaderLink} onClick={onLinkClick}>
          <FormattedMessage defaultMessage="See all" />
        </Link>
      </div>
      <ResponsiveTable>
        {(services && services.length === 0) ||
        (businesses && businesses.length === 0) ? (
          <div className={classes.noContent}>
            <SVG src={faceImg} />
            <Typography>
              <FormattedMessage defaultMessage="Nothing happened in this time range here" />
            </Typography>
          </div>
        ) : (
          <>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" />
                <TableCell
                  className={classes.colNameHeader}
                  data-test-id="colTypeHeader"
                >
                  <span className={classes.colNameHeadertext}>
                    {businesses ? (
                      <FormattedMessage defaultMessage="Shop name" />
                    ) : (
                      <FormattedMessage defaultMessage="Service name" />
                    )}
                    s{" "}
                  </span>
                </TableCell>
                {services && category && (
                  <TableCell>
                    <span>
                      <FormattedMessage defaultMessage="Category" />
                    </span>
                  </TableCell>
                )}
                {services && rating && (
                  <TableCell>
                    <span>
                      <FormattedMessage defaultMessage="Rating" />
                    </span>
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {businesses &&
                renderCollection(businesses, (business, index) => {
                  index++;
                  return (
                    <TableRow
                      key={business ? business.id : "skeleton"}
                      onClick={business ? onRowClick(business.id) : undefined}
                    >
                      <TableCell
                        className={classes.colCount}
                        padding="checkbox"
                      >
                        <FormattedMessage
                          defaultMessage="{index}"
                          values={{ index }}
                        />
                      </TableCell>
                      <TableCellAvatar
                        thumbnail={maybe(() => `${business.imageUrl}`)}
                      >
                        {business ? (
                          <div className={classes.publicName}>
                            {business?.publicName}
                          </div>
                        ) : (
                          <Skeleton />
                        )}
                      </TableCellAvatar>
                    </TableRow>
                  );
                })}
              {services &&
                renderCollection(services, (service, i) => {
                  i++;
                  return (
                    <TableRow
                      key={service && service.id}
                      onClick={onRowClick(service.id)}
                    >
                      <TableCell
                        className={classes.colCount}
                        padding="checkbox"
                      >
                        {i}
                      </TableCell>
                      <TableCellAvatar
                        thumbnail={maybe(() => `${service.thumbnail.url}`)}
                      >
                        {service ? (
                          <div className={classes.publicName}>
                            {service?.name}
                          </div>
                        ) : (
                          <Skeleton />
                        )}
                      </TableCellAvatar>
                      {category && (
                        <TableCell>{service.category.name}</TableCell>
                      )}
                      {rating && (
                        <TableCell>
                          <DruralRating
                            placeholderRating={service.rating}
                            readonly
                          />
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
            </TableBody>
          </>
        )}
      </ResponsiveTable>
    </Card>
  );
};
export default SmallList;
