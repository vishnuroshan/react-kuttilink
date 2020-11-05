import httpClient from './mylinkguru.instance';

const API = {};

API.getUrls = () => {
    return new Promise((resolve, reject) => {
        httpClient.get('/user/listUrls').then((response) => {
            return resolve(response.data);
        }, err => {
            console.log(err);
            return reject(err);
        });
    });
}

API.shorten = (url) => {
    return new Promise((resolve, reject) => {
        httpClient.post('/shorten', { url }).then((response) => {
            return resolve(response.data.shortUrl);
        }, err => {
            console.log(err);
            return reject(err);
        });
    });
}


export default API;