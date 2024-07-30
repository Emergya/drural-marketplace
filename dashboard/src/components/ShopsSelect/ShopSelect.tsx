import { makeStyles } from "@drural/macaw-ui";
import { mapNodeToChoice } from "@saleor/utils/maps";
import React from "react";

import SingleSelectField from "../SingleSelectField";

const useStyles = makeStyles(
  theme => ({
    root: {
      "&& fieldset": {
        borderColor: theme.palette.divider
      },
      marginRight: theme.spacing(2),
      width: 192
    }
  }),
  {
    name: "ShopSelect"
  }
);

export interface ShopSelectProps {
  disabled: boolean;
  shops: [];
  shop: string;
  //   onShopSelect: (id: string) => void;
}

const ShopSelect: React.FC<ShopSelectProps> = ({
  shops,
  shop
  //   disabled,
  //   onShopSelect,
}) => {
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <SingleSelectField
        testId="app-business-select"
        choices={mapNodeToChoice(shops)}
        value={shop}
        onChange={() => null}
        name="businessList"
      />
    </div>
  );
};

ShopSelect.displayName = "ShopSelect";
export default ShopSelect;
