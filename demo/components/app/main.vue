<script>
export default {
  name: 'app-attributes'
}
</script>

<script setup>
import Keyboard from './keyboard.vue'

import Basic from './basic.vue'
import AddOption from './add-option.vue'
import DemoTemplate from './demo-template.vue'

import Loadings from './loadings.vue'
// Attributes related to tags
import Create from './create.vue'
import TagConjunction from './tag-conjunction.vue'
import DeleteIcon from './delete-icon.vue'
import Placeholders from './placeholders.vue'
</script>

<template>
  <div id="app-attributes">
    <Basic></Basic>
    <AddOption></AddOption>
    <Keyboard></Keyboard>
    <DemoTemplate label="disabled" valueInversion></DemoTemplate>
    <DemoTemplate label="search"></DemoTemplate>
    <DemoTemplate label="clearable" valueInversion selected></DemoTemplate>
    <Create></Create>

    <DemoTemplate label="conjunction" selected></DemoTemplate>

    <DemoTemplate label="tagPosition" selected>
      <template #accepted-values><span></span></template>
    </DemoTemplate>

    <DemoTemplate label="merge" selected selected2>
      <template #accepted-values><span></span></template>
    </DemoTemplate>

    <TagConjunction></TagConjunction>
    <DeleteIcon></DeleteIcon>

    <DemoTemplate label="transition"></DemoTemplate>

    <Placeholders></Placeholders>
    <Loadings></Loadings>
  </div>
</template>
