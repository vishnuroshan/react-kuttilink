import React, { Component } from 'react'
import ShortenUrl from '../../components/ShortenUrl/ShortenUrl';
import Dashboard from '../Dashboard/Dashboard';
import LoginSignup from '../../components/LoginSignup/LoginSignup';
import API from '../../apis/url-api';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class UrlShortener extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const { cookies } = props;
        this.state = {
            auth: cookies.get('token') ? true : false,
            urls: [],
            user: []
        }
    }

    componentDidMount() {
        if (this.state.auth) {
            API.getUrls().then((urlData) => {
                console.log(urlData);
                this.setState({ urls: urlData.data });
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <ShortenUrl />
                {this.state.auth ? <Dashboard urls={this.state.urls} /> : <LoginSignup />}
            </React.Fragment>
        );
    }
}

export default withCookies(UrlShortener)
