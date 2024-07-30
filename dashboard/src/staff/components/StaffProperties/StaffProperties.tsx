import photoIcon from "@assets/images/photo-icon.svg";
import { makeStyles, SaleorTheme } from "@drural/macaw-ui";
import {
  Card,
  CardContent,
  darken,
  TextField,
  Typography,
  useMediaQuery
} from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import { StaffErrorFragment } from "@saleor/fragments/types/StaffErrorFragment";
import { commonMessages } from "@saleor/intl";
import { getFormErrors } from "@saleor/utils/errors";
import getStaffErrorMessage from "@saleor/utils/errors/staff";
import React from "react";
import SVG from "react-inlinesvg";
import { FormattedMessage, useIntl } from "react-intl";

import { getUserInitials, maybe } from "../../../misc";
import { StaffMemberDetails_user } from "../../types/StaffMemberDetails";

const useStyles = makeStyles(
  theme => ({
    avatar: {
      "& svg": {
        fill: "#fff"
      },
      "&:hover $avatarHover": {
        opacity: 1
      },
      alignItems: "center",
      borderRadius: "100%",
      display: "grid",
      height: 120,
      justifyContent: "center",
      overflow: "hidden",
      position: "relative",
      width: 120,
      [theme.breakpoints.down("md")]: {
        height: 64,
        width: 64,
        marginRight: 35
      }
    },
    avatarWithLinks: {
      [theme.breakpoints.down("md")]: {
        display: "flex",
        alignItems: "center",
        marginBottom: 36
      }
    },
    avatarActionText: {
      "&:hover": {
        textDecoration: "underline"
      },
      color: darken(theme.palette.primary.main, 0.1),
      cursor: "pointer",
      fontSize: 12
    },
    avatarActionTextMobile: {
      "&:hover": {
        color: theme.palette.primary.main
      },
      color: darken(theme.palette.primary.main, 0.1),
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 700
    },
    avatarDefault: {
      "& div": {
        color: "#fff",
        fontSize: 35,
        fontWeight: "bold",
        lineHeight: "120px",
        [theme.breakpoints.down("md")]: {
          fontSize: 24,
          lineHeight: "65px"
        }
      },
      background: darken(theme.palette.primary.main, 0.1),
      height: 120,
      textAlign: "center",
      width: 120,
      [theme.breakpoints.down("md")]: {
        height: 64,
        width: 64
      }
    },
    avatarHover: {
      background: "#00000080",
      borderRadius: "100%",
      fontSize: 12,
      fontWeight: 500,
      height: 120,
      opacity: 0,
      padding: theme.spacing(2.5, 0),
      position: "absolute",
      textAlign: "center",
      textTransform: "uppercase",
      transition: "opacity 0.5s",
      width: 120
    },
    avatarImage: {
      pointerEvents: "none",
      width: "100%"
    },
    fileField: {
      display: "none"
    },
    prop: {
      marginBottom: theme.spacing(2)
    },
    propGrid: {
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(1),
      gridTemplateColumns: "1fr 1fr",
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "1fr"
      }
    },
    root: {
      display: "grid",
      gridColumnGap: theme.spacing(4),
      gridTemplateColumns: "120px 1fr",
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "1fr"
      }
    }
  }),
  { name: "StaffProperties" }
);

interface StaffPropertiesProps {
  canEditAvatar: boolean;
  className?: string;
  data: {
    email: string;
    firstName: string;
    lastName: string;
  };
  errors: StaffErrorFragment[];
  disabled: boolean;
  staffMember: StaffMemberDetails_user;
  onChange: (event: React.ChangeEvent<any>) => void;
  onImageDelete: () => void;
  onImageUpload: (file: File) => void;
}

const StaffProperties: React.FC<StaffPropertiesProps> = props => {
  const {
    canEditAvatar,
    className,
    data,
    errors,
    staffMember,
    onChange,
    onImageDelete,
    onImageUpload
  } = props;

  const classes = useStyles(props);
  const intl = useIntl();
  const imgInputAnchor = React.createRef<HTMLInputElement>();

  const clickImgInput = () => imgInputAnchor.current.click();
  const formErrors = getFormErrors(["id"], errors || []);
  const isMdDown = useMediaQuery((theme: SaleorTheme) =>
    theme.breakpoints.down("md")
  );

  return (
    <Card className={className}>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Staff Member Information",
          description: "section header"
        })}
      />
      <CardContent>
        <div className={classes.root}>
          <div className={classes.avatarWithLinks}>
            <div className={classes.avatar}>
              {maybe(() => staffMember.avatar.url) ? (
                <img
                  className={classes.avatarImage}
                  src={maybe(() => staffMember.avatar.url)}
                />
              ) : (
                <div className={classes.avatarDefault}>
                  <Typography>{getUserInitials(data)}</Typography>
                </div>
              )}
              {!isMdDown && canEditAvatar && (
                <div className={classes.avatarHover}>
                  <SVG src={photoIcon} />
                  <Typography
                    onClick={clickImgInput}
                    className={classes.avatarActionText}
                  >
                    <FormattedMessage
                      defaultMessage="Change photo"
                      description="button"
                    />
                  </Typography>
                  <Typography
                    onClick={onImageDelete}
                    className={classes.avatarActionText}
                  >
                    <FormattedMessage
                      defaultMessage="Delete photo"
                      description="button"
                    />
                  </Typography>
                  <input
                    className={classes.fileField}
                    id="fileUpload"
                    onChange={event => onImageUpload(event.target.files[0])}
                    type="file"
                    ref={imgInputAnchor}
                  />
                </div>
              )}
            </div>
            {isMdDown && canEditAvatar && (
              <div>
                <Typography
                  onClick={clickImgInput}
                  className={classes.avatarActionTextMobile}
                >
                  <FormattedMessage
                    defaultMessage="Change photo"
                    description="button"
                  />
                </Typography>
                <Typography
                  onClick={onImageDelete}
                  className={classes.avatarActionTextMobile}
                >
                  <FormattedMessage
                    defaultMessage="Delete photo"
                    description="button"
                  />
                </Typography>
                <input
                  className={classes.fileField}
                  id="fileUpload"
                  onChange={event => onImageUpload(event.target.files[0])}
                  type="file"
                  ref={imgInputAnchor}
                />
              </div>
            )}
          </div>
          <div>
            <div className={classes.propGrid}>
              <div className={classes.prop}>
                <TextField
                  label={intl.formatMessage(commonMessages.firstName)}
                  value={data.firstName}
                  name="firstName"
                  onChange={onChange}
                  fullWidth
                />
              </div>
              <div className={classes.prop}>
                <TextField
                  label={intl.formatMessage(commonMessages.lastName)}
                  value={data.lastName}
                  name="lastName"
                  onChange={onChange}
                  fullWidth
                />
              </div>
              <div className={classes.prop}>
                <TextField
                  label={intl.formatMessage(commonMessages.email)}
                  value={data.email}
                  name="email"
                  fullWidth
                  disabled={true}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      {!!formErrors.id && (
        <CardContent>
          <Typography color="error">
            {getStaffErrorMessage(formErrors.id, intl)}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};
StaffProperties.displayName = "StaffProperties";
export default StaffProperties;
