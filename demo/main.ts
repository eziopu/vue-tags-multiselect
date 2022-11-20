import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";
import VueTagsMultiselect from "../src/index";

createApp(App).use(VueTagsMultiselect).mount("#app");
