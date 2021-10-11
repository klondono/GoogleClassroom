import { createApp } from 'vue';
import App from './App.vue';
import Axios from 'axios'

import gAuth from 'vue3-google-oauth2';
import router from './router'

const app = createApp(App).use(router);

let gauthClientId = "983832817396-tumit47sfk7frtcn7o916bov1qovrb82.apps.googleusercontent.com";

app.use(gAuth, { clientId: gauthClientId, scope: 'email', prompt: 'consent', fetch_basic_profile: false });
app.config.globalProperties.$http = Axios;
app.mount('#app');
