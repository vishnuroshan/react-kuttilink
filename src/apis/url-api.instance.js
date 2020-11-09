import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const httpClient = axios.create({
    baseURL: 'http://localhost:8000/'
});

httpClient.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const AuthInterceptor = config => {
    config.headers = { 'Access-Control-Allow-Origin': '*' };
    if (cookies.get('token')) {
        config.headers = { 'Authorization': cookies.get('token') }
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