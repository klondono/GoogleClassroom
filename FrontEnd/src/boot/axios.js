import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const http = axios.create({});

const googleApi = axios.create({ baseURL: 'https://classroom.googleapis.com/v1/' })

//add google auth token to google api requests
googleApi.interceptors.request.use(function (config) {
  
  const googleAuth = JSON.parse(localStorage.getItem(process.env.AUTH_TOKEN));
  if(googleAuth)
      config.headers.Authorization =  `Bearer ${googleAuth.access_token}`;
  else
      delete config.headers.Authorization;

  return config;
});

export default boot(({ app }) => {
  
  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$http = http
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$googleApi = googleApi;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { googleApi }


