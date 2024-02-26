<template>
  <div id="app-attributes">
    <Keyboard></Keyboard>
    
    <Basic></Basic>
    <AddOption></AddOption>
    <Conjunction></Conjunction>
    <Disabled></Disabled>
    <Placeholders></Placeholders>
    <Search></Search>
    <Create></Create>
    <TagPosition></TagPosition>
    <Merge></Merge>
    <TagConjunction></TagConjunction>
    <DeleteIcon></DeleteIcon>
    <Transition></Transition>
    <Loadings></Loadings>
  </div>
</template>

<script>
import Keyboard from "./keyboard.vue";

import Basic from "./basic.vue";
import AddOption from "./add-option.vue";
import Conjunction from "./conjunction.vue";
import Disabled from "./disabled.vue";
import Loadings from "./loadings.vue";
// Attributes related to tags
import Merge from "./merge.vue";
import Create from "./create.vue";
import Search from "./search.vue";
import TagConjunction from "./tag-conjunction.vue";
import TagPosition from "./tag-position.vue";
import Transition from "./transition.vue";
import DeleteIcon from "./delete-icon.vue";
import Placeholders from "./placeholders.vue";
    


export default {
  name: "app-app-attributes",
  components: {
    Keyboard,
    Basic,
    AddOption,
    Conjunction,
    Disabled,
    Loadings,
    Merge,
    Search,
    Create,
    TagConjunction,
    TagPosition,
    Transition,
    DeleteIcon,
    Placeholders,
  },
};
</script>
