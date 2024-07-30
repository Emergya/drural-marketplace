import { makeStyles } from "@drural/macaw-ui";
import { UilAngleDown } from "@iconscout/react-unicons";
import { IconButton, TextField, Typography } from "@material-ui/core";
import { fade, lighten } from "@material-ui/core/styles/colorManipulator";
import Debounce, { DebounceProps } from "@saleor/components/Debounce";
import { FetchMoreProps } from "@saleor/types";
import classNames from "classnames";
import Downshift, { ControllerStateAndHelpers } from "downshift";
import { filter } from "fuzzaldrin";
import React from "react";

import CloseIcon from "../CloseIcon";
import MultiAutocompleteSelectFieldContent, {
  MultiAutocompleteActionType,
  MultiAutocompleteChoiceType
} from "./MultiAutocompleteSelectFieldContent";

const useStyles = makeStyles(
  theme => ({
    chip: {
      width: "100%"
    },
    chipClose: {
      height: 32,
      padding: 0,
      width: 32
    },
    iconClose: {
      display: "flex",
      alignItems: "center"
    },
    chipContainer: {
      display: "flex",
      flexDirection: "column",
      marginTop: theme.spacing(1)
    },
    chipInner: {
      "& svg": {
        color: "#000",
        width: "16px",
        height: "16px"
      },
      alignItems: "center",
      borderRadius: 4,
      color: "#000",
      display: "flex",
      justifyContent: "space-between",
      margin: theme.spacing(1, 0),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1)
    },
    chipInnerPrimary: {
      background: lighten(theme.palette.primary.main, 0.7)
    },
    chipInnerSecondary: {
      background: lighten(theme.palette.alert.paper.warning, 0.7)
    },
    chipLabel: {
      color: "#000",
      fontSize: "14px"
    },
    container: {
      flexGrow: 1,
      position: "relative",
      paddingBottom: "8px"
    },
    disabledChipInner: {
      "& svg": {
        color: theme.palette.grey[200]
      },
      alignItems: "center",
      background: fade(theme.palette.grey[400], 0.8),
      borderRadius: 18,
      color: theme.palette.primary.contrastText,
      display: "flex",
      justifyContent: "space-between",
      margin: theme.spacing(1, 0),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1)
    },
    adornment: {
      display: "flex",
      alignItems: "center"
    }
  }),
  { name: "MultiAutocompleteSelectField" }
);

export interface MultiAutocompleteSelectFieldProps
  extends Partial<FetchMoreProps> {
  add?: MultiAutocompleteActionType;
  allowCustomValues?: boolean;
  cardColor?: "primary" | "secondary";
  displayValues: MultiAutocompleteChoiceType[];
  error?: boolean;
  name: string;
  choices: MultiAutocompleteChoiceType[];
  value: string[];
  loading?: boolean;
  placeholder?: string;
  helperText?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  testId?: string;
  fetchChoices?: (value: string) => void;
  onChange: (event: React.ChangeEvent<any>) => void;
  onBlur?: () => void;
  fetchOnFocus?: boolean;
  endAdornment?: React.ReactNode;
}

const DebounceAutocomplete: React.ComponentType<DebounceProps<
  string
>> = Debounce;

