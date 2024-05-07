<script>
export default {
  name: 'app-events'
}
</script>

<script setup>
import DemoTemplate from './demo-template.vue'
import ShowCode from './show-codes/main.vue'
import { GET_PACKAGE_EVENTS_DETAIL } from './../models.js'
import { ref } from "vue";

const demoStatus = ref([]);
</script>

<template>
  <div id="app-events" class="demo">
    <div class="demo-templates">
      <DemoTemplate
        v-for="(EVENT, key) in GET_PACKAGE_EVENTS_DETAIL()"
        :key="key"
        :label="key"
        :contents="EVENT"
      >
      </DemoTemplate>
    </div>
    <div class="general-demo-result" :class="demoStatus">
      <GeneralDemo ref="generalDemo" v-model="demoStatus" :displayOutput="true"></GeneralDemo>
      <ShowCode />
    </div>
  </div>
</template>

<style scoped lang="scss">
#app-events {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
