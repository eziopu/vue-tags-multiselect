<script>
export default {
  name: 'option-selected'
}
</script>

<script setup>
import { ref } from 'vue'
import ALineCode from './tools/a-line-code.vue'

const i18n = 'attributes.option'

const demoStatus = ref([])
</script>

<template>
  <div id="option-selected" class="demo" :class="demoStatus">
    <ToolTitle>Selected</ToolTitle>

    <div class="flex-between to5-5">
      <div class="depiction">
        {{ $t(`${i18n}.selected`) }}

        <small>*{{ $t(`${i18n}.selected__notice`) }}</small>

        <ALineCode :bolders="['selected']" />
      </div>

      <GeneralDemo
        v-model="demoStatus"
        :displayOutput="true"
        :displayShowCodeBtn="false"
        :dropdown="{
          name: { isDisplayForDemo: false }
        }"
        :option="{
          country: [{}, { selected: true }]
        }"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './assets/stylesheets.scss';
</style>
