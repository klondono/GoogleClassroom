import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/Login.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/about',
    name: 'About',
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {

    const loggedIn = localStorage.getItem('auth');

      if (to.meta.requiresAuth && !loggedIn) {
        next('/');
      } else {
        next();
      }
});

export default router
