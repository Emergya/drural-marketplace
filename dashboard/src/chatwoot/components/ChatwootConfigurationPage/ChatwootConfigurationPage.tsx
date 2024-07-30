import { Backlink } from "@drural/macaw-ui";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import { configurationMenuUrl } from "@saleor/configuration";
import useNavigator from "@saleor/hooks/useNavigator";
import { sectionNames } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";

import ChatwootConfiguration from "../ChatwootConfiguration/ChatwootConfiguration";
import { ChatwootConfigurationType } from "../ChatwootConfiguration/types";
import { getIntialData } from "../ChatwootConfiguration/utils";
import { IChatwootConfigurationPageProps } from "./types";

export const ChatwootConfigurationPage: React.FC<IChatwootConfigurationPageProps> = ({
  chatwootCredentials,
  disabled,
  errors,
  onCreateChatwoot,
  onResetChatwootPassword,
  onToggleChatwoot
}) => {
  const navigate = useNavigator();
  const intl = useIntl();

  return (
    <Container>
      <Backlink
        onClick={() => {
          navigate(configurationMenuUrl);
        }}
      >
        {intl.formatMessage(sectionNames.configuration)}
      </Backlink>
      <PageHeader title={intl.formatMessage(sectionNames.chatwoot)} inline />
      <Grid>
        <div>
          <Form
            initial={getIntialData(chatwootCredentials)}
            onSubmit={() => null}
            confirmLeave
          >
            {({ change, set, data }) => (
              <ChatwootConfiguration
                data={data}
                disabled={disabled}
                errors={errors}
                type={ChatwootConfigurationType.shop}
                onChange={change}
                onSet={set}
                onCreateChatwoot={onCreateChatwoot}
                onToggleChatwoot={onToggleChatwoot}
                onResetChatwootPassword={onResetChatwootPassword}
              />
            )}
          </Form>
        </div>
      </Grid>
    </Container>
  );
};

export default ChatwootConfigurationPage;
