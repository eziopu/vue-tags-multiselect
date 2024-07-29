<script>
export default {
  name: 'app-attributes'
}
</script>

<script setup>
import KeyboardTemplate from './keyboard-template.vue'

import Basic from './basic.vue'
import AddOption from './add-option.vue'
import DemoTemplate from './tool/demo-template.vue'

import Loadings from './loadings.vue'
import Placeholders from './placeholders.vue'
</script>

<template>
  <div id="app-attributes">
    <Basic></Basic>
    <AddOption></AddOption>

    <DemoTemplate label="keyboard">
      <template #depiction>
        <p>{{ $t(`attributes.app.keyboard__detail`) }}</p>
      </template>

      <template #accepted-values>
        <KeyboardTemplate />
      </template>
    </DemoTemplate>

    <DemoTemplate label="disabled" valueInversion></DemoTemplate>
    <DemoTemplate label="search"></DemoTemplate>
    <DemoTemplate label="clearable" valueInversion selected></DemoTemplate>

    <DemoTemplate label="create" label2="search">
      <template #depiction>
        <p>* {{ $t(`attributes.app.create__notice`) }}</p>
      </template>
    </DemoTemplate>

    <DemoTemplate label="conjunction" selected></DemoTemplate>

    <DemoTemplate label="tagPosition" selected>
      <template #accepted-values><span></span></template>
    </DemoTemplate>

    <DemoTemplate label="merge" selected selected2>
      <template #accepted-values><span></span></template>
    </DemoTemplate>

    <DemoTemplate label="deleteIcon" label2="merge" selected selected2>
      <template #depiction>
        <p>* {{ $t(`attributes.app.deleteIcon__notice`) }}</p>
      </template>
    </DemoTemplate>

    <DemoTemplate label="transition"></DemoTemplate>

    <Placeholders></Placeholders>
    <Loadings></Loadings>
  </div>
</template>
