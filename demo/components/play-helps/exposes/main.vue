<script>
export default {
  name: 'play-exposes'
}
</script>
<script setup>
import { inject } from 'vue'
import HelpTitle from '../components/title.vue'
import PushTag from './pushTag.vue'

const displays = inject('displays')
const framework = inject('framework')
const appExposes = inject('exposes')
</script>

<template>
  <div id="exposes">
    <HelpTitle label="Exposes" target="exposes" />

    <transition name="slide">
      <div v-if="displays.exposes">
        <div
          class="simple attributes"
          :class="{
            ui: framework == 'semantic-ui',
            default: framework == 'default'
          }"
        >
          <div class="flex-between attribute-row" v-for="(appExpose, key) in appExposes" :key="key">
            <h4> {{ key }}{{ appExpose.default.replace(' => void', '') }} </h4>
            <div class="depiction">
              {{ $t(`attributes.exposes.${key}`) }}
            </div>
          </div>
        </div>
        
        <PushTag></PushTag>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.attribute-row {
  flex-direction: column;
  justify-content: flex-start !important;
}
.depiction {
  margin-left: 6px;
}
</style>