const MultiAutocompleteSelectFieldComponent: React.FC<MultiAutocompleteSelectFieldProps> = props => {
  const {
    add,
    allowCustomValues,
    choices,
    displayValues,
    error,
    hasMore,
    helperText,
    label,
    loading,
    name,
    placeholder,
    value,
    disabled,
    required,
    cardColor,
    testId,
    fetchChoices,
    onChange,
    onBlur,
    onFetchMore,
    fetchOnFocus,
    endAdornment
    /* ...rest */
  } = props;
  const classes = useStyles(props);

  const handleSelect = (
    item: string,
    downshiftOpts?: ControllerStateAndHelpers
  ) => {
    if (downshiftOpts) {
      downshiftOpts.reset({ inputValue: "" });
    }
    onChange({
      target: { name, value: item }
    } as any);
  };

  return (
    <>
      <DebounceAutocomplete debounceFn={fetchChoices}>
        {debounceFn => (
          <Downshift
            onInputValueChange={value => debounceFn(value)}
            onSelect={handleSelect}
            itemToString={() => ""}
            // this is to prevent unwanted state updates when the dropdown is closed with an empty value,
            // which downshift interprets as the value being updated with an empty string, causing side-effects
            stateReducer={(state, changes) => {
              if (changes.isOpen === false && state.inputValue === "") {
                delete changes.inputValue;
              }
              return changes;
            }}
          >
            {({
              closeMenu,
              getInputProps,
              getItemProps,
              isOpen,
              toggleMenu,
              highlightedIndex,
              inputValue
            }) => {
              const displayCustomValue =
                inputValue &&
                inputValue.length > 0 &&
                allowCustomValues &&
                !choices.find(
                  choice =>
                    choice.label.toLowerCase() === inputValue.toLowerCase()
                );

              return (
                <div className={classes.container} /* {...rest} */>
                  <TextField
                    InputProps={{
                      ...getInputProps({
                        placeholder
                      }),
                      endAdornment: (
                        <div className={classes.adornment}>
                          {endAdornment}
                          <UilAngleDown onClick={() => toggleMenu()} />
                        </div>
                      ),
                      id: undefined,
                      onBlur,
                      onClick: toggleMenu,
                      onFocus: () => {
                        if (fetchOnFocus) {
                          fetchChoices(inputValue);
                        }
                      }
                    }}
                    error={error}
                    helperText={helperText}
                    label={label}
                    fullWidth={true}
                    disabled={disabled}
                    required={required}
                  />
                  {isOpen && (
                    <MultiAutocompleteSelectFieldContent
                      add={
                        add && {
                          ...add,
                          onClick: () => {
                            add.onClick();
                            closeMenu();
                          }
                        }
                      }
                      choices={choices.filter(
                        choice => !value.includes(choice.value)
                      )}
                      displayCustomValue={displayCustomValue}
                      displayValues={displayValues}
                      getItemProps={getItemProps}
                      hasMore={hasMore}
                      highlightedIndex={highlightedIndex}
                      loading={loading}
                      inputValue={inputValue}
                      onFetchMore={onFetchMore}
                    />
                  )}
                </div>
              );
            }}
          </Downshift>
        )}
      </DebounceAutocomplete>
      <div className={classes.chipContainer}>
        {displayValues.map(value => (
          <div className={classes.chip} key={value.value}>
            <div
              className={classNames(
                !value.disabled ? classes.chipInner : classes.disabledChipInner,
                cardColor === "secondary"
                  ? classes.chipInnerSecondary
                  : classes.chipInnerPrimary
              )}
            >
              <Typography className={classes.chipLabel}>
                {value.label}
              </Typography>

              <IconButton
                data-test-id={testId ? `${testId}Remove` : "remove"}
                className={classes.chipClose}
                disabled={value.disabled}
                onClick={() => handleSelect(value.value)}
              >
                <CloseIcon className={classes.iconClose} />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const MultiAutocompleteSelectField: React.FC<MultiAutocompleteSelectFieldProps> = ({
  choices,
  fetchChoices,
  testId,
  ...props
}) => {
  const [query, setQuery] = React.useState("");

  if (fetchChoices) {
    return (
      <MultiAutocompleteSelectFieldComponent
        testId={testId}
        choices={choices}
        {...props}
        fetchChoices={fetchChoices}
      />
    );
  }

  return (
    <MultiAutocompleteSelectFieldComponent
      fetchChoices={q => setQuery(q || "")}
      choices={filter(choices, query, {
        key: "label"
      })}
      {...props}
    />
  );
};

MultiAutocompleteSelectField.displayName = "MultiAutocompleteSelectField";
export default MultiAutocompleteSelectField;
