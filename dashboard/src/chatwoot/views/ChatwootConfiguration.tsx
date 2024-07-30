import { STOREFRONT_URI } from "@saleor/config";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";
import NotFound from "@saleor/NotFound";
import getChatwootErrorMessage from "@saleor/utils/errors/chatwoot";
import React from "react";
import { useIntl } from "react-intl";

import { ChatwootConfigurationFormData } from "../components/ChatwootConfigurationForm/types";
import { ChatwootConfigurationPage } from "../components/ChatwootConfigurationPage";
import {
  useShopChatwootCreateQuery,
  useShopChatwootUpdateQuery
} from "../mutations";
import { useShopChatwoot } from "../queries";
import { ShopChatwootCreate } from "../types/ShopChatwootCreate";
import { ShopChatwootUpdate } from "../types/ShopChatwootUpdate";

export const ChatwootConfiguration: React.FC = () => {
  const notify = useNotifier();
  const intl = useIntl();
  const { data, loading, refetch } = useShopChatwoot({});
  const { chatwootCredentials } = data?.shop || {};

  const showSuccessNotification = () => {
    notify({
      status: "success",
      text: intl.formatMessage(commonMessages.savedChanges)
    });
  };

  const handleCreateChatwootSuccess = (data: ShopChatwootCreate) => {
    const { errors } = data.shopChatwootCreate || {};

    if (errors.length) {
      errors.forEach(error =>
        notify({
          status: "error",
          text: getChatwootErrorMessage(error, intl)
        })
      );
    } else {
      showSuccessNotification();
      refetch();
    }
  };

  const handleUpdateChatwootSuccess = (data: ShopChatwootUpdate) => {
    const { errors } = data.shopChatwootUpdate || {};

    if (errors.length) {
      errors.forEach(error =>
        notify({
          status: "error",
          text: getChatwootErrorMessage(error, intl)
        })
      );
    } else {
      showSuccessNotification();
      refetch();
    }
  };

  const [createChatwoot, createChatwootOpts] = useShopChatwootCreateQuery({
    onCompleted: handleCreateChatwootSuccess
  });
  const [updateChatwoot, updateChatwootOpts] = useShopChatwootUpdateQuery({
    onCompleted: handleUpdateChatwootSuccess
  });

  const handleChatwootCreate = (data: ChatwootConfigurationFormData) =>
    createChatwoot({
      variables: {
        input: {
          isActive: true,
          email: data.chatEmail,
          password: data.chatPassword,
          websiteUrl: STOREFRONT_URI || ""
        }
      }
    });

  const handleChatwootToggle = (data: ChatwootConfigurationFormData) =>
    updateChatwoot({
      variables: {
        input: {
          isActive: !data.isChatActive
        }
      }
    });

  const handleChatwootPasswordReset = (data: ChatwootConfigurationFormData) =>
    updateChatwoot({
      variables: {
        input: {
          password: data.chatPassword
        }
      }
    });

  const errors = [
    ...(createChatwootOpts.data?.shopChatwootCreate?.errors || []),
    ...(updateChatwootOpts.data?.shopChatwootUpdate?.errors || [])
  ];

  if (!data) {
    return <NotFound />;
  }

  return (
    <ChatwootConfigurationPage
      chatwootCredentials={chatwootCredentials}
      errors={errors}
      disabled={loading}
      onCreateChatwoot={handleChatwootCreate}
      onResetChatwootPassword={handleChatwootPasswordReset}
      onToggleChatwoot={handleChatwootToggle}
    />
  );
};

export default ChatwootConfiguration;
