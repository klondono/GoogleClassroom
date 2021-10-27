import { boot } from 'quasar/wrappers'
import gAuth from 'vue3-google-oauth2';

const VUE_APP_GOOGLECLIENTID = process.env.VUE_APP_GOOGLECLIENTID

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {

  const scopes = 'https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.courseworkmaterials https://www.googleapis.com/auth/classroom.topics https://www.googleapis.com/auth/classroom.coursework.students email';
  
  app.use(gAuth, { clientId: VUE_APP_GOOGLECLIENTID, scope: scopes, prompt: 'consent', fetch_basic_profile: true });

})
