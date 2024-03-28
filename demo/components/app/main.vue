<template>
  <div id="app-attributes">
    
    <Basic></Basic>
    <AddOption></AddOption>
    <Keyboard></Keyboard>
    <Conjunction></Conjunction>
    <Disabled></Disabled>
    <Search></Search>
    <Create></Create>
    <TagPosition></TagPosition>
    <Merge></Merge>
    <TagConjunction></TagConjunction>
    <DeleteIcon></DeleteIcon>
    <AppTransition></AppTransition>
    <Placeholders></Placeholders>
    <Loadings></Loadings>
  </div>
</template>

<script>
export default {
  name: "app-app-attributes",
};
</script>

<script setup>
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
import AppTransition from "./transition.vue";
import DeleteIcon from "./delete-icon.vue";
import Placeholders from "./placeholders.vue";
</script>
