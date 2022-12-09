import type { App, Plugin } from "vue";
import vTagsMultiselect from "./main.vue";
import vTagDropdown from "./components/slots/v-dropdown.vue";
import vTagOption from "./components/slots/v-option.vue";

const install = (app: App) => {
  app.component("v-tags-multiselect", vTagsMultiselect);
  app.component("v-tag-dropdown", vTagDropdown);
  app.component("v-tag-option", vTagOption);
};

vTagsMultiselect.install = install;

export default vTagsMultiselect as unknown as Plugin;

// const Vue3Install = {
//   /**
//    * install function
//    * @param {App} app
//    * @param {Object} options
//    */
//   install(app) {
//     // 全局注册组件
//     Components.forEach((component) => {
//       app.component(component.name, component);
//     });
//   },
// };

// const Vue2Install = (App) => {
//   Components.forEach((component) => {
//     App.component(component.name, component);
//   });
// };

// export default {
//   install: isVue3 ? Vue3Install : Vue2Install,
// };
