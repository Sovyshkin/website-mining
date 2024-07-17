// Для Vue 3
import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./i18n";
import router from "./router/router";
import axios from "axios";

axios.defaults.baseURL = "http://45.147.177.78:9000/api";

createApp(App).use(i18n).use(router).mount("#app");
