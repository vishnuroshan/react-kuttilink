import httpClient from './url-api.instance';

const API = {};

API.getUrls = () =>
    httpClient.get('/user/listUrls').then((response) => {
        return response.data;
    }, err => {
        console.log(err);
        return err;
    });

API.shorten = (url) =>
    httpClient.post('/shorten', { url }).then((response) => {
        return response.data.shortUrl;
    }, err => {
        console.log(err);
        return err;
    });

API.login = (email, password) =>
    httpClient.post('/auth/login', { email, password }).then((response) => {
        return response.data;
    }, err => {
        console.log(err);
        return err;
    });

API.signup = (firstname, lastname, email, password) =>
    httpClient.post('/auth/create-account', { firstname, lastname, email, password }).then((response) => {
        return response.data;
    }, err => {
        console.log(err);
        return err;
    });

export default API;