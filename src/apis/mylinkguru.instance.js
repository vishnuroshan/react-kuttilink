import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/'
    // baseURL: 'https://mylinkguru.herokuapp.com/'
});

instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

instance.interceptors.request.use(config => {
    console.log('request interceptor:> ', config);
    config.headers = { 'Access-Control-Allow-Origin': '*' }
    return config;
}, err => {
    console.log(err);
});

instance.interceptors.response.use(res => {
    console.log('response interceptor:> ', res);
    return res;
}, err => {
    console.log(err);
});

// class InstanceBuilder {
//     constructor() {
//         this.instance = instance
//     }

//     get getInstance() {
//         return this.instance
//     }

//     ejectRequest() {
//         axios.interceptors.request.eject(this.instance);
//         return this;
//     }

//     ejectRespose() {
//         axios.interceptors.response.eject(this.instance);
//         return this;
//     }
// }


export default instance;