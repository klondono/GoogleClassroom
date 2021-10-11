<template>
<div>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</div>

</template>

<script>
import { inject } from "vue";

export default {
  name: 'App',
  components: {
  },
  mounted(){
  },
  setup() {

    const Vue3GoogleOauth = inject("Vue3GoogleOauth");
    return {
      Vue3GoogleOauth
    };
  },
  watch: {
    'Vue3GoogleOauth.isAuthorized': function (n) {
        if(n === true)
          localStorage.setItem('user', JSON.stringify(this.$gAuth.instance.currentUser.get().getAuthResponse()));
        else
          localStorage.removeItem('user');
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
