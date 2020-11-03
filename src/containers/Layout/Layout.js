import React from 'react';
import classes from './Layout.module.css';
import UrlShortener from '../UrlShortener/UrlShortener';

const layout = () => {
    return (
        <div className={classes.Layout}>
            <UrlShortener />
        </div>
    );
};

export default layout;