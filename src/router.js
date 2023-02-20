import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Page/Login.vue';
import LoggedInSuccessfully from './components/Page/LoggedInSuccessfully.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/Login-page', redirect: '/Login-page/login' },
    {
      path: '/Login-page/login',
      component: Login,
    },
    {
      path: '/Login-page/loggedInSuccessfully',
      component: LoggedInSuccessfully,
    },
    {
      path: '/Login-page/login/google',
      beforeEnter() {
        window.location.href = 'https://accounts.google.com/';
      },
    },
    {
      path: '/Login-page/login/facebook',
      beforeEnter() {
        window.location.href = 'https://zh-tw.facebook.com/';
      },
    },
  ],
});

export default router;
