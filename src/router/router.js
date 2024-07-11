import { createRouter, createWebHistory } from "vue-router";
import AppVue from "../App.vue";
import App404 from "../components/App_404.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "main",
      component: AppVue,
    },
    {
      path: "/404",
      name: "404",
      component: App404,
    },
  ],
});

export default router;
