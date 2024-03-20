<script>
export default {
  name: "option-value",
};
</script>

<script setup>
import ALineCode from "./tools/a-line-code.vue";
import GeneralDemo from "../tools/general-demo.vue";

const i18n = "attributes.description.option";

import { ref } from "vue";
const demoStatus = ref([]);
</script>

<template>
  <div id="option-selected" class="demo" :class="demoStatus">
    <h4>Selected</h4>
    <div class="flex-between to5-5">
      <div class="depiction">
        {{ $t(`${i18n}.selected`) }}

        <small>*{{ $t(`${i18n}.selected__notice`) }}</small>
        
        <ALineCode :bolders="['selected']" />
      </div>

      <GeneralDemo
        v-model="demoStatus"
        :displayOutput="true"
        :displayRefreshBtn="true"
        :displayShowCodeBtn="false"
        :dropdown="{
          name: {isDisplayForDemo: false},
        }"
        :option="{
          country: [{}, {selected: true}],
        }"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./assets/stylesheets.scss";
</style>