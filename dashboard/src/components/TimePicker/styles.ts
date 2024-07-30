import { makeStyles } from "@drural/macaw-ui";
import { darken, lighten } from "@material-ui/core";

export const useStyles = makeStyles(
  theme => ({
    errorMessageColor: {
      color: theme.palette.error.main
    },
    fullwidth: {
      width: "100%"
    },
    helperText: {
      margin: "4px 0 0",
      fontSize: 12,
      lineHeight: "20px",
      paddingLeft: theme.spacing(1.5)
    },
    helperTextColor: {
      color: "#616161"
    },
    popup: {
      "& .ant-picker-panel-container": {
        borderRaius: 4
      },

      "& .ant-picker-time-panel-cell-selected .ant-picker-time-panel-cell-inner": {
        backgroundColor: `${lighten(
          theme.palette.primary.main,
          0.85
        )} !important`
      },

      "& .ant-picker-ok": {
        width: "100%",

        "& button": {
          width: "100%"
        }
      },

      "& .ant-btn-primary": {
        backgroundColor: darken(theme.palette.primary.main, 0.1),
        border: "none",
        borderRadius: 100,
        color: theme.palette.common.white,
        height: "26px",
        padding: "0 10px",

        "&:hover": {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white
        },

        "&[disabled]": {
          backgroundColor: "#E5E5E5",
          color: theme.palette.common.white
        }
      }
    },
    timePicker: {
      height: theme.spacing(6),
      border: "1px solid",
      boxSizing: "border-box",
      boxShadow: "0px 4px 16px rgb(0 0 0 / 10%)",
      borderRadius: 4,
      transition: "0s",

      "&.ant-picker-focused": {
        borderWidth: "2px !important"
      },

      "& .ant-picker-active-bar": {
        display: "none"
      },

      "& .ant-picker-input": {
        "& input": {
          fontSize: theme.typography.body1.fontSize,
          lineHeight: theme.typography.body1.lineHeight
        }
      }
    },
    timePickerColors: {
      borderColor: "#E6E6E6",

      "&:hover": {
        backgroundColor: lighten(theme.palette.primary.main, 0.9),
        borderColor: theme.palette.primary.main
      },

      "&.ant-picker-focused": {
        borderColor: theme.palette.primary.main
      },

      "&.ant-picker-disabled": {
        backgroundColor: "#F3F3F3",
        borderColor: "#E6E6E6",
        color: "rgba(0, 0, 0, 0.2)",

        "& .ant-picker-input": {
          "& input": {
            "&::placeholder": {
              color: "rgba(0, 0, 0, 0.2)"
            },

            "&:hover": {
              "&::placeholder": {
                color: "rgba(0, 0, 0, 0.2)"
              }
            },

            "&:focus": {
              "&::placeholder": {
                color: "rgba(0, 0, 0, 0.2)"
              }
            }
          }
        },

        "& .ant-picker-range-separator svg, .ant-picker-suffix svg": {
          color: "rgba(0, 0, 0, 0.15)"
        }
      },

      "& .ant-picker-input": {
        "& input": {
          "&::placeholder": {
            color: "rgba(0, 0, 0, 0.5)"
          },

          "&:hover": {
            "&::placeholder": {
              color: theme.palette.primary.main
            }
          },

          "&:focus": {
            "&::placeholder": {
              color: theme.palette.primary.main
            }
          }
        }
      }
    },
    timePickerErrorColors: {
      border: `2px solid ${theme.palette.error.main} !important`,

      "&:hover": {
        backgroundColor: theme.palette.common.white,
        borderColor: theme.palette.error.main
      },

      "&.ant-picker-focused": {
        borderColor: theme.palette.error.main
      },

      "& .ant-picker-input": {
        "& input": {
          "&::placeholder": {
            color: theme.palette.error.main
          },

          "&:hover": {
            "&::placeholder": {
              color: theme.palette.error.main
            }
          },

          "&:focus": {
            "&::placeholder": {
              color: theme.palette.error.main
            }
          }
        }
      },

      "& .ant-picker-range-separator svg, .ant-picker-suffix svg": {
        color: theme.palette.error.main
      }
    },
    width: {
      width: 300,

      [theme.breakpoints.down("xs")]: {
        width: "100%"
      }
    }
  }),
  {
    name: "TimePicker"
  }
);
