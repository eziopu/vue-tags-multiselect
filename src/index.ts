import type { App, Plugin } from "vue";
import vTagsMultiselect from "./HelloWorld.vue";

const install = (app: App) => {
  app.component("v-tags-multiselect", vTagsMultiselect);
};

vTagsMultiselect.install = install;

export default vTagsMultiselect as unknown as Plugin;

// don't fuck use by vue3
// import type { App } from "vue";
// import vTagsMultiselect from "./HelloWorld.vue";

// const install = (app: App) => {
//   app.component("v-tags-multiselect", vTagsMultiselect);
// };

// export default { install };
// export { vTagsMultiselect };
