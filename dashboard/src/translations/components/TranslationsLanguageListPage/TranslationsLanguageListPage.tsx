import { makeStyles } from "@drural/macaw-ui";
import { UilConstructor } from "@iconscout/react-unicons";
import Container from "@saleor/components/Container";
import PageHeader from "@saleor/components/PageHeader";
// tslint:disable no-submodule-imports
import { ShopInfo_shop_languages } from "@saleor/components/Shop/types/ShopInfo";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";

import TranslationsLanguageList from "../TranslationsLanguageList";

export interface TranslationsLanguageListPageProps {
  languages: ShopInfo_shop_languages[];
  //   onAdd: () => void;
  onRowClick: (code: string) => void;
}

const useStyles = makeStyles(
  theme => ({
    underConstruction: {
      display: "flex",
      justifyContent: "space-between",
      width: "50%",
      alignItems: "center",
      borderRadius: "10px",
      backgroundColor: "#fece00",
      padding: "10px 20px 10px 20px",
      marginBottom: "20px",
      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
      [theme.breakpoints.down("md")]: {
        width: "100%"
      }
    },
    constructionText: {
      width: "85%",
      margin: "0",
      fontWeight: "bold"
    }
  }),
  { name: "UnderConstruction" }
);

const TranslationsLanguageListPage: React.FC<TranslationsLanguageListPageProps> = ({
  languages,
  onRowClick
}) => {
  const intl = useIntl();
  const classes = useStyles();
  return (
    <Container>
      <div className={classes.underConstruction}>
        <UilConstructor size={40} />
        <p className={classes.constructionText}>
          <FormattedMessage defaultMessage="This section is under construction. You can make the translations but they will not be propagated throughout the application" />
        </p>
      </div>
      <PageHeader
        title={intl.formatMessage({
          defaultMessage: "Languages"
        })}
      >
        {/* <Button color="primary" variant="contained" onClick={onAdd}>
        <FormattedMessage
      defaultMessage="Add Language"
      description="button"
    />
       
      </Button> */}
      </PageHeader>
      <TranslationsLanguageList languages={languages} onRowClick={onRowClick} />
    </Container>
  );
};
TranslationsLanguageListPage.displayName = "TranslationsLanguageListPage";
export default TranslationsLanguageListPage;
