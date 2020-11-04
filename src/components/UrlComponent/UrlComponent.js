import React from 'react';
import classes from './UrlComponent.module.css';

const urlComponent = (props) => {
    return (
        <div className={classes.UrlComponent}>
            <h4>{props.key}</h4>
            original link: <a href={props.url}>{props.url}</a>
            <p>clicks: {props.clicks}</p>
        </div>
    );
};

export default urlComponent;