import Cookies from 'universal-cookie';
const cookies = new Cookies();


class CookieManager {

    constructor() {
        this.token = cookies.get('kutti-url-token')
    }

    get getToken() {
        return this.token;
    }

    set SetToken(token) {
        if (cookies.get('kutti-url-token')) {
            cookies.remove('kutti-url-token');
            cookies.set('kutti-url-token', token);
        } else cookies.set('kutti-url-token', token);
    }

    isToken() {
        return cookies.get('kutti-url-token') ? true : false;
    }

    removeToken() {
        cookies.remove('kutti-url-token');
    }
}

export default new CookieManager();