import React from 'react';
import classes from './UrlComponent.module.css';

const urlComponent = (props) => {
    return (
        <div className={classes.UrlComponent}>
            <h4>{props.KEY}</h4>
            short url: <a href={`${window.location.origin.toString()}/${props.KEY}`}>
                {`${window.location.origin.toString()}/${props.KEY}`}
            </a><br /><br />
            original link: <a href={props.url}>{props.url}</a>
            <br />
            <p>clicks: {props.clicks}</p>
        </div>
    );
};

export default urlComponent;