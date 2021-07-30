
import { Grid } from '@material-ui/core';
import LineCharts from '../Charts/LineCharts';
import { useEffect, useState } from 'react';
// import HighMaps from './../Charts/HighMaps';
import { getMapDataByCountryId } from './../../api/index';
export default function Summary({report, selectCountryId}) {
    const [mapData , setMapData] = useState({});
    useEffect(() => {
        if(selectCountryId){
            getMapDataByCountryId(selectCountryId)
            .then((res) => {
              setMapData(res);
            })
            .catch((err) => console.log({ err }));
        }
    },[selectCountryId])
    return (
        <Grid container >
            <Grid item sm={12} xs={12}>
                <LineCharts data={report}/>
            </Grid>
            {/* <Grid item sm={4} xs={12}>
                <HighMaps mapData={mapData}/>
            </Grid> */}
        </Grid>
    )
}
