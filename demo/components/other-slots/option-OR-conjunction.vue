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
      <ALineCode
        :slots="{ optionORConjunction: optionORConjunction }"
        class="a-line-code"
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
import ALineCode from "./tools/a-line-code.vue";
import FocusDemoApp from "./tools/focus-demo-app.vue";

export default {
  name: "option-OR-conjunction",
  components: {
    ALineCode,
    FocusDemoApp,
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
