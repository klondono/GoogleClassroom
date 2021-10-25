import { boot } from 'quasar/wrappers'
import gAuth from 'vue3-google-oauth2';

//const { VUE_APP_GOOGLECLIENTID } = process.env;

const VUE_APP_GOOGLECLIENTID='983832817396-tumit47sfk7frtcn7o916bov1qovrb82.apps.googleusercontent.com'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  //console.log('env', process.env, VUE_APP_GOOGLECLIENTID);

  const scopes = 'https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.courseworkmaterials https://www.googleapis.com/auth/classroom.topics https://www.googleapis.com/auth/classroom.coursework.students email';
  
  app.use(gAuth, { clientId: VUE_APP_GOOGLECLIENTID, scope: scopes, prompt: 'consent', fetch_basic_profile: true });

})
