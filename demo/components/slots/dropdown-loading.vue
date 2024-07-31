<script>
export default {
  name: 'dropdown-loading'
}
</script>

<script setup>
import { ref } from 'vue'
import { SLOTS } from '@models/attributes/default.js'
import ShowHtmlCode from '@tools/show-html-code/main.vue'

const demoStatus = ref([])
const dropdownLoadingContent = ref('')
const loading = ref(false)
const dropdownLoading = ref(true)
</script>

<template>
  <div id="dropdown-loading" class="demo" :class="demoStatus">
    <ToolTitle>Dropdown loading</ToolTitle>

    <div class="depiction">
      {{ $t(`attributes.slots.dropdown-loading`) }}
      <div class="sub-depiction">
        <p v-html="$t(`attributes.slots.dropdown-loading__notice`)"></p>
      </div>
    </div>

    <div class="attributes">
      <LabelAndControls model="input" label="dropdown-loading" v-model="dropdownLoadingContent">
        <template v-slot:fake-placeholder v-if="dropdownLoadingContent == ''">
          <div class="demo__loading">
            <span>default : </span>
            <div v-html="SLOTS.dropdownLoading"></div>
          </div>
        </template>
      </LabelAndControls>
    </div>

    <div class="attributes flex-between">
      <LabelAndControls label="dropdownLoading" v-model="dropdownLoading" />
      <LabelAndControls label="loading" v-model="loading" />
    </div>

    <div class="flex-between to5-5">
      <div>
        <ShowHtmlCode
          class="tag prettyprint lang-html customize"
          :app="{
            loading: loading,
            dropdownLoading: dropdownLoading
          }"
          :slots="{
            dropdownLoading: dropdownLoadingContent || '...'
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
          loading: loading,
          dropdownLoading: dropdownLoading
        }"
        :slots="{
          dropdownLoading: dropdownLoadingContent
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
.attributes {
  width: 48%;
  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 397px) {
    flex-direction: column;
  }
}
</style>
