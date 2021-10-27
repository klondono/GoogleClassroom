<template>
<div class="window-height window-width row justify-center items-center" 
style="background: linear-gradient(#fff, #fff);">

<div class="q-pa-lg">
 <div class="column q-pa-lg">
      <div class="row">
        <q-card square style="width:400px;height:500px;">
          <q-card-section class="text-center">
            <h4 style="color:#333;" class="text-h5 q-my-md">Google Classroom Helper</h4>
            <!-- <div class="absolute-bottom-right q-pr-md" style="transform: translateY(50%);">
              <q-btn fab icon="add" color="purple-4" />
            </div> -->
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl">
              <q-input square clearable v-model="email" type="email" label="Email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input square clearable v-model="password" type="password" label="Password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
            <!-- <q-btn round color="red-8">
                <q-icon name="fab fa-google" size="1.2rem" />
              </q-btn> -->
          <!-- <q-card-section>
            <div class="text-center q-pa-md q-gutter-md">
              <q-btn round color="indigo-7">
                <q-icon name="fab fa-facebook-f" size="1.2rem" />
              </q-btn>

              <q-btn round color="light-blue-5">
                <q-icon name="fab fa-twitter" size="1.2rem" />
              </q-btn>
            </div>
          </q-card-section> -->
          <q-card-actions class="q-px-lg">
            <q-btn @click.prevent="handleClickSignIn" color="primary" unelevated size="lg" class="full-width text-white" label="Sign In" />
          </q-card-actions>
          <!-- <q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6">Forgot your password?</p>
          </q-card-section> -->
        </q-card>
      </div>
    </div>

</div>
</div>


</template>

<script>
import { inject, toRefs } from "vue";

export default {
  name: "Login",
  props: {
    msg: String,
  },

  data(){
    return {
      user: '',
      email: 'klondono1016@gmail.com',
      password: ''
    }
  },

  mounted(){
  },

  methods: {
  goToGoogleClassroom(){

    this.$router.push({ name: 'Classroom' });

  },

   async newAuthenticate(){
        let p = { Username: "test", Password: "test" };
        const authResponse = await this.$http.post("https://localhost:5001/Users/authenticate", p);
        console.log('auth', authResponse);
    },

    async Authenticate(){

      const user = JSON.parse(localStorage.getItem(process.env.AUTH_TOKEN));
      const token = user?.id_token;

      const authResponse = await this.$http.post("https://localhost:5001/Users/authenticate",{
          IdToken: token
      });

      if(authResponse?.statusText == "OK" && authResponse.data.token)
        localStorage.setItem('auth', authResponse.data.token);
      else
        localStorage.removeItem('auth');
    },

    async getWeather(){
      const test1 = await this.$http.get("https://localhost:5001/WeatherForecast");
      console.log("test", test1);
    },

    async handleClickSignIn(){
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }
        console.log("googleUser", googleUser);
        this.user = googleUser.getBasicProfile().getEmail();
        console.log("getId", this.user);
        console.log("getBasicProfile", googleUser.getBasicProfile());
        console.log("getAuthResponse", googleUser.getAuthResponse());
        console.log(
          "getAuthResponse",
          this.$gAuth.instance.currentUser.get().getAuthResponse()
        );

        var profile = this.$gAuth.instance.currentUser.get().getBasicProfile();
          console.log('ID: ' + profile.getId());
          console.log('Full Name: ' + profile.getName());
          console.log('Given Name: ' + profile.getGivenName());
          console.log('Family Name: ' + profile.getFamilyName());
          console.log('Image URL: ' + profile.getImageUrl());
          console.log('Email: ' + profile.getEmail());
        this.goToGoogleClassroom();

      } catch (error) {
        //on fail do something
        console.error(error);
        return null;
      }
    },

    async handleClickGetAuthCode(){
      try {
        const authCode = await this.$gAuth.getAuthCode();
        console.log("authCode", authCode);
      } catch(error) {
        //on fail do something
        console.error(error);
        return null;
      }
    },

    async handleClickSignOut() {
      try {
        await this.$gAuth.signOut();
        this.user = "";
      } catch (error) {
        console.error(error);
      }
    },

    handleClickDisconnect() {
      window.location.href = `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${window.location.href}`;
    }
  },
  setup(props) {

    const { isSignIn } = toRefs(props);
    const Vue3GoogleOauth = inject("Vue3GoogleOauth");

    const handleClickLogin = () => {};
    return {
      Vue3GoogleOauth,
      handleClickLogin,
      isSignIn,
    };
  }
};
</script>

<style>
button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  margin-right: 1em;
}

button:disabled {
  background: #fff;
  color: #ddd;
  cursor: not-allowed;
}
</style>