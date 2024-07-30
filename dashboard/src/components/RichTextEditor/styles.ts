import { makeStyles } from "@drural/macaw-ui";
import { fade, lighten } from "@material-ui/core/styles/colorManipulator";

// import { dRural } from "../Theme/dRuralThemes";

const useStyles = makeStyles(
  theme => {
    const hover = {
      "&:hover": {
        background: fade(theme.palette.primary.main, 0.1)
      }
    };

    return {
      formControl: {
        "&:hover label": {
          color: theme.palette.primary.main
        }
      },
      editor: {
        "& .cdx-quote__text": {
          fontSize: 18,
          fontStyle: "italic",
          minHeight: 24
        },
        "& .ce-block--selected .ce-block__content": {
          background: `${fade(theme.palette.primary.main, 0.2)} !important`
        },
        "& .ce-block__content": {
          margin: 0,
          maxWidth: "unset"
        },
        "& .ce-conversion-tool": {
          ...hover
        },
        "& .ce-conversion-tool--focused": {
          background: `${fade(theme.palette.primary.main, 0.1)} !important`
        },
        "& .ce-conversion-tool__icon": {
          background: "none"
        },
        "& .ce-conversion-toolbar": {
          background: theme.palette.background.paper
        },
        // Headings
        "& .ce-header": {
          marginBottom: 0,
          paddingTop: 0,
          paddingBottom: 0
        },
        "& h1.ce-header": {
          fontSize: theme.typography.h1.fontSize,
          fontWeight: theme.typography.h1.fontWeight,
          lineHeight: theme.typography.h1.lineHeight,
          marginBottom: theme.spacing(4)
        },
        "& h2.ce-header": {
          fontSize: theme.typography.h2.fontSize,
          fontWeight: theme.typography.h2.fontWeight,
          lineHeight: theme.typography.h2.lineHeight,
          marginBottom: theme.spacing(3.5)
        },
        "& h3.ce-header": {
          fontSize: theme.typography.h3.fontSize,
          fontWeight: theme.typography.h3.fontWeight,
          lineHeight: theme.typography.h3.lineHeight,
          marginBottom: theme.spacing(3)
        },
        // Text
        "& .ce-paragraph.cdx-block": {
          padding: 0,
          marginTop: theme.spacing(3),
          marginBottom: theme.spacing(3)
        },
        "& b, a": {
          fontWeight: theme.typography.h1.fontWeight
        },
        // List
        "& .cdx-block.cdx-list": {
          padding: 0,
          marginTop: theme.spacing(3),
          marginBottom: theme.spacing(3),
          marginLeft: theme.spacing(5.5)
        },
        "& .cdx-list__item": {
          padding: `0 0 0 ${theme.spacing(1)}`,
          marginBottom: theme.spacing(1)
        },
        "& .cdx-list--unordered .cdx-list__item": {
          listStyleType: "circle"
        },
        "& .ce-inline-tool": {
          ...hover,
          color: theme.palette.text.primary,
          height: 32,
          transition: theme.transitions.duration.short + "ms",
          width: 32
        },
        "& .ce-inline-toolbar": {
          "& input": {
            background: "none"
          },
          background: theme.palette.background.paper,
          color: theme.palette.text.primary
        },
        "& .ce-inline-toolbar__dropdown": {
          ...hover,
          height: 32,
          marginRight: 0
        },
        "& .ce-inline-toolbar__toggler-and-button-wrapper": {
          paddingRight: 0
        },
        "& .ce-toolbar__actions": {
          right: 0,
          top: 0
        },
        "& .ce-toolbar__content": {
          maxWidth: "unset"
        },
        "& .ce-toolbar__plus": {
          left: -9
        },
        "& .ce-toolbox.ce-toolbox--opened": {
          left: 16
        },
        "& .codex-editor__redactor": {
          marginRight: `${theme.spacing(4)}px !important`,
          paddingBottom: "50px !important"
        },
        "& a": {
          color: theme.palette.primary.light
        },
        "&:not($rootDisabled):hover": {
          borderColor: theme.palette.primary.main
        }
      },
      root: {
        border: `1px solid ${lighten(theme.palette.secondary.main, 0.8)}`,
        borderRadius: 4,
        boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.1)",
        fontSize: theme.typography.body1.fontSize,
        minHeight: 56,
        padding: theme.spacing(3, 2),
        paddingBottom: theme.spacing(),
        paddingLeft: 10,
        position: "relative",
        transition: theme.transitions.duration.short + "ms",

        "&:hover": {
          backgroundColor: lighten(theme.palette.primary.main, 0.9)
        }
      },
      rootActive: {
        border: `2px solid ${theme.palette.primary.main}`
      },
      rootDisabled: {
        ...theme.overrides.MuiOutlinedInput.root["&$disabled"]["& fieldset"]
      },
      rootError: {
        borderColor: theme.palette.error.main
      }
    };
  },
  { name: "RichTextEditor" }
);

export default useStyles;
