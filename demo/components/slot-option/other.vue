
<script>
export default {
  name: "option-other-attributes",
};
</script>

<script setup>
import { reactive, computed } from "vue";
import LabelAndSelect from "../tools/label-and-select.vue";
import GeneralDemo from "../tools/general-demo.vue";
import ALineCode from "./tools/a-line-code.vue";

const attributes = reactive({
  disabled: "false",
  divided: "false",
  displayAll: "true",
})

const bolders = computed(() => {
  return Object.entries(attributes)
    .filter(([key, value]) => key != "" && value === "true")
    .map(([key]) => key)
});

const toBoolean = (input) => {
  return input == "false" ? false : true;
}
</script>

<template>
  <div id="option-other-attributes" class="demo">
    <div class="flex-between to6-4">
      <div class="attributes">
        <div class="attribute">
          <h3>Disabled</h3>
          <div class="flex-between">
            <div class="depiction">
              {{ $t("attributes.description.option.disabled") }}
            </div>
            <LabelAndSelect label="" v-model="attributes.disabled" />
          </div>
        </div>
        <div class="attribute">
          <h3>Divided</h3>
          <div class="flex-between">
            <div class="depiction">
              {{ $t("attributes.description.option.divided") }}
            </div>
            <LabelAndSelect label="" v-model="attributes.divided" />
          </div>
        </div>

        <ALineCode :bolders="bolders" />
      </div>

      <div class="demo-app">
        <h4>
          <p>
            * {{ $t("ui.page.sentence.The_attributes_changes_in_this_demo_will_only_affect_the_second_option") }}
          </p>
        </h4>
        <GeneralDemo
          :autoFocus="true"
          :displayRefreshBtn="true"
          :displayShowCodeBtn="false"
          :dropdown="{
            country: {displayAll: true},
            name: {isDisplayForDemo: false},
          }"
          :option="{
            country: [
              {}, {
                disabled: toBoolean(attributes.disabled),
                divided: toBoolean(attributes.divided),
              }
            ]
          }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .attributes {
    margin-bottom: 1rem;
  }
</style>