import { objectKeyToArray, toBoolean } from "./utils.js";
import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./config/i18n";
import GeneralDemo from "./components/tools/general-demo.vue";
import LabelAndSelect from "./components/tools/label-and-select.vue";
import ToolTitle from "./components/tools/title.vue";

import "./vendors/google-code-prettify/prettify";

// import "./assets/main.css";
import VueTagsMultiselect from "../src/index";

const app = createApp(App);

app.config.globalProperties.$objectKeyToArray = objectKeyToArray;
app.config.globalProperties.$toBoolean = toBoolean;
app.component('GeneralDemo', GeneralDemo);
app.component('LabelAndSelect', LabelAndSelect);
app.component('ToolTitle', ToolTitle);

app.use(i18n);
app.use(VueTagsMultiselect);
app.mount("#app");
