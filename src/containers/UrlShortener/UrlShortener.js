import React, { Component } from 'react'
import Aux from '../../hoc/Aux';
import ShortenUrl from '../../components/ShortenUrl/ShortenUrl';
import Dashboard from '../Dashboard/Dashboard';
import LoginSignup from '../../components/LoginSignup/LoginSignup';
import API from '../../apis/mylinkguru';
class UrlShortener extends Component {

    state = {
        auth: true,
        token: null,
        urls: [],
        user: []
    };

    componentDidMount() {
        API.getUrls().then((urlData) => {
            console.log(urlData);
            this.setState({ urls: urlData.data });
        })
    }

    render() {
        return (
            <Aux>
                <ShortenUrl />
                <LoginSignup />
                <Dashboard urls={this.state.urls} />
            </Aux>
        );
    }
}

export default UrlShortener
