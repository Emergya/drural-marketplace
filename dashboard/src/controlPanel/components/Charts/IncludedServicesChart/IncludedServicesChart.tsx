import { Card, CardContent, lighten, useTheme } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import { IncludedServicesStat_productAdditionStat } from "@saleor/controlPanel/types/IncludedServicesStat";
import useDateLocalize from "@saleor/hooks/useDateLocalize";
import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";
import React from "react";
import { useIntl } from "react-intl";

interface IncludedServicesChartProps {
  chartsTheme: string;
  data: IncludedServicesStat_productAdditionStat[];
}

const IncludedServicesChart: React.FC<IncludedServicesChartProps> = ({
  chartsTheme,
  data
}) => {
  const intl = useIntl();
  const localizeDate = useDateLocalize();

  const dateList = data?.map(item => localizeDate(item.date, "ll"));
  const valuesList1 = data?.map(item => item.total);
  // TODO in case we are going to implement this chart to bring data from different categories,
  // uncomment lines in this file
  // const valuesList2 = data?.map(item => item.serie[1].total);
  // const valuesList3 = data?.map(item => item.serie[2].total);
  // const valuesList4 = data?.map(item => item.serie[3].total);
  // const valuesList5 = data?.map(item => item.serie[4].total);
  const theme = useTheme();

  const options = {
    color: [
      theme.palette.primary.main,
      "#00DDFF",
      "#37A2FF",
      "#FF0087",
      "#FFBF00"
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985"
        }
      }
    },
    // legend: {
    //   // TODO These should be differents categories, to be implemented in future improvements
    //   data: ["Art & Books", "Baby & Children", "Beauty", "Sports", "Farming"]
    // },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none"
        },
        magicType: { type: ["line", "bar"] },
        saveAsImage: {}
      }
    },
    grid: { right: 8, bottom: 24, left: 36 },

    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: dateList
      }
    ],
    yAxis: [
      {
        type: "value"
      }
    ],
    series: [
      {
        name: "",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: lighten(theme.palette.primary.main, 0.5)
            },
            {
              offset: 1,
              color: theme.palette.primary.main
            }
          ])
        },
        emphasis: {
          focus: "series"
        },
        data: valuesList1
      }
      // lines below are commented because it is unused ATM, if we are going to show more data sets
      // in this same chart, then, uncomment them
      // {
      //   name: "Baby & Children",
      //   type: "line",
      //   stack: "Total",
      //   smooth: true,
      //   lineStyle: {
      //     width: 0
      //   },
      //   showSymbol: false,
      //   areaStyle: {
      //     opacity: 0.8,
      //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //       {
      //         offset: 0,
      //         color: "rgba(0, 221, 255)"
      //       },
      //       {
      //         offset: 1,
      //         color: "rgba(77, 119, 255)"
      //       }
      //     ])
      //   },
      //   emphasis: {
      //     focus: "series"
      //   },
      //   data: valuesList2
      // },
      // {
      //   name: "Beauty",
      //   type: "line",
      //   stack: "Total",
      //   smooth: true,
      //   lineStyle: {
      //     width: 0
      //   },
      //   showSymbol: false,
      //   areaStyle: {
      //     opacity: 0.8,
      //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //       {
      //         offset: 0,
      //         color: "rgba(55, 162, 255)"
      //       },
      //       {
      //         offset: 1,
      //         color: "rgba(116, 21, 219)"
      //       }
      //     ])
      //   },
      //   emphasis: {
      //     focus: "series"
      //   },
      //   data: valuesList3
      // },
      // {
      //   name: "Sports",
      //   type: "line",
      //   stack: "Total",
      //   smooth: true,
      //   lineStyle: {
      //     width: 0
      //   },
      //   showSymbol: false,
      //   areaStyle: {
      //     opacity: 0.8,
      //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //       {
      //         offset: 0,
      //         color: "rgba(255, 0, 135)"
      //       },
      //       {
      //         offset: 1,
      //         color: "rgba(135, 0, 157)"
      //       }
      //     ])
      //   },
      //   emphasis: {
      //     focus: "series"
      //   },
      //   data: valuesList4
      // },
      // {
      //   name: "Farming",
      //   type: "line",
      //   stack: "Total",
      //   smooth: true,
      //   lineStyle: {
      //     width: 0
      //   },
      //   showSymbol: false,
      //   label: {
      //     show: true,
      //     position: "top"
      //   },
      //   areaStyle: {
      //     opacity: 0.8,
      //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //       {
      //         offset: 0,
      //         color: "rgba(255, 191, 0)"
      //       },
      //       {
      //         offset: 1,
      //         color: "rgba(224, 62, 76)"
      //       }
      //     ])
      //   },
      //   emphasis: {
      //     focus: "series"
      //   },
      //   data: valuesList5
      // }
    ]
  };
  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Included services",
          description: "Stat title"
        })}
      />
      <CardContent>
        <ReactECharts option={options} theme={chartsTheme} />
      </CardContent>
    </Card>
  );
};
export default IncludedServicesChart;
