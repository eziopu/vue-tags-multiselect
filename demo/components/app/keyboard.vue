<script>
export default {
  name: 'app-demo-keyboard'
}
</script>

<script setup>
import KeyboardTemplate from './keyboard-template.vue'
import DemoTemplate from './demo-template.vue'
</script>

<template>
  <DemoTemplate label="keyboard">
    <template #depiction>
      <p>{{ $t(`attributes.app.keyboard__detail`) }}</p>
    </template>

    <template #accepted-values>
      <KeyboardTemplate />
    </template>
  </DemoTemplate>
</template>
