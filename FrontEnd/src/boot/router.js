import { boot } from 'quasar/wrappers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ router }) => {
  // something to do
  router.beforeEach((to, from, next) => {

    const loggedIn = localStorage.getItem(process.env.AUTH_TOKEN);
    
      if (to.meta.requiresAuth && !loggedIn) {
        next('/');
      } else {
        next();
      }
  });

})
