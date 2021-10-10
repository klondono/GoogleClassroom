import { createApp } from 'vue'
import App from './App.vue'

import auth from 'vue3-google-oauth2';

const app = createApp(App);

let gauthClientId = "983832817396-tumit47sfk7frtcn7o916bov1qovrb82.apps.googleusercontent.com";

app.use(auth, { clientId: gauthClientId, scope: 'email', prompt: 'consent', fetch_basic_profile: false });

app.mount('#app');
