import { Grid } from "@material-ui/core";
import HighLightCard from "./HighlighCard";
import { useState, useEffect } from "react";
export default function HighLight({ report }) {
  const [data, setData] = useState({});
  const [daily, setDaily] = useState(null);
  useEffect(() => {
    if(report){
      const reportNow = report[report.length - 1];
      const reportBefore = report[report.length -2];
      if(reportNow && reportBefore){
        const reportDaily = reportNow.Confirmed - reportBefore.Confirmed;
        setDaily(reportDaily);
      }
    }
  }, [report])
  const [summary, setSummary] = useState([]);
  useEffect(() => {
    if (report) {
      setData(report[report.length - 1]);
    }
  }, [report]);
  useEffect(() => {
    if (data) {
      setSummary([
        {
          title: "Số ca nhiễm",
          count: data.Confirmed,
          type: "confirmed",
        },
        {
          title: "Số ca nhiễm qua ngày",
          count: daily,
          type: "daily",
        },
        {
          title: "Số ca khỏi",
          count: data.Recovered,
          type: "recovered",
        },
        {
          title: "Số tử vong",
          count: data.Deaths,
          type: "dead",
        },        
      ]);
    }
  }, [data, daily]);

  return (
    <Grid container spacing={3}>
      {summary.map((i) => (
        <Grid key={i.type} item xs={12} sm={3}>
          <HighLightCard  summary={i} />
        </Grid>
      ))}
    </Grid>
  );
}
