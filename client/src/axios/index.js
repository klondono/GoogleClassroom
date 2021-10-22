import Axios from 'axios';

var axios = Axios.create({});

axios.interceptors.request.use(function (config) {
    const authToken = localStorage.getItem('auth');

    if(authToken)
        config.headers.Authorization =  `Bearer ${authToken}`;
    else
        delete config.headers.Authorization;

    return config;
});

export default axios;