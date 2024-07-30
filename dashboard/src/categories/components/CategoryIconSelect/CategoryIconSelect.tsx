import { makeStyles } from "@drural/macaw-ui";
import { Button, Card, CardContent } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import SelectIconTile from "@saleor/components/SelectIconTile";
import React from "react";
import { useIntl } from "react-intl";

const useStyles = makeStyles(
  theme => ({
    buttonHeader: {
      "& .MuiButton-label": {
        fontSize: theme.typography.body2.fontSize,
        fontWeight: 700,
        lineHeight: "21px",
        textTransform: "uppercase"
      }
    }
  }),
  {
    name: "NewPasswordPage"
  }
);

export interface CategoryIconSelectProps {
  iconName: string;
  openModal: () => void;
}

export const CategoryIconSelect: React.FC<CategoryIconSelectProps> = ({
  iconName,
  openModal
}) => {
  const intl = useIntl();

  const classes = useStyles();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Category icon",
          id: "categoryIcon"
        })}
        toolbar={
          <Button
            className={classes.buttonHeader}
            color="primary"
            variant="text"
            onClick={openModal}
          >
            {intl.formatMessage({
              defaultMessage: "Choose icon",
              id: "chooseIcon"
            })}
          </Button>
        }
      />
      <CardContent>
        <SelectIconTile iconName={iconName} openModal={openModal} />
      </CardContent>
    </Card>
  );
};

export default CategoryIconSelect;
