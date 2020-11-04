import React, { Component } from 'react'
import Aux from '../../hoc/Aux';
import ShortenUrl from '../../components/ShortenUrl/ShortenUrl';
import Dashboard from '../../components/Dashboard/Dashboard';
import LoginSignup from '../../components/LoginSignup/LoginSignup';

class UrlShortener extends Component {

    state = {
        auth: false,
        urls: [
            {
                key: 'rWDFFHAA',
                url: 'https://google.com',
                clicks: 32
            },
            {
                key: 'IfrrgQWER',
                url: 'https://google.com',
                clicks: 32
            },
            {
                key: 'BNVDDD334aa',
                url: 'https://google.com',
                clicks: 32
            }
        ],
        user: []
    };

    loginHandler = (emailELem, passElem) => {
        console.table(emailELem, passElem);
    }

    render() {
        let dashboard = null;
        if (this.state.auth) {
            dashboard = <Dashboard urls={this.state.urls} />
        } else {
            dashboard = <LoginSignup login={this.loginHandler} />
        }
        return (
            <Aux>
                <ShortenUrl />
                <Dashboard urls={this.state.urls} />
            </Aux>
        );
    }
}

export default UrlShortener
