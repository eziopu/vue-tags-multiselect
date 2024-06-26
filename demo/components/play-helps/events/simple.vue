<script>
export default {
  name: 'play-events-simple'
}
</script>
<script setup>
import { inject } from 'vue'

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
      <pre v-if="appEvent.default == '(tag: object) => void'" class="data" :class="framework"><!-- 
        -->{{ appEvents['selecting-tag'].value || '{}' }}<!--
      --></pre>
      <span v-else>
        {{ appEvent.value || '-' }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './assets/stylesheets.scss';
.attribute-row {
  flex-direction: column;
}
</style>
