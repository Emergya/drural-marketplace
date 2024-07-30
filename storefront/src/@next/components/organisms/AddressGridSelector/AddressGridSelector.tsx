import { Formik } from "formik";
import React, { useState } from "react";
import { useIntl } from "react-intl";

import { ErrorMessage, Separator } from "@components/atoms";
import { AddressTileOption } from "@components/molecules";
import { checkoutMessages } from "@temp/intl";

import { AddressFormModal } from "../AddressFormModal";
import * as S from "./styles";
import { IProps } from "./types";

/**
 * Addresses tiles to select with add new address tile opening address form addition modal.
 */
const AddressGridSelector: React.FC<IProps> = ({
  addresses,
  selectedAddressId,
  countriesOptions,
  userId,
  errors,
  onSelect,
  formId,
  formRef,
  addNewModalTarget,
  newAddressFormId,
  testingContext,
  columns,
  left,
  noShadow,
  reverse,
}: IProps) => {
  const [displayNewModal, setDisplayNewModal] = useState(false);
  const intl = useIntl();
  const addNewTile = (
    <S.StyledAddNewTile
      data-test={`${testingContext}AddressTileAddNew`}
      key="newTile"
      type={intl.formatMessage({ defaultMessage: "address" })}
      onClick={() => setDisplayNewModal(true)}
      left={left}
      boxShadow="none"
    />
  );

  return (
    <>
      <Formik
        initialValues={{
          addressTileOption: selectedAddressId,
        }}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          if (onSelect) {
            const address = addresses.find(
              addr => addr.id === values.addressTileOption
            );
            onSelect(address?.address, values.addressTileOption);
          }
          setSubmitting(false);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          setFieldValue,
          setFieldTouched,
        }) => {
          return (
            <form id={formId} ref={formRef} onSubmit={handleSubmit}>
              <S.AddressesWrapper>
                {addresses.map(({ id, address }, index) => (
                  <div key={index}>
                    {!!index && <Separator marginTop="16" marginBottom="16" />}
                    <AddressTileOption
                      testingContext={testingContext}
                      data-test={`${testingContext}AddressTileOption`}
                      data-test-id={index}
                      key={`addressTile-${id}`}
                      id={id}
                      inputName="addressTileOption"
                      address={address}
                      onChange={() => setFieldValue("addressTileOption", id)}
                      checked={
                        !!values.addressTileOption &&
                        values.addressTileOption === id
                      }
                    />
                  </div>
                ))}
                <Separator marginTop="16" marginBottom="16" />
                {addNewTile}
              </S.AddressesWrapper>
              <ErrorMessage errors={errors} />
            </form>
          );
        }}
      </Formik>
      {displayNewModal && (
        <AddressFormModal
          hideModal={() => {
            setDisplayNewModal(false);
          }}
          submitBtnText="Add"
          title={intl.formatMessage(checkoutMessages.addNewAddress)}
          countriesOptions={countriesOptions}
          formId={newAddressFormId}
          userId={userId}
          target={addNewModalTarget}
        />
      )}
    </>
  );
};

export { AddressGridSelector };
