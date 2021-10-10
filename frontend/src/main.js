import { createApp } from 'vue';
import App from './App.vue';
//import axios from 'axios'
//import VueAxios from 'vue-axios'

import gAuth from 'vue3-google-oauth2';
import router from './router'

const app = createApp(App).use(router);
//app.use(VueAxios, axios)
let gauthClientId = "983832817396-tumit47sfk7frtcn7o916bov1qovrb82.apps.googleusercontent.com";

app.use(gAuth, { clientId: gauthClientId, scope: 'email', prompt: 'consent', fetch_basic_profile: false });

app.mount('#app');
