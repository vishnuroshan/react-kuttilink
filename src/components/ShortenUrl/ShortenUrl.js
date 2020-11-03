import React, { Component } from 'react';
import classes from './ShortenUrl.module.css';
import Clipboard from 'react-clipboard.js';
import axios from '../../apis/mylinkguru.instance';
import ValidUrl from 'valid-url';


class ShortenUrl extends Component {
    state = {
        inputElement: null,
        url: null,
        shortUrl: null
    };

    shorten = () => {
        if (ValidUrl.isUri(this.state.url)) {
            axios.post('/shorten', { url: this.state.url }).then((response) => {
                if (response && response.data) {
                    this.setState({ shortUrl: response.data.shortUrl });
                }
            }, err => {
                console.log(err);
            })
        } else { alert('please paste a valid url'); }
    }

    changeHandler = (event) => {
        this.setState({ url: event.target.value });
    }

    copyToClickboard = (event) => {
        console.log(event);
        this.inputElement.select();
        document.execCommand('copy');
    }

    render() {
        let url = null;

        if (this.state.shortUrl) {
            url = <div className={classes.LinkContainer}>
                <a href={this.state.shortUrl}>
                    {this.state.shortUrl}
                </a>
                <Clipboard style={{ fontSize: '1.2em' }} data-clipboard-text={this.state.shortUrl}>
                    copy to clipboard
                </Clipboard>
            </div >
        }
        return (
            <div className={classes.ShortenUrl}>
                <input
                    ref={(inputEl) => this.inputElement = inputEl}
                    className={classes.Input}
                    type="text"
                    onChange={this.changeHandler}
                    placeholder="paste your link here!"></input>
                <button className={classes.ShortButton} onClick={this.shorten}>Shorten</button>
                {url}
            </div>
        );
    }
};

export default ShortenUrl;