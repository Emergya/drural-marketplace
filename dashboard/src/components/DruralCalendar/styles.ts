import leftArrowIcon from "@assets/images/dRuralIcons/arrow-left.svg";
import rightArrowIcon from "@assets/images/dRuralIcons/arrow-right.svg";
import { makeStyles } from "@drural/macaw-ui";
import { darken, lighten } from "@material-ui/core";

export const useStyles = makeStyles(
  theme => ({
    datePicker: {
      // calendar general
      "& .react-datepicker, & .react-datepicker__current-month": {
        border: "none",
        fontFamily: "inherit",
        fontSize: 12,
        fontWeight: "500",
        lineHeight: "25px"
      },
      // month
      "& .react-datepicker__current-month": {
        marginBottom: 20
      },
      // calendar header
      "& .react-datepicker__header": {
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
        margin: `0 ${theme.spacing(1)}`
      },
      // day spacing
      "& .react-datepicker__day, .react-datepicker__day-name": {
        lineHeight: "25px",
        margin: 1,
        width: 25,
        "&:hover": {
          borderRadius: "50%"
        }
      },
      // arrows icon
      "& .react-datepicker__navigation-icon": {
        height: 15,
        marginTop: 3,
        width: 15,
        "&:before": {
          display: "none"
        }
      },
      "& .react-datepicker__navigation-icon--next": {
        backgroundColor: theme.palette.primary.main,
        maskImage: `url(${rightArrowIcon})`,
        maskRepeat: "no-repeat"
      },
      "& .react-datepicker__navigation-icon--previous": {
        backgroundColor: theme.palette.primary.main,
        maskImage: `url(${leftArrowIcon})`,
        maskRepeat: "no-repeat"
      },
      // selection styles
      "& .react-datepicker__day--in-selecting-range": {
        backgroundColor: `rgba(157,237,212, 0.5)`,
        borderRadius: "50%",
        color: "#000",
        "&:hover": {
          backgroundColor: `rgba(27,151,112, 0.5)`
        }
      },
      "& .react-datepicker__day--in-range": {
        backgroundColor: lighten(theme.palette.primary.main, 0.5),
        borderRadius: "50%",
        color: "#000"
      },
      "& .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected, .react-datepicker__day--range-end": {
        backgroundColor: darken(theme.palette.primary.main, 0.2),
        borderRadius: "50%",
        color: "#FFF"
      }
    }
  }),
  { name: "DruralCalendar" }
);
