import NotFoundPage from "@saleor/components/NotFoundPage";
import { WindowTitle } from "@saleor/components/WindowTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import React from "react";
import { useIntl } from "react-intl";

import BusinessAddressDialog, {
  BusinessAddressDialogFormData
} from "../components/BusinessAddressDialog";
import BusinessAddressListPage from "../components/BusinessAddressesPage";
import { useCompanyAddressUpdate } from "../mutations";
import { useBusinessDetailsQuery } from "../queries";
import { CompanyAddressUpdate as CompanyAddressUpdateMutationResult } from "../types/CompanyAddressUpdate";
import { businessesListUrl } from "../urls";
import {
  businessAddressesUrl,
  BusinessAddressesUrlDialog,
  BusinessAddressesUrlQueryParams,
  businessUrl
} from "../urls";

interface BusinessAddresssesProps {
  id: string;
  params: BusinessAddressesUrlQueryParams;
}

const BusinessAddresses: React.FC<BusinessAddresssesProps> = ({
  id,
  params
}) => {
  const navigate = useNavigator();
  const intl = useIntl();
  const notify = useNotifier();

  const { data, loading, refetch } = useBusinessDetailsQuery({
    displayLoader: true,
    variables: {
      id
    }
  });
  const [openModal, closeModal] = createDialogActionHandlers<
    BusinessAddressesUrlDialog,
    BusinessAddressesUrlQueryParams
  >(navigate, params => businessAddressesUrl(id, params), params);

  const handleBack = () => navigate(businessesListUrl());

  const handleSuccess = (data: CompanyAddressUpdateMutationResult) => {
    if (!data.companyAddressUpdate.errors.length) {
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges)
      });
      closeModal();
      refetch();
    } else {
      data.companyAddressUpdate.errors.map(error =>
        notify({
          status: "error",
          text: error.message
        })
      );
    }
  };
  const [
    updateBusinessAddress,
    updateBusinessAddressOpt
  ] = useCompanyAddressUpdate({
    onCompleted: handleSuccess
  });
  const business = data?.company;
  const addressId: string = data?.company?.address?.id;
  const onSubmit = async (data: BusinessAddressDialogFormData) => {
    await updateBusinessAddress({
      variables: {
        id: addressId,
        street: data.street,
        streetSecondLine: data.streetSecondLine,
        country: data.country,
        locality: data.locality,
        postalCode: data.postalCode,
        region: data.region,
        longitude: data.longitude,
        latitude: data.latitude
      }
    });
    return [];
  };
  const errors = [
    ...(updateBusinessAddressOpt?.data?.companyAddressUpdate?.errors || [])
  ];

  if (business === null) {
    return <NotFoundPage onBack={handleBack} />;
  }

  return (
    <>
      <WindowTitle title={business?.name} />
      <BusinessAddressListPage
        business={business}
        disabled={loading}
        id={business?.address?.id}
        onBack={() => navigate(businessUrl(id))}
        onEdit={id => openModal("edit", { id })}
      />
      <BusinessAddressDialog
        address={business?.address}
        onClose={closeModal}
        disabled={loading}
        open={params.action === "edit"}
        onSubmit={onSubmit}
        confirmButtonState={updateBusinessAddressOpt.status}
        errors={errors}
      />
    </>
  );
};

export default BusinessAddresses;
