import React, { useState } from 'react';
import classes from './ShortenUrl.module.css';
import Clipboard from 'react-clipboard.js';
import API from '../../apis/url-api';
import ValidUrl from 'valid-url';
import { TextField, Link, Button, Paper, Grid } from '@material-ui/core';
import Dashboard from '../Dashboard/Dashboard';

const ShortenUrl = (props) => {
    console.log('shortenURL::> ', props)
    const [url, setUrl] = useState();
    const [shortUrl, setShortUrl] = useState();

    const shorten = () => {
        if (ValidUrl.isUri(url)) {
            API.shorten(url).then((shortUrl) => {
                setShortUrl(shortUrl);
                // props.history.push('/url')
            });
        } else { alert('please paste a valid url'); }
    }

    let urlText;
    if (shortUrl) {
        urlText = <React.Fragment>
            <Link href={shortUrl}>
                {shortUrl}
            </Link>
            <Clipboard data-clipboard-text={shortUrl}>
                copy url
                </Clipboard>
        </React.Fragment>
    }
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} style={{ alignContent: 'center' }}>
                <Paper className={classes.ShortenUrl} elevation={3} style={{ padding: '20px' }}>
                    <h2>URL-shortener</h2>
                    <TextField
                        style={{ width: '100%' }}
                        id="url-text"
                        label="paste your url here"
                        variant="outlined"
                        onChange={(event) => setUrl(event.target.value)}
                    />
                </Paper>
                <Button className={classes.ShortButton} color="secondary" variant="contained" onClick={shorten}>Shorten</Button>
            </Grid>

            <Grid item style={{
                alignItems: 'center', width: '100%', display: 'flex',
                flexFlow: 'column'
            }}>
                {urlText}
            </Grid>

            <Grid item xs={12}>
                {props.auth && props.urls && props.urls.length > 0 ? <Dashboard urls={props.urls} /> : <p>no urls to show!</p>}
                {props.auth ? null : <p>Please sign-in to view dashboard</p>}
            </Grid>
        </Grid>
    );
}

export default ShortenUrl;