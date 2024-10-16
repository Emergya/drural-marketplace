import { Backlink, makeStyles } from "@drural/macaw-ui";
import { Card, CardContent, Typography } from "@material-ui/core";
import AccountPermissionGroups from "@saleor/components/AccountPermissionGroups";
import AccountStatus from "@saleor/components/AppStatus";
import CardSpacer from "@saleor/components/CardSpacer";
import CardTitle from "@saleor/components/CardTitle";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import { MultiAutocompleteChoiceType } from "@saleor/components/MultiAutocompleteSelectField";
import PageHeader from "@saleor/components/PageHeader";
import Savebar from "@saleor/components/Savebar";
import { StaffErrorFragment } from "@saleor/fragments/types/StaffErrorFragment";
import { SubmitPromise } from "@saleor/hooks/useForm";
import useLocale from "@saleor/hooks/useLocale";
import useNavigator from "@saleor/hooks/useNavigator";
import useStateFromProps from "@saleor/hooks/useStateFromProps";
import { sectionNames } from "@saleor/intl";
import { getUserName } from "@saleor/misc";
import { SearchPermissionGroups_search_edges_node } from "@saleor/searches/types/SearchPermissionGroups";
import { FetchMoreProps, SearchPageProps } from "@saleor/types";
import createMultiAutocompleteSelectHandler from "@saleor/utils/handlers/multiAutocompleteSelectChangeHandler";
import React from "react";
import { useIntl } from "react-intl";

import { StaffMemberDetails_user } from "../../types/StaffMemberDetails";
import StaffPassword from "../StaffPassword/StaffPassword";
import StaffPreferences from "../StaffPreferences";
import StaffProperties from "../StaffProperties/StaffProperties";

export interface StaffDetailsFormData {
  email: string;
  firstName: string;
  isActive: boolean;
  lastName: string;
  permissionGroups: string[];
}

const useStyles = makeStyles(
  {
    textDescription: {
      fontSize: "12px",
      fontWeight: 400,
      opacity: "60%"
    }
  },
  { name: "PageHeader" }
);

export interface StaffDetailsPageProps extends SearchPageProps {
  availablePermissionGroups: SearchPermissionGroups_search_edges_node[];
  canEditAvatar: boolean;
  canEditPreferences: boolean;
  canEditStatus: boolean;
  canRemove: boolean;
  disabled: boolean;
  fetchMorePermissionGroups: FetchMoreProps;
  saveButtonBarState: ConfirmButtonTransitionState;
  staffMember: StaffMemberDetails_user;
  errors: StaffErrorFragment[];
  onBack: () => void;
  onChangePassword: () => void;
  onDelete: () => void;
  onImageDelete: () => void;
  onSubmit: (data: StaffDetailsFormData) => SubmitPromise;
  onImageUpload(file: File);
}

const StaffDetailsPage: React.FC<StaffDetailsPageProps> = ({
  availablePermissionGroups,
  canEditAvatar,
  canEditPreferences,
  canEditStatus,
  canRemove,
  disabled,
  errors,
  fetchMorePermissionGroups,
  initialSearch,
  onBack,
  onChangePassword,
  onDelete,
  onImageDelete,
  onImageUpload,
  onSearchChange,
  onSubmit,
  saveButtonBarState,
  staffMember
}: StaffDetailsPageProps) => {
  const intl = useIntl();
  const { locale, setLocale } = useLocale();
  const [
    permissionGroupsDisplayValues,
    setPermissionGroupsDisplayValues
  ] = useStateFromProps<MultiAutocompleteChoiceType[]>(
    (staffMember?.permissionGroups || []).map(group => ({
      disabled: !group.userCanManage,
      label: group.name,
      value: group.id
    })) || []
  );

  const initialForm: StaffDetailsFormData = {
    email: staffMember?.email || "",
    firstName: staffMember?.firstName || "",
    isActive: !!staffMember?.isActive,
    lastName: staffMember?.lastName || "",
    permissionGroups: staffMember?.permissionGroups.map(pg => pg.id) || []
  };
  const classes = useStyles();
  const navigate = useNavigator();

  // If User is a Seller, Backlink changes to home instead of stafflist

  const hasSellerGroup = React.useMemo(() => {
    const sellerGroup = staffMember?.permissionGroups.filter(
      group => group.name === "Sellers"
    );
    return sellerGroup?.length > 0;
  }, [staffMember?.permissionGroups]);

  return (
    <Form initial={initialForm} onSubmit={onSubmit} confirmLeave>
      {({ data: formData, change, hasChanged, submit, toggleValue }) => {
        const permissionGroupsChange = createMultiAutocompleteSelectHandler(
          toggleValue,
          setPermissionGroupsDisplayValues,
          permissionGroupsDisplayValues,
          availablePermissionGroups?.map(group => ({
            label: group.name,
            value: group.id
          })) || []
        );

        return (
          <Container>
            <Backlink
              onClick={() => {
                if (hasSellerGroup) {
                  navigate("/");
                } else {
                  onBack();
                }
              }}
            >
              {hasSellerGroup
                ? intl.formatMessage(sectionNames.home)
                : intl.formatMessage(sectionNames.staff)}
            </Backlink>
            <PageHeader title={getUserName(staffMember)} />
            <Grid>
              <div>
                <StaffProperties
                  errors={errors}
                  data={formData}
                  disabled={disabled}
                  canEditAvatar={canEditAvatar}
                  staffMember={staffMember}
                  onChange={change}
                  onImageUpload={onImageUpload}
                  onImageDelete={onImageDelete}
                />
                {canEditPreferences && (
                  <>
                    <CardSpacer />
                    <StaffPassword onChangePassword={onChangePassword} />
                  </>
                )}
              </div>
              <div>
                {canEditPreferences && (
                  <StaffPreferences
                    locale={locale}
                    onLocaleChange={setLocale}
                  />
                )}
                {canEditStatus && (
                  <>
                    <Card>
                      <CardTitle
                        title={intl.formatMessage({
                          defaultMessage: "Permissions",
                          description: "dialog header"
                        })}
                      />
                      <CardContent>
                        <Typography className={classes.textDescription}>
                          {intl.formatMessage({
                            defaultMessage: "User is assigned to:",
                            description: "card description"
                          })}
                        </Typography>

                        <AccountPermissionGroups
                          formData={formData}
                          disabled={disabled}
                          errors={errors}
                          initialSearch={initialSearch}
                          availablePermissionGroups={availablePermissionGroups}
                          onChange={permissionGroupsChange}
                          onSearchChange={onSearchChange}
                          displayValues={permissionGroupsDisplayValues}
                          {...fetchMorePermissionGroups}
                        />
                      </CardContent>
                    </Card>
                    <CardSpacer />
                    <AccountStatus
                      data={formData}
                      disabled={disabled}
                      label={intl.formatMessage({
                        defaultMessage: "User is active",
                        description: "checkbox label"
                      })}
                      disableName="User"
                      onChange={change}
                    />
                  </>
                )}
              </div>
            </Grid>
            <Savebar
              hasChanged={hasChanged}
              disabled={disabled}
              state={saveButtonBarState}
              onCancel={() => {
                if (hasSellerGroup) {
                  navigate("/");
                } else {
                  onBack();
                }
              }}
              onSubmit={submit}
              onDelete={canRemove ? onDelete : undefined}
            />
          </Container>
        );
      }}
    </Form>
  );
};
StaffDetailsPage.displayName = "StaffDetailsPage";
export default StaffDetailsPage;
