import React from 'react'
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
const useStyles = makeStyles({
    wrapper : (props) => {
        if(props.type === 'confirmed') return {borderLeft: '5px solid #c9302c'} ;
        if(props.type === 'recovered') return {borderLeft: '5px solid #28a745'} ;
        if(props.type === 'daily') return {borderLeft: '5px solid blue'};
        else return {borderLeft: '5px solid gray'}
    }

});
export default function HighlighCard({summary}) {
    const classes = useStyles({type: summary.type});
    return (
        <Card className={classes.wrapper}>
          <CardContent>
            <Typography component="p" variant="body2">
              {summary.title}
            </Typography>
            <Typography component="span" variant="body2">
             {summary.count}
            </Typography>
          </CardContent>
        </Card>
    )
}
