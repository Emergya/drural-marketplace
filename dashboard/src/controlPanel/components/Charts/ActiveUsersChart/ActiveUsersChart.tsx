import { Card, CardContent } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import { ActiveUserQuantityStat_activeUserQuantityStat } from "@saleor/controlPanel/types/ActiveUserQuantityStat";
import useDateLocalize from "@saleor/hooks/useDateLocalize";
import ReactECharts from "echarts-for-react";
import React from "react";
import { useIntl } from "react-intl";
interface ActiveUsersChartProps {
  chartsTheme: string;
  data: ActiveUserQuantityStat_activeUserQuantityStat[];
}

const ActiveUsersChart: React.FC<ActiveUsersChartProps> = ({
  chartsTheme,
  data
}) => {
  const localizeDate = useDateLocalize();
  const dateList = data?.map(item => localizeDate(item.date, "ll"));
  const valuesList = data?.map(item => item.total);

  const options = {
    grid: { right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: "category",
      data: dateList
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: valuesList,
        type: "line"
      }
    ],
    tooltip: {
      trigger: "axis"
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: "none"
        },
        magicType: { type: ["line", "bar"] },
        saveAsImage: {}
      }
    }
  };
  const intl = useIntl();
  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Active users",
          description: "Stat title"
        })}
      />
      <CardContent>
        <ReactECharts option={options} theme={chartsTheme} />
      </CardContent>
    </Card>
  );
};

export default ActiveUsersChart;
