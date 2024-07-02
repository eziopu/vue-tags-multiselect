<script>
export default {
  name: 'play-events-detail'
}
</script>
<script setup>
import { inject } from 'vue'

const framework = inject('framework')
const appEvents = inject('events')
</script>

<template>
  <div class="detail attributes container">
    <div class="row titles">
      <div v-for="value in ['Name', 'Output', 'Description', 'Parameters']" :key="value">
        <h4>{{ $t(`ui.general.${value}`) }}</h4>
      </div>
    </div>

    <div class="row" v-for="(appEvent, key) in appEvents" :key="key">
      <div>
        <div>{{ key }}{{ appEvent.default }}</div>
      </div>
      <div>
        <span class="i-block d-md-none">{{ $t(`ui.general.Output`) }}: </span>
        <pre
          v-if="appEvent.default == '(tag: object) => void'"
          class="data"
          :class="framework"
        ><!-- 
        -->{{ appEvents['selecting-tag'].value || '{}' }}<!--
      --></pre>
        <span v-else>
          {{ appEvent.value || '-' }}
        </span>
      </div>
      <div>
        <span class="i-block d-md-none">{{ $t(`ui.general.Description`) }}: </span>
        <span>{{ $t(`attributes.events.${key}`) }}</span>
      </div>
      <div>
        <span class="i-block d-md-none">{{ $t(`ui.general.Parameters`) }}: </span>
        <span>{{ appEvent.acceptedValues.join(' / ').replace('null', '-') || '-' }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './assets/stylesheets.scss';
@media all and (min-width: 576px) {
  .row {
    & > div:nth-child(1) {
      width: 25%;
      order: 1;
    }
    & > div:nth-child(2) {
      width: 25%;
      order: 2;
    }
    & > div:nth-child(3) {
      width: 30%;
      order: 3;
    }
    & > div:nth-child(4) {
      width: 20%;
      order: 4;
    }
  }
}
</style>
