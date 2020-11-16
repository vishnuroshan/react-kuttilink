import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

httpClient.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const AuthInterceptor = config => {
    config.headers = { 'Access-Control-Allow-Origin': '*' };
    if (cookies.get('kutti-url-token')) {
        config.headers = { 'Authorization': cookies.get('kutti-url-token') }
    }
    return config;
};

httpClient.interceptors.request.use(AuthInterceptor, err => {
    console.log(err);
});

httpClient.removeAuthInterceptor = () => {
    console.log('Removing auth header', { httpClient });
    httpClient.interceptors.request.eject(AuthInterceptor);
}

export default httpClient;