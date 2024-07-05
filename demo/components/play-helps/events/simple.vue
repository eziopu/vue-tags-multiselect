<script>
export default {
  name: 'play-events-simple'
}
</script>
<script setup>
import { inject } from 'vue'
import ValueTemplate from './components/value.vue'

const framework = inject('framework')
const appEvents = inject('events')
</script>

<template>
  <div
    class="simple attributes"
    :class="{
      ui: framework == 'semantic-ui',
      default: framework == 'default'
    }"
  >
    <div
      class="flex-between"
      v-for="(appEvent, key) in appEvents"
      :key="key"
      :class="{ 'attribute-row': /object/.test(appEvent.default) }"
    >
      <span>{{ key }}{{ appEvent.default }}</span>
      <ValueTemplate :keyName="key" :attribute="appEvent"></ValueTemplate>
    </div>
  </div>
</template>

<style scoped lang="scss">
.attribute-row {
  flex-direction: column;
}
</style>
