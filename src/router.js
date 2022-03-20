import { createRouter, createWebHistory } from "vue-router";
import UserAuth from "./components/Page/UserAuth.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: UserAuth },
  ],
});

export default router;
