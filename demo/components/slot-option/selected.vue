<template>
  <div id="option-selected" class="demo">
    <h4>Selected</h4>
    <div class="depiction">
      {{ $t("attributes.description.option.selected") }}
    </div>

    <div class="flex-between">
      <ALineCode bolder="selected" class="a-line-code" />

      <div class="demo-app" :class="appStatus">
        <FocusDemoApp
          v-model="appStatus"
          :dropdown="{
            hiddenName: true,
          }"
          :option="{
            selected: true,
          }"
        >
        </FocusDemoApp>
      </div>
    </div>
  </div>
</template>

<script>
import ALineCode from "./tools/a-line-code.vue";
import FocusDemoApp from "../tools/focus-demo-app.vue";

export default {
  name: "option-selected",
  components: {
    ALineCode,
    FocusDemoApp,
  },
  data() {
    return {
      appStatus: [],
    };
  },
};
</script>
<style scoped lang="scss">
@import "./assets/stylesheets.scss";
</style>
