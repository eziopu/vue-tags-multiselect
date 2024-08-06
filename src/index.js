import vTagsMultiselect from "./main.vue";
import vTagDropdown from "./components/slots/v-dropdown.vue";
import vTagOption from "./components/slots/v-option.vue";

export { vTagsMultiselect, vTagDropdown, vTagOption }

const install = (app) => {
  app.component("v-tags-multiselect", vTagsMultiselect);
  app.component("v-tag-dropdown", vTagDropdown);
  app.component("v-tag-option", vTagOption);
};

vTagsMultiselect.install = install;

export default vTagsMultiselect;