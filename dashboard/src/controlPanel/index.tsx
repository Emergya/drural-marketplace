import { sectionNames } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";
import { Route, Switch } from "react-router";

import { WindowTitle } from "../components/WindowTitle";
import { controlPanelPath } from "./url";
import AdminControlPanelViewComponent from "./views/AdminControlPanel";

const ControlPanelSection: React.FC = () => {
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.statsPanel)} />
      <Switch>
        <Route
          exact
          path={controlPanelPath}
          component={AdminControlPanelViewComponent}
        />
      </Switch>
    </>
  );
};
ControlPanelSection.displayName = "ControlPanelSection";
export default ControlPanelSection;
