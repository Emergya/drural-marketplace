// import NotFoundPage from "@saleor/components/NotFoundPage";
// import useNavigator from "@saleor/hooks/useNavigator";
// import useNotifier from "@saleor/hooks/useNotifier";
// import useShop from "@saleor/hooks/useShop";
// import { commonMessages } from "@saleor/intl";
// import { stringifyQs } from "@saleor/utils/urls";
// import React from "react";
// import { useIntl } from "react-intl";

// import { maybe } from "../../misc";
// import { LanguageCodeEnum } from "../../types/globalTypes";
// import TranslationsVouchersPage from "../components/TranslationsVouchersPage";
// import { TypedUpdateVoucherTranslations } from "../mutations";
// import { useVoucherTranslationDetails } from "../queries";
// import { TranslationField, TranslationInputFieldName } from "../types";
// import { UpdateVoucherTranslations } from "../types/UpdateVoucherTranslations";
// import {
//   languageEntitiesUrl,
//   languageEntityUrl,
//   TranslatableEntities
// } from "../urls";
// import { getParsedTranslationInputData } from "../utils";

// export interface TranslationsVouchersQueryParams {
//   activeField: string;
// }
// export interface TranslationsVouchersProps {
//   id: string;
//   languageCode: LanguageCodeEnum;
//   params: TranslationsVouchersQueryParams;
// }

// const TranslationsVouchers: React.FC<TranslationsVouchersProps> = ({
//   id,
//   languageCode,
//   params
// }) => {
//   const navigate = useNavigator();
//   const notify = useNotifier();
//   const shop = useShop();
//   const intl = useIntl();

//   const voucherTranslations = useVoucherTranslationDetails({
//     variables: { id, language: languageCode }
//   });

//   const onEdit = (field: string) =>
//     navigate(
//       "?" +
//         stringifyQs({
//           activeField: field
//         }),
//       true
//     );
//   const onUpdate = (data: UpdateVoucherTranslations) => {
//     if (data.voucherTranslate.errors.length === 0) {
//       voucherTranslations.refetch();
//       notify({
//         status: "success",
//         text: intl.formatMessage(commonMessages.savedChanges)
//       });
//       navigate("?", true);
//     }
//   };
//   const onDiscard = () => {
//     navigate("?", true);
//   };
//   const handleBack = () =>
//     navigate(
//       languageEntitiesUrl(languageCode, {
//         tab: TranslatableEntities.vouchers
//       })
//     );

//   return (
//     <TypedUpdateVoucherTranslations onCompleted={onUpdate}>
//       {(updateTranslations, updateTranslationsOpts) => {
//         const handleSubmit = (
//           { name: fieldName }: TranslationField<TranslationInputFieldName>,
//           data: string
//         ) => {
//           updateTranslations({
//             variables: {
//               id,
//               input: getParsedTranslationInputData({
//                 data,
//                 fieldName
//               }),
//               language: languageCode
//             }
//           });
//         };

//         const translation = voucherTranslations?.data?.translation;

//         if (translation === null) {
//           return <NotFoundPage onBack={handleBack} />;
//         }

//         return (
//           <TranslationsVouchersPage
//             activeField={params.activeField}
//             disabled={
//               voucherTranslations.loading || updateTranslationsOpts.loading
//             }
//             languages={maybe(() => shop.languages, [])}
//             languageCode={languageCode}
//             saveButtonState={updateTranslationsOpts.status}
//             onBack={handleBack}
//             onEdit={onEdit}
//             onDiscard={onDiscard}
//             onLanguageChange={lang =>
//               navigate(
//                 languageEntityUrl(lang, TranslatableEntities.vouchers, id)
//               )
//             }
//             onSubmit={handleSubmit}
//             data={
//               translation?.__typename === "VoucherTranslatableContent"
//                 ? translation
//                 : null
//             }
//           />
//         );
//       }}
//     </TypedUpdateVoucherTranslations>
//   );
// };
// TranslationsVouchers.displayName = "TranslationsVouchers";
// export default TranslationsVouchers;
