import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/Page/Login.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    {
      path: "/login/google",
      beforeEnter() {
        window.location.href = "https://accounts.google.com/";
      },
    },
    {
      path: "/login/facebook",
      beforeEnter() {
        window.location.href = "https://zh-tw.facebook.com/";
      },
    },
  ],
});

export default router;
