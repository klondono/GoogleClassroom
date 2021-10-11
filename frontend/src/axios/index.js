import Axios from 'axios';

var axios = Axios.create({});

axios.interceptors.request.use(function (config) {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.access_token;

    if(token)
        config.headers.Authorization =  `Bearer ${token}`;
    else
        delete config.headers.Authorization;

    return config;
});

export default axios;