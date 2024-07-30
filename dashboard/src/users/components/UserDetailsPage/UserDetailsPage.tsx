import { Backlink } from "@drural/macaw-ui";
import { CardSpacer } from "@saleor/components/CardSpacer";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import Metadata from "@saleor/components/Metadata/Metadata";
import PageHeader from "@saleor/components/PageHeader";
import Savebar from "@saleor/components/Savebar";
import useUser from "@saleor/hooks/useUser";
import { UserType } from "@saleor/users/_types/UserType";
import { getUserTypeMessage } from "@saleor/users/utils";
import { mapEdgesToItems, mapMetadataItemToInput } from "@saleor/utils/maps";
import useMetadataChangeTrigger from "@saleor/utils/metadata/useMetadataChangeTrigger";
import React from "react";
import { useIntl } from "react-intl";

import { getUserName } from "../../../misc";
import UserAddresses from "../UserAddresses";
import UserDetails from "../UserDetails";
import UserInfo from "../UserInfo";
import UserOrders from "../UserOrders";
import UserStats from "../UserStats";
import { useStyles } from "./styles";
import { UserDetailsPageFormData, UserDetailsPageProps } from "./types";

const UserDetailsPage: React.FC<UserDetailsPageProps> = ({
  user,
  disabled,
  errors,
  saveButtonBar,
  type,
  onBack,
  onSubmit,
  onViewAllOrdersClick,
  onRowClick,
  onAddressManageClick,
  onDelete
}) => {
  const intl = useIntl();
  const clsses = useStyles();
  const { user: loggedUser } = useUser();
  const initialForm: UserDetailsPageFormData = {
    email: user?.email || "",
    firstName: user?.firstName || "",
    isActive: user?.isActive || false,
    lastName: user?.lastName || "",
    metadata: user?.metadata.map(mapMetadataItemToInput),
    note: user?.note || "",
    privateMetadata: user?.privateMetadata.map(mapMetadataItemToInput)
  };
  const formDisabled = !loggedUser.isStaff || disabled;

  const {
    makeChangeHandler: makeMetadataChangeHandler
  } = useMetadataChangeTrigger();

  return (
    <Form initial={initialForm} onSubmit={onSubmit} confirmLeave>
      {({ change, data, hasChanged, submit }) => {
        const changeMetadata = makeMetadataChangeHandler(change);

        return (
          <Container>
            <Backlink onClick={onBack}>
              <span className={clsses.backLink}>
                {getUserTypeMessage(intl, type, true)}
              </span>
            </Backlink>
            <PageHeader title={getUserName(user, true)} />
            <Grid>
              <div>
                <UserDetails
                  user={user}
                  data={data}
                  disabled={formDisabled}
                  errors={errors}
                  onChange={change}
                />
                <CardSpacer />
                <UserInfo
                  data={data}
                  disabled={formDisabled}
                  errors={errors}
                  onChange={change}
                />
                <CardSpacer />
                <UserOrders
                  orders={mapEdgesToItems(user?.orders)}
                  onViewAllOrdersClick={onViewAllOrdersClick}
                  onRowClick={onRowClick}
                />
                <CardSpacer />
                <Metadata
                  data={data}
                  disabled={formDisabled}
                  onChange={changeMetadata}
                />
              </div>
              <div>
                <UserAddresses
                  user={user}
                  disabled={disabled}
                  onAddressManageClick={onAddressManageClick}
                />
                <CardSpacer />
                <UserStats user={user} />
              </div>
            </Grid>
            <Savebar
              disabled={formDisabled || !hasChanged}
              state={saveButtonBar}
              onSubmit={submit}
              onCancel={onBack}
              onDelete={
                (type === UserType.CUSTOMER && loggedUser.isStaff) ||
                type === UserType.AGENT
                  ? onDelete
                  : null
              }
            />
          </Container>
        );
      }}
    </Form>
  );
};
UserDetailsPage.displayName = "UserDetailsPage";
export default UserDetailsPage;
