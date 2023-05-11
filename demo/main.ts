import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./config/i18n";

// import "./assets/main.css";
import VueTagsMultiselect from "../src/index";

createApp(App).use(i18n).use(VueTagsMultiselect).mount("#app");
