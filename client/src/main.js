
import { createApp, inject } from 'vue';
import App from './App.vue';
import Axios from './axios';
import Store from './store';
import gAuth from 'vue3-google-oauth2';
import router from './router';

const { VUE_APP_GOOGLECLIENTID } = process.env

const RootComponent = Object.assign({}, App, {
    setup() {
        const Vue3GoogleOauth = inject("Vue3GoogleOauth");
        return {
          Vue3GoogleOauth
        };
    },
    methods:{
        getCurrentUser(){
            
            var profile = this.$gAuth.instance.currentUser.get().getBasicProfile();

            return {
                Id: profile.getId(),
                FullName: profile.getName(),
                FirstName: profile.getGivenName(),
                LastName: profile.getFamilyName(),
                Email: profile.getEmail()
            }
        },

        getCurrentSession(){
            return this.$gAuth.instance.currentUser.get().getAuthResponse();
        }
    },
    watch: {
        'Vue3GoogleOauth.isAuthorized': function (n) {

            if(n === true){
                const currentSession = this.getCurrentSession();
                const currentUser = this.getCurrentUser();
                localStorage.setItem('gauth', JSON.stringify(currentSession));
                this.$store.commit('user/loginSuccess', Object.assign({}, currentSession, currentUser));
            }
            else {
                localStorage.removeItem('gauth');
                this.$store.commit('user/logout');
            }        
        }
      }
  });


const app = createApp(RootComponent);

app.use(router);

app.use(Store);


console.log('env', process.env, VUE_APP_GOOGLECLIENTID);

const scopes = 'https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.courseworkmaterials https://www.googleapis.com/auth/classroom.topics https://www.googleapis.com/auth/classroom.coursework.students email';

app.use(gAuth, { clientId: VUE_APP_GOOGLECLIENTID, scope: scopes, prompt: 'consent', fetch_basic_profile: true });

app.config.globalProperties.$http = Axios;

app.mount('#app');
