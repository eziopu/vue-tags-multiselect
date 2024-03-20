<script>
export default {
  name: "option-display-value",
};
</script>

<script setup>
import ALineCode from "./tools/a-line-code.vue";
import GeneralDemo from "../tools/general-demo.vue";
</script>

<template>
  <div id="option-display-value" class="demo">
    <h4>Display value</h4>
    <div class="depiction">
      {{ $t("attributes.description.option.display-value") }}
    </div>

    <div class="flex-between to5-5">
      <div>
        <h5>true</h5>
        <GeneralDemo
          :displayRefreshBtn="true"
          :displayShowCodeBtn="false"
          :dropdown="{
            name: {isDisplayForDemo: false},
          }"
          :option="{
            country: [{}, {selected: true, displayValue: true}],
          }"
        />
      </div>
      <div>
        <h5>false <small> *{{ $t("ui.general.default") }}</small></h5>
        <GeneralDemo
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

    <div class="flex-between to5-5">
      <div>
        <ALineCode :bolders="['displayValue', 'selected']" />
      </div>
    </div>
  </div>
</template>
