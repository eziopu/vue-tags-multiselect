<template>
  <div id="option-other-attributes" class="demo">
    <div class="flex-between to6-4">
      <div class="attributes">
        <div class="attribute">
          <h4>Disabled</h4>
          <div class="flex-between">
            <div class="depiction">
              {{ $t("attributes.description.option.disabled") }}
            </div>
            <LabelAndSelect label="" v-model="disabled" />
          </div>
        </div>
        <div class="attribute">
          <h4>Divided</h4>
          <div class="flex-between">
            <div class="depiction">
              {{ $t("attributes.description.option.divided") }}
            </div>
            <LabelAndSelect label="" v-model="divided" />
          </div>
        </div>

        <ALineCode :bolders="bolders" />
      </div>

      <div class="demo-app">
        <h4>
          <p>
            * {{ $t("ui.page.sentence.The_attributes_changes_in_this_demo_will_only_affect_the_first_option") }}
          </p>
          <p>
            {{ $t("ui.page.sentence.Some_attributes_will_change_the_second_option") }}
          </p>
        </h4>
        <GeneralDemo
          :autoFocus="true"
          :displayRefreshBtn="true"
          :displayShowCodeBtn="false"
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

<script>
import LabelAndSelect from "../tools/label-and-select.vue";
import GeneralDemo from "../tools/general-demo.vue";
import ALineCode from "./tools/a-line-code.vue";

export default {
  name: "option-other-attributes",
  components: {
    LabelAndSelect,
    GeneralDemo,
    ALineCode,
  },
  data() {
    return {
      attributes: {
        displayAll: "false",
        disabled: "false",
        divided: "false",
        hidden: "false",
      }
    };
  },
  computed: {
    bolders() {
      return Object.entries(this.attributes)
        .filter(([key, value]) => key != "" && value === "true")
        .map(([key]) => key);
    },
  },
  methods: {
    toBoolean(value) {
      return value == "false" ? false : true;
    },
  },
};
</script>
<style scoped lang="scss">
  .attributes {
    margin-bottom: 1rem;
  }
</style>