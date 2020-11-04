import axios from './mylinkguru.instance.js';

const API = {};

API.getUrls = () => {
    return new Promise((resolve, reject) => {
        axios.get('/user/listUrls').then((response) => {
            return resolve(response.data);
        }, err => {
            console.log(err);
            return reject(err);
        });
    });
}

API.shorten = (url) => {
    return new Promise((resolve, reject) => {
        axios.post('/shorten', { url }).then((response) => {
            return resolve(response.data.shortUrl);
        }, err => {
            console.log(err);
            return reject(err);
        });
    });
}


export default API;