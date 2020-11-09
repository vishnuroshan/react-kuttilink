import axios from 'axios';
const httpClient = axios.create({
    baseURL: 'http://localhost:8000/'
});

httpClient.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const AuthInterceptor = config => {
    config.headers = { 'Access-Control-Allow-Origin': '*' }
    config.headers = { 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpc2hudXJvc2hhbjRAZ21haWwuY29tIiwiaWF0IjoxNjA0NDgyODY2LCJleHAiOjE2MDUwODc2NjZ9.-k2p1p6rhZTzRyI5us2mRQZoyFatYQtotnZRJKJQTcI' }
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