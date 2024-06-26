<script>
export default {
  name: 'play-slots-simple'
}
</script>
<script setup>
import { inject } from 'vue'

const framework = inject('framework')
const appSlots = inject('slots')
</script>

<template>
  <div
    id="play-slots-simple"
    class="simple attributes"
    :class="{
      ui: framework == 'semantic-ui',
      default: framework == 'default'
    }"
  >
    <template v-for="(appSlot, key) in appSlots" :key="key">
      <LabelAndControls
        :label="key != 'optionORConjunction' ? $toKebabCase(key) : 'option-OR-conjunction'"
        model="input"
        v-model="appSlot.value"
      />
    </template>
  </div>
</template>
