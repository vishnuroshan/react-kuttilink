import React, { Component } from 'react'
import Aux from '../../hoc/Aux';
import ShortenUrl from '../../components/ShortenUrl/ShortenUrl';
import Dashboard from '../../components/Dashboard/Dashboard';
import LoginSignup from '../../components/LoginSignup/LoginSignup';

class UrlShortener extends Component {

    state = {
        auth: false,
        urls: [],
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
                {dashboard}
            </Aux>
        );
    }
}

export default UrlShortener
