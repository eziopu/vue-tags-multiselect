<script>
export default {
  name: 'option-other-attributes'
}
</script>

<script setup>
import { ref, reactive } from 'vue'

import ALineCode from './tools/a-line-code.vue'

const demoStatus = ref([])
const attributes = reactive({
  disabled: false,
  divided: false,
  displayAll: true
})
</script>

<template>
  <div id="option-other-attributes" class="demo" :class="demoStatus">
    <hr />

    <div class="flex-between to5-5">
      <div class="attributes">
        <div class="attribute">
          <h3>Disabled</h3>
          <div class="flex-between">
            <div class="depiction">
              {{ $t(`attributes.option.disabled`) }}
            </div>
            <LabelAndControls label="" v-model="attributes.disabled" />
          </div>
        </div>
        <div class="attribute">
          <h3>Divided</h3>
          <div class="flex-between">
            <div class="depiction">
              {{ $t(`attributes.option.divided`) }}
            </div>
            <LabelAndControls label="" v-model="attributes.divided" />
          </div>
        </div>

        <ALineCode :bolders="$objectKeyToArray(attributes, true)" />
      </div>

      <div class="demo-app">
        <h4>
          <p>
            *
            {{
              $t(
                `ui.page.sentence.The_attributes_changes_in_this_demo_will_only_affect_the_second_option`
              )
            }}
          </p>
        </h4>
        <GeneralDemo
          v-model="demoStatus"
          :autoFocus="true"
          :displayShowCodeBtn="false"
          :dropdown="{
            country: { displayAll: true },
            name: { isDisplayForDemo: false }
          }"
          :option="{
            country: [
              {},
              {
                disabled: attributes.disabled,
                divided: attributes.divided
              }
            ]
          }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@media (max-width: 768px) {
  .demo {
    transition: all 0.2s ease-out;

    &.selecting {
      margin-bottom: 18rem;
    }
  }
}
</style>
