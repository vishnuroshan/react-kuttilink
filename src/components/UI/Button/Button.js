import React from 'react';
import { Button } from 'react-bootstrap';
import classes from './Button.module.css';

const button = (props) => (
    <Button
        disabled={props.disabled}
        onClick={props.clicked}>{props.children}</Button>
);

export default button;