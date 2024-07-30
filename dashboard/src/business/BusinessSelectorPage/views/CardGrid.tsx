import { makeStyles } from "@drural/macaw-ui";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { ActiveBusinessesList_companies_edges } from "@saleor/components/BusinessProvider/types/ActiveBusinessesList";
import React from "react";
import { FormattedMessage } from "react-intl";

interface BusinessList {
  businessList: ActiveBusinessesList_companies_edges[];
  setActiveBusiness: (index: number) => void;
}

const useStyles = makeStyles(
  theme => ({
    wrapper: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      columnGap: "10px",
      rowGap: "20px",
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr 1fr",
        rowGap: "16px"
      }
    },
    card: {
      width: "90%",
      maxWidth: "257px",
      justifySelf: "center",
      [theme.breakpoints.down("sm")]: {
        minWidth: "160px",
        width: "100%"
      }
    },
    cardContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "30px"
    },
    cardText: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingLeft: "0px",
      paddingRight: "0px"
    },
    media: {
      borderRadius: "50%",
      width: "112px",
      objectFit: "contain",
      [theme.breakpoints.down("sm")]: {
        width: "80px",
        height: "80px"
      }
    },
    cardActions: { justifyContent: "center", marginBottom: "8px" },
    button: {
      [theme.breakpoints.down("sm")]: {
        paddingLeft: "17px",
        paddingRight: "17px"
      }
    }
  }),
  { name: "BusinessSelectorPage" }
);

export const BusinessesGrid: React.FC<BusinessList> = ({
  businessList,
  setActiveBusiness
}) => {
  const classes = useStyles({});

  return (
    <div className={classes.wrapper}>
      {businessList.map((business, index) => (
        <Card key={business.node.id} className={classes.card}>
          <div className={classes.cardContent}>
            <CardMedia
              className={classes.media}
              component="img"
              height="112"
              image={business.node.imageUrl}
            />
            <CardContent className={classes.cardText}>
              <Typography gutterBottom variant="h4" component="h2">
                {business.node.publicName}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <FormattedMessage
                  defaultMessage="{totalCount} services published"
                  values={{
                    totalCount: business?.node?.products?.totalCount || 0
                  }}
                />
              </Typography>
            </CardContent>
          </div>
          <CardActions className={classes.cardActions}>
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              onClick={() => {
                setActiveBusiness(index);
              }}
            >
              <FormattedMessage defaultMessage="Select this shop" />
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};
