<template>
  <div id="option-OR-conjunction" class="demo">
    <h3>option OR conjunction</h3>
    <div class="depiction">
      {{ $t("attributes.description.slots.option-OR-conjunction") }}
    </div>

    <hr />
    <div class="attributes flex-between">
      <div class="attribute flex-between text">
        <span> option-OR-conjunction: </span>
        <div class="ui input">
          <input
            type="text"
            class="form-control"
            v-model="optionORConjunction"
            :placeholder="`default: OR`"
          />
        </div>
      </div>
    </div>

    <div class="flex-between">
      <ShowHtmlCode
        class="a-line-code tag prettyprint lang-html customize"
        :app="{optionORConjunctionContent: optionORConjunction}"
        :dropdownSetting="{
          display: {
            country: false,
            name: false,
            remark: false,
          }
        }"
      />

      <div class="demo-app" :class="appStatus">
        <FocusDemoApp
          isORConjunctionDemo
          v-model="appStatus"
          :slots="{ optionORConjunction: optionORConjunction }"
        >
        </FocusDemoApp>
      </div>
    </div>
  </div>
</template>

<script>
import FocusDemoApp from "./tools/focus-demo-app.vue";
import ShowHtmlCode from "../tools/show-html-code/main.vue"

export default {
  name: "option-OR-conjunction",
  components: {
    FocusDemoApp,
    ShowHtmlCode,
  },
  data() {
    return {
      appStatus: [],
      optionORConjunction: "OR",
    };
  },
};
</script>

<style scoped lang="scss">
@import "./assets/stylesheets.scss";
</style>
