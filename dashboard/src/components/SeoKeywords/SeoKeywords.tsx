import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@material-ui/core";
import ToggleIcon from "@material-ui/icons/ArrowDropDown";
import DeleteIcon from "@material-ui/icons/Delete";
import { ChangeEvent } from "@saleor/hooks/useForm";
import { removeAtIndex, updateAtIndex } from "@saleor/utils/lists";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { FormattedMessage } from "react-intl";

import { commonMessages } from "../../intl";
import CardTitle from "../CardTitle";
import Skeleton from "../Skeleton";
import { useStyles } from "./styles";
import { EventDataAction, ISeoKeywordsProps } from "./types";
import { keywordFieldName } from "./utils";

const SeoKeywords: React.FC<ISeoKeywordsProps> = ({
  keywords,
  disabled,
  onChange
}) => {
  const intl = useIntl();
  const classes = useStyles();

  const loaded = React.useRef(false);
  const [expanded, setExpanded] = React.useState(true);

  useEffect(() => {
    if (keywords !== undefined) {
      loaded.current = true;
      if (keywords.length > 0) {
        setExpanded(false);
      }
    }
  }, [keywords === undefined]);

  const change = (event: ChangeEvent<string>, index?: number) => {
    const { name, value } = event.target || {};

    onChange(
      name === EventDataAction.add
        ? {
            target: {
              name: keywordFieldName,
              value: [...keywords, value]
            }
          }
        : name === EventDataAction.update
        ? {
            target: {
              name: keywordFieldName,
              value: updateAtIndex(value, keywords, index)
            }
          }
        : {
            target: {
              name: keywordFieldName,
              value: removeAtIndex(keywords, index)
            }
          }
    );
  };

  return (
    <Card>
      <CardTitle title={intl.formatMessage(commonMessages.keywords)} />
      {keywords === undefined ? (
        <CardContent>
          <Skeleton />
        </CardContent>
      ) : (
        <>
          <CardContent className={classes.content}>
            {keywords.length > 0 && (
              <div className={classes.togglable}>
                <Typography color="textSecondary" variant="body2">
                  <FormattedMessage
                    defaultMessage="{number,plural,one{{number} Keyword} other{{number} Keywords}}"
                    description="number of keyword fields in model"
                    values={{
                      number: keywords.length
                    }}
                  />
                </Typography>
                <IconButton
                  data-test="expand"
                  onClick={() => setExpanded(!expanded)}
                >
                  <ToggleIcon />
                </IconButton>
              </div>
            )}
          </CardContent>
          {expanded && (
            <>
              {keywords.length === 0 ? (
                <div className={classes.emptyContainer}>
                  <Typography color="textSecondary">
                    <FormattedMessage
                      defaultMessage="There are no keywords created for this service."
                      description="empty metadata text"
                    />
                  </Typography>
                  <Typography color="textSecondary">
                    <FormattedMessage
                      defaultMessage="Use the button below to add new keyword fields."
                      description="empty metadata text"
                    />
                  </Typography>
                </div>
              ) : (
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.colValue}>
                        <FormattedMessage
                          defaultMessage="Value"
                          description="metadata field value, header"
                        />
                      </TableCell>
                      <TableCell className={classes.colActionHeader}>
                        <FormattedMessage
                          defaultMessage="Actions"
                          description="table action"
                        />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {keywords.map((keyword, keywordIndex) => (
                      <TableRow key={keywordIndex}>
                        <TableCell className={classes.colValue}>
                          <TextField
                            disabled={disabled}
                            InputProps={{
                              classes: {
                                root: classes.input
                              }
                            }}
                            multiline
                            name={EventDataAction.update}
                            fullWidth
                            onChange={event => change(event, keywordIndex)}
                            value={keyword}
                          />
                        </TableCell>
                        <TableCell className={classes.colAction}>
                          <IconButton
                            className={classes.iconButtonDelete}
                            color="primary"
                            disabled={disabled}
                            onClick={() =>
                              change(
                                {
                                  target: {
                                    name: EventDataAction.delete,
                                    value: keyword
                                  }
                                },
                                keywordIndex
                              )
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              <CardActions>
                <Button
                  className={classes.buttonHeader}
                  color="primary"
                  disabled={disabled}
                  onClick={() =>
                    change({
                      target: {
                        name: EventDataAction.add,
                        value: ""
                      }
                    })
                  }
                >
                  <FormattedMessage
                    defaultMessage="Add Field"
                    description="add metadata field,button"
                  />
                </Button>
              </CardActions>
            </>
          )}
        </>
      )}
    </Card>
  );
};

SeoKeywords.displayName = "SeoKeywords";
export default SeoKeywords;
