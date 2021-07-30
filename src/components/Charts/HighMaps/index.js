import Highchart from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import { useEffect, useState, useRef } from "react";
import { cloneDeep } from "lodash";
//load highcharts modules
highchartsMap(Highchart);
const initOptions = {
  chart: {
    height: "500",
  },
  title: {
    text: null,
  },
  //di chuyển map
  mapNavigation: {
    enabled: true,
  },
  colorAxis: {
    min: 0,
    stops: [
      [0.2, "#FFC4AA"],
      [0.4, "#FF8A66"],
      [0.6, "#FF392B"],
      [0.8, "#B71525"],
      [1, "	#7A0826"],
    ],
  },
  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "bottom",
  },
  series: [
    {
      mapData: {},
      name: "Thành Phố",
      joinBy: ["hc-key", "key"],
    },
  ],
};
export default function HighMaps({ mapData }) {
  const [options, setOptions] = useState({});
  const charRef = useRef(null);
  const [configLoaded, setConfigLoaded] = useState(false);
  console.log(mapData);
  useEffect(() => {
    // Object.keys(mapData).length : Find the length of Object
    if (mapData && Object.keys(mapData).length) {
      const fakeData = mapData.features.map((feature, index) => ({
        key: feature.properties["hc-key"],
        value: index,
      }));
      setOptions({
        ...initOptions,
        title: {
          text: mapData.title,
        },
        series: [{ ...initOptions.series[0], mapData: mapData, data: fakeData }],
      });

      if (!configLoaded) setConfigLoaded(true);
    }
  }, [mapData, configLoaded]);
  useEffect(() => {
    if (charRef && charRef.current) {
      charRef.current.chart.series[0].update({
        mapData: mapData,
      });
    }
  }, [mapData]);
  if (!configLoaded) return null;
  return (
    <HighchartsReact
      highcharts={Highchart}
      options={cloneDeep(options)}
      constructorType="mapChart"
      ref={charRef}
    ></HighchartsReact>
  );
}
