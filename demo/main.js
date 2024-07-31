import { objectKeyToArray, toBoolean, toUpperCaseFirstLetter, toKebabCase, toCamelCase } from "./utils.js";
import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./config/i18n";
import GeneralDemo from "./components/tools/general-demo.vue";
import LabelAndControls from "./components/tools/label-and-controls.vue";
import ToolTitle from "./components/tools/title.vue";

import "./vendors/google-code-prettify/prettify";

import VueTagsMultiselect from "../src/index";

const app = createApp(App);

app.config.globalProperties.$objectKeyToArray = objectKeyToArray;
app.config.globalProperties.$toBoolean = toBoolean;
app.config.globalProperties.$toUpperCaseFirstLetter = toUpperCaseFirstLetter;
app.config.globalProperties.$toKebabCase = toKebabCase;
app.config.globalProperties.$toCamelCase = toCamelCase;

app.component('GeneralDemo', GeneralDemo);
app.component('LabelAndControls', LabelAndControls);
app.component('ToolTitle', ToolTitle);

app.use(i18n);
app.use(VueTagsMultiselect);
app.mount("#app");
