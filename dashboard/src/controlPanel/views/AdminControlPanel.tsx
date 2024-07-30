import { useTheme } from "@material-ui/core";
import * as echarts from "echarts";
import React from "react";

import echartTheme from "../../theme/charts-theme.json";
import AdminControlPanelPage from "../components/AdminControlPanelPage";

const AdminControlPanelView = () => {
  // charts theme

  const theme = useTheme();

  echarts.registerTheme("dRuralTheme", {
    ...echartTheme.theme,
    color: [theme.palette.primary.main]
  });

  return <AdminControlPanelPage chartsTheme="dRuralTheme" />;
};

export default AdminControlPanelView;
