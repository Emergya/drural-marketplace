import { makeStyles, SaleorTheme } from "@drural/macaw-ui";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  useMediaQuery
} from "@material-ui/core";
import { buttonMessages } from "@saleor/intl";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { FixedSizeGrid as Grid } from "react-window";

import CloseIcon from "../CloseIcon";
import IconTile from "../IconTile";
import { iconsList } from "./utils";
interface SelectIconDialogProps {
  onIconSelect: (iconName: string) => void;
  open: boolean;
  onClose: () => void;
}

const useStyles = makeStyles(
  theme => ({
    closeIcon: {
      position: "absolute",
      top: theme.spacing(3),
      right: theme.spacing(3),
      [theme.breakpoints.down("md")]: {
        top: theme.spacing(2.5),
        right: theme.spacing(2.5),
        "& svg": {
          width: "16px",
          height: "16px"
        }
      }
    },
    iconWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    dialog: {
      position: "relative",
      padding: "30px 30px 10px 30px",
      [theme.breakpoints.down("md")]: {
        padding: "0px"
      }
    },
    titleContainer: {
      [theme.breakpoints.down("md")]: {
        maxWidth: "250px",
        margin: "auto"
      }
    },
    title: {
      marginBottom: "60px",
      [theme.breakpoints.down("md")]: {
        fontSize: "18px",
        marginBottom: "60px",
        lineHeight: "30px"
      }
    },
    input: {
      padding: "14.5px 12px"
    },
    root: {
      flex: 1,
      "& div": {
        height: 48
      }
    },
    searchWrapper: {
      position: "absolute",
      top: "100px",
      left: "0",
      padding: "8px 74px 8px 74px",
      width: "100%",
      backgroundColor: "#F7F6F8",
      [theme.breakpoints.down("md")]: {
        top: "90px",
        padding: "8px 16px 8px 16px"
      }
    },
    actions: {
      paddingTop: "35px",
      borderTop: "none",
      justifyContent: "center"
    },

    backButton: {
      paddingLeft: "48px",
      paddingRight: "48px",
      marginRight: "10px",
      [theme.breakpoints.down("md")]: {
        paddingLeft: "25px",
        paddingRight: "25px",
        marginRight: "0px"
      }
    },
    selectButton: {
      paddingLeft: "48px",
      paddingRight: "48px",
      [theme.breakpoints.down("md")]: {
        paddingLeft: "25px",
        paddingRight: "25px"
      }
    }
  }),
  { name: "SelectIconDialog" }
);
export const SelectIconDialog: React.FC<SelectIconDialogProps> = ({
  onIconSelect,
  onClose,
  open
}) => {
  const intl = useIntl();
  const [search, setSearch] = React.useState("");
  const [searchIcons, setSearchIcons] = React.useState(iconsList);
  const [selectedIcon, setSelectedIcon] = React.useState("");
  const isMdDown = useMediaQuery((theme: SaleorTheme) =>
    theme.breakpoints.down("md")
  );

  const classes = useStyles();

  const columnRowSize = React.useMemo(() => (isMdDown ? 100 : 110), [isMdDown]);

  const gridWidth = React.useMemo(() => (isMdDown ? 330 : 1030), [isMdDown]);

  const numberColumns = React.useMemo(
    () =>
      isMdDown
        ? searchIcons.length >= 3
          ? 3
          : searchIcons.length
        : searchIcons.length >= 9
        ? 9
        : searchIcons.length,
    [isMdDown, searchIcons]
  );

  const numberRows = React.useMemo(() => {
    const rowNumber = Math.floor(searchIcons.length / numberColumns);
    return rowNumber ? rowNumber : 1;
  }, [searchIcons, numberColumns]);

  const handleSearchChange = (event: React.ChangeEvent<any>) => {
    const value = event.target.value;
    setSearch(value);
    if (value === "") {
      setSearchIcons(iconsList);
    } else {
      const searchIcons = iconsList.filter(iconName =>
        iconName.toLowerCase().includes(value.toLowerCase())
      );
      setSearchIcons(searchIcons);
    }
  };

  return (
    <Dialog
      classes={{ paper: classes.dialog }}
      onClose={onClose}
      open={open}
      maxWidth="lg"
    >
      <CloseIcon className={classes.closeIcon} onClose={onClose} />
      <DialogTitle className={classes.titleContainer}>
        <Typography variant="h2" className={classes.title}>
          <FormattedMessage
            defaultMessage="Select icon from library"
            description="dialog title"
          />
        </Typography>
      </DialogTitle>
      <div className={classes.searchWrapper}>
        <TextField
          variant="outlined"
          fullWidth
          value={search}
          type="text"
          onChange={handleSearchChange}
          className={classes.root}
          inputProps={{
            className: classes.input,
            placeholder: intl.formatMessage({
              defaultMessage: "Search icons..."
            })
          }}
        />
      </div>

      <DialogContent>
        <Grid
          columnCount={numberColumns}
          columnWidth={columnRowSize}
          height={530}
          rowCount={numberRows}
          rowHeight={columnRowSize}
          width={gridWidth}
        >
          {({ rowIndex, columnIndex, style }) => (
            <div className={classes.iconWrapper} style={style}>
              <IconTile
                iconName={
                  isMdDown
                    ? searchIcons[rowIndex * 3 + columnIndex]
                    : searchIcons[rowIndex * 9 + columnIndex]
                }
                selectedIconName={selectedIcon}
                selectIcon={(iconName: string) => setSelectedIcon(iconName)}
              />
            </div>
          )}
        </Grid>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button
          onClick={onClose}
          color="secondary"
          variant="outlined"
          className={classes.backButton}
        >
          <FormattedMessage {...buttonMessages.cancel} />
        </Button>
        <Button
          className={classes.selectButton}
          color="primary"
          variant="contained"
          onClick={() => {
            onIconSelect(selectedIcon);
            onClose();
          }}
          disabled={!selectedIcon}
        >
          <FormattedMessage
            defaultMessage="Use this icon"
            description="button"
          />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectIconDialog;
