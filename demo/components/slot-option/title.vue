
<script>
export default {
  name: "option-title",
};
</script>

<script setup>
import { ref } from "vue";
import ALineCode from "./tools/a-line-code.vue";
import GeneralDemo from "../tools/general-demo.vue";

const i18n = "attributes.description.option";
const demoStatus = ref([]);
</script>

<template>
  <div id="option-title" class="demo" :class="demoStatus">
    <ToolTitle>Title</ToolTitle>

    <div class="flex-between to5-5">
      <div class="depiction">
        {{ $t(`${i18n}.title`) }}
        <ALineCode :bolders="['title']" />
      </div>

      <GeneralDemo
        v-model="demoStatus"
        :autoFocus="true"
        :displayOutput="true"
        :displayRefreshBtn="true"
        :displayShowCodeBtn="false"
        :app="{
          placeholder: 'click country option!'
        }"
        :dropdown="{
          name: {isDisplayForDemo: false},
        }"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./assets/stylesheets.scss";
</style>