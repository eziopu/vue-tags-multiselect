<script>
export default {
  name: 'option-undo'
}
</script>

<script setup>
import { ref } from 'vue'
import { SLOTS } from '@models/attributes/default.js'
import ShowHtmlCode from '../tools/show-html-code/main.vue'

const demoStatus = ref([])
const optionUndo = ref('')
</script>

<template>
  <div id="option-undo" class="demo" :class="demoStatus">
    <ToolTitle>Option undo</ToolTitle>

    <div class="depiction">
      {{ $t(`attributes.slots.option-undo`) }}
    </div>

    <div class="attributes flex-between to5-5">
      <LabelAndControls model="input" label="option-undo" v-model="optionUndo">
        <template v-slot:fake-placeholder v-if="optionUndo == ''">
          default&ensp;:&ensp;<div v-html="SLOTS.optionUndo"></div>
        </template>
      </LabelAndControls>
    </div>

    <div class="flex-between to5-5">
      <div>
        <ShowHtmlCode
          class="tag prettyprint lang-html customize"
          :slots="{
            optionUndo: optionUndo || '...'
          }"
          :dropdown="{
            country: { isDisplayForDemo: false },
            name: { isDisplayForDemo: false },
            remark: { isDisplayForDemo: false }
          }"
        />
      </div>

      <GeneralDemo
        class="demo-app"
        v-model="demoStatus"
        :autoFocus="true"
        :displayRefreshBtn="true"
        :displayShowCodeBtn="false"
        :slots="{
          optionUndo: optionUndo
        }"
        :dropdown="{
          name: { isDisplayForDemo: false }
        }"
        :option="{
          country: [{ selected: true }]
        }"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './assets/stylesheets.scss';
</style>
