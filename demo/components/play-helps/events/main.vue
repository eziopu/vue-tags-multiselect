<script>
export default {
  name: 'play-events'
}
</script>
<script setup>
import { inject } from 'vue'
import HelpTitle from '../components/title.vue'
import Detail from './detail.vue'
import Simple from './simple.vue'

const getOperateMode = inject('getOperateMode')
const displays = inject('displays')
</script>

<template>
  <div id="events">
    <HelpTitle label="Events" target="events" />

    <Transition name="slide">
      <template v-if="displays.events">
        <Transition name="out-in">
          <Detail v-if="getOperateMode() == 'detail'"></Detail>
          <Simple v-else></Simple>
        </Transition>
      </template>
    </Transition>
  </div>
</template>
