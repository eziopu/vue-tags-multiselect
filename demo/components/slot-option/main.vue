<template>
  <div id="option-slots" class="demo">
    <Value></Value>
    <Title></Title>
    <Selected></Selected>
    <DisplayValue></DisplayValue>
    <div class="flex-between">
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
      </div>

      <div class="demo-app" :class="appStatus">
        <h6>
          *
          {{
            $t(
              "ui.page.sentence.attribute_only_change_first_dropdown_option_title"
            )
          }}
        </h6>
        <FocusDemoApp
          v-model="appStatus"
          :dropdown="{
            displayAll: true,
            hiddenName: true,
          }"
          :option="{
            disabled: toBoolean(disabled),
            divided: toBoolean(divided),
          }"
        >
        </FocusDemoApp>
      </div>
    </div>
  </div>
</template>

<script>
import Value from "./value.vue";
import Title from "./title.vue";
import Selected from "./selected.vue";
import DisplayValue from "./display-value.vue";
import LabelAndSelect from "../tools/label-and-select.vue";
import FocusDemoApp from "../tools/focus-demo-app.vue";

export default {
  name: "option-slots-main",
  components: {
    Value,
    // eslint-disable-next-line vue/no-reserved-component-names
    Title,
    Selected,
    DisplayValue,
    LabelAndSelect,
    FocusDemoApp,
  },
  data() {
    return {
      disabled: "false",
      divided: "false",
      appStatus: [],
    };
  },
  methods: {
    toBoolean(value) {
      return value == "false" ? false : true;
    },
  },
};
</script>
<style scoped lang="scss">
.flex-between {
  .attributes {
    width: 52%;
  }
  .demo-app {
    width: 40%;
  }
  @media all and (max-width: 1200px) {
    .demo-app {
      width: 30%;
    }
  }
  @media all and (max-width: 992px) {
    .demo-app {
      width: 40%;
    }
    .demo-app {
      margin-top: 24px;
    }
  }
  @media all and (max-width: 576px) {
    & {
      flex-direction: column;
    }
    .attributes,
    .demo-app {
      width: 100%;
    }
    .demo-app {
      margin-top: 24px;

      &.selecting {
        margin-bottom: 108px;
      }
    }
  }
}
</style>
