import React from 'react';
import classes from './Layout.module.css';
import UrlShortener from '../UrlShortener/UrlShortener';
import { BrowserRouter } from 'react-router-dom';
const layout = () => {
    return (
        <div className={classes.Layout}>
            <BrowserRouter basename="/">
                <UrlShortener />
            </BrowserRouter>
        </div>
    );
};

export default layout;