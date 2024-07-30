import { Box, Container, Tab, Tabs, Typography } from "@material-ui/core";
import DatePicker from "@saleor/components/DatePicker";
import PageHeader from "@saleor/components/PageHeader";
import React from "react";
import { defineMessages } from "react-intl";
import { useIntl } from "react-intl";

import BusinessesStatsTab from "../Tabs/BusinessesStatsTab";
import ServicesStatsTab from "../Tabs/ServicesStatsTab";
import UserStatsTab from "../Tabs/UsersStatsTab";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const statsTabNames = defineMessages({
  users: {
    defaultMessage: "Users Stats",
    description: "tab title"
  },
  businesses: {
    defaultMessage: "Businesses Stats",
    description: "tab title"
  },
  services: {
    defaultMessage: "Services Stats",
    description: "tab title"
  }
});

interface AdminControlPanelPageProps {
  chartsTheme: string;
}

const AdminControlPanelPage: React.FC<AdminControlPanelPageProps> = ({
  chartsTheme
}) => {
  const intl = useIntl();

  const [value, setValue] = React.useState<number>(0);
  const [startDate, setStartDate] = React.useState<string>();
  const [endDate, setEndDate] = React.useState<string>();

  // controlling selected tab funcs
  function a11yProps(index: number) {
    return {
      id: `stats-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }
  const handleChange = (__, newValue: number) => {
    setValue(newValue);
  };

  const handleDates = (from: Date, to: Date) => {
    // we have to declare new dates and operate on the new ones, otherwise, we will be
    // changing the date from the children, in this case, from the datePicker
    const fromDate = new Date(from);
    const toDate = new Date(to);
    setStartDate(new Date(fromDate.setUTCHours(0, 0, 0, 0)).toISOString());
    setEndDate(new Date(toDate.setUTCHours(23, 59, 0, 0)).toISOString());
  };
  return (
    <Container>
      <Tabs value={value} onChange={handleChange}>
        <Tab
          label={intl.formatMessage(statsTabNames.users)}
          {...a11yProps(0)}
        />
        <Tab
          label={intl.formatMessage(statsTabNames.services)}
          {...a11yProps(1)}
        />
        <Tab
          label={intl.formatMessage(statsTabNames.businesses)}
          {...a11yProps(2)}
        />
      </Tabs>
      <PageHeader>
        <DatePicker handleDates={handleDates} />
      </PageHeader>
      <TabPanel value={value} index={0}>
        <UserStatsTab
          chartsTheme={chartsTheme}
          startDate={startDate}
          endDate={endDate}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ServicesStatsTab
          chartsTheme={chartsTheme}
          startDate={startDate}
          endDate={endDate}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <BusinessesStatsTab
          chartsTheme={chartsTheme}
          startDate={startDate}
          endDate={endDate}
        />
      </TabPanel>
    </Container>
  );
};
export default AdminControlPanelPage;
