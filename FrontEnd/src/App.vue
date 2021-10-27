<template>
  <router-view />
</template>
<script>
import { defineComponent, inject } from 'vue';

export default defineComponent({
  name: 'App',
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
                //this.$store.commit('user/loginSuccess', Object.assign({}, currentSession, currentUser));
            }
            else {
                localStorage.removeItem('gauth');
                //this.$store.commit('user/logout');
            }        
        }
      }
})
</script>

