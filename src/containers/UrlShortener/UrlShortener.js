import React, { Component } from 'react'
import Aux from '../../hoc/Aux';
import ShortenUrl from '../../components/ShortenUrl/ShortenUrl';
import Dashboard from '../Dashboard/Dashboard';
// import LoginSignup from '../../components/LoginSignup/LoginSignup';
import axios from '../../apis/mylinkguru';
class UrlShortener extends Component {

    state = {
        auth: true,
        token: null,
        urls: [],
        user: []
    };

    shouldComponentUpdate(nxtProps, nxtState) {
        return nxtState.auth === this.state.auth;
    }

    componentDidMount() {
        axios.getUrls().then((urlData) => {
            console.log(urlData);
            this.setState({ urls: urlData.data });
        })
    }

    render() {
        let dashboard = null;
        if (this.state.auth) {
            dashboard = <Dashboard urls={this.state.urls} />
        } else {
            dashboard = null
        }
        return (
            <Aux>
                <ShortenUrl />
                <Dashboard urls={this.state.urls} />
                {dashboard}
            </Aux>
        );
    }
}

export default UrlShortener
