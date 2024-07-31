<script>
export default {
  name: 'loading-slot'
}
</script>

<script setup>
import { ref } from 'vue'
import { SLOTS } from '@models/attributes/default.js'
import ShowHtmlCode from '@tools/show-html-code/main.vue'

const demoStatus = ref([])
const loadingContent = ref('')
const loading = ref(true)
</script>

<template>
  <div id="loading" class="demo" :class="demoStatus">
    <ToolTitle>Loading</ToolTitle>

    <div class="depiction">
      {{ $t(`attributes.slots.loading`) }}
    </div>

    <div class="attributes flex-between input-select">
      <LabelAndControls model="input" label="loading" v-model="loadingContent">
        <template v-slot:fake-placeholder v-if="loadingContent == ''">
          <div class="demo__loading">
            <span>default : </span>
            <div v-html="SLOTS.loading"></div>
          </div>
        </template>
      </LabelAndControls>
      <LabelAndControls label="loading" v-model="loading" />
    </div>

    <div class="flex-between to5-5">
      <div>
        <ShowHtmlCode
          class="tag prettyprint lang-html customize"
          :app="{
            loading: loading
          }"
          :slots="{
            loading: loadingContent || '...'
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
        :autoFocus="true"
        :displayShowCodeBtn="false"
        :app="{
          loading: loading
        }"
        :slots="{
          loading: loadingContent
        }"
        :dropdown="{
          name: { isDisplayForDemo: false }
        }"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './assets/stylesheets.scss';
</style>
