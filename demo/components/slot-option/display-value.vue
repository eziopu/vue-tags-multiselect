<script>
export default {
  name: 'option-display-value'
}
</script>

<script setup>
import ALineCode from './tools/a-line-code.vue'
</script>

<template>
  <div id="option-display-value" class="demo">
    <ToolTitle>Display value</ToolTitle>

    <div class="depiction">
      {{ $t(`attributes.option.display-value`) }}
    </div>

    <div class="flex-between to5-5">
      <div>
        <h4>true</h4>
        <GeneralDemo
          :displayShowCodeBtn="false"
          :dropdown="{
            name: { isDisplayForDemo: false }
          }"
          :option="{
            country: [{}, { selected: true, displayValue: true }]
          }"
        />
      </div>
      <div>
        <h4>
          false <small> *{{ $t('ui.general.Default', 0) }}</small>
        </h4>
        <GeneralDemo
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

    <div class="flex-between to5-5">
      <div>
        <ALineCode :bolders="['displayValue', 'selected']" />
      </div>
    </div>
  </div>
</template>
