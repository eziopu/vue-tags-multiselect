<script>
export default {
  name: 'play-exposes-pushTag'
}
</script>
<script setup>
import { ref } from 'vue'

import Depiction from '../../exposes/pushTag-components/depiction.vue'
import Parameter from '../../exposes/pushTag-components/parameter.vue'

const display = ref(true)
</script>

<template>
  <div class="detail attributes container">
    <div @click="display = !display" class="help-title pointer" :class="{ active: display }">
      <h4 class="ui title">pushTag(tag: object) help</h4>
      <span class="arrow"></span>
    </div>

    <transition name="slide">
      <div v-if="display">
        <Depiction />
        <Parameter />
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.help-title {
  margin-bottom: 18px;
}
</style>
