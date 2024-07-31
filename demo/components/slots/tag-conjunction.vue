<script>
export default {
  name: 'tag-conjunction'
}
</script>

<script setup>
import { ref } from 'vue'
import { SLOTS } from '@models/attributes/default.js'
import ShowHtmlCode from '@tools/show-html-code/main.vue'

const demoStatus = ref([])
const tagConjunctionContent = ref('')
const merge = ref(true)
</script>

<template>
  <div id="tag-conjunction" class="demo" :class="demoStatus">
    <ToolTitle>Tag conjunction</ToolTitle>

    <div class="depiction">
      {{ $t(`attributes.slots.tag-conjunction`) }}
      <div class="sub-depiction">
        <p v-html="$t(`attributes.slots.tag-conjunction__notice`)"></p>
      </div>
    </div>

    <div class="attributes flex-between input-select">
      <LabelAndControls
        model="input"
        label="tag-conjunction"
        v-model="tagConjunctionContent"
        :placeholder="`default : ${SLOTS.tagConjunction}`"
      />
      <LabelAndControls calss="merge" label="merge" v-model="merge" />
    </div>

    <div class="flex-between to5-5">
      <div>
        <ShowHtmlCode
          class="tag prettyprint lang-html customize"
          :app="{
            merge: merge
          }"
          :slots="{
            tagConjunction: tagConjunctionContent || '...'
          }"
          :dropdown="{
            name: { isDisplayForDemo: false },
            remark: { isDisplayForDemo: false }
          }"
        />
      </div>

      <GeneralDemo
        class="demo-app"
        v-model="demoStatus"
        :displayShowCodeBtn="false"
        :app="{
          merge: merge
        }"
        :slots="{
          tagConjunction: tagConjunctionContent
        }"
        :dropdown="{
          name: { isDisplayForDemo: false }
        }"
        :option="{
          country: [{}, { selected: true }, { selected: true }]
        }"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './assets/stylesheets.scss';
</style>
