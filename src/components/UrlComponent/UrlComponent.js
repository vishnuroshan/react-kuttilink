import React from 'react';
import cssClasses from './UrlComponent.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, Box, Link, Paper, List, ListItem, ListItemText, CardActions, CardContent } from "@material-ui/core";



const UrlComponent = (props) => {

    const useStyles = makeStyles({
        root: {
            minWidth: 275,
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    });
    const classes = { ...cssClasses, ...useStyles() };


    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Unique Key
                </Typography>

                <Typography variant="h5" component="h2">
                    {props.uniqueKey}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    short url
                </Typography>

                <Typography variant="h5" component="h2">
                    <Link href={`${process.env.REACT_APP_API_URL}${props.uniqueKey}`}>
                        {`${process.env.REACT_APP_API_URL}${props.uniqueKey}`}
                    </Link>
                </Typography>

                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    original link
                </Typography>

                <Typography variant="h5" component="h2">
                    <Link href={props.url}>{props.url}</Link>
                </Typography>

                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    clicks
                </Typography>

                <Typography variant="h6" component="h2">
                    {props.clicks}
                </Typography>
            </CardContent>

        </Card>
    );
};

export default UrlComponent;