<template>
  <div id="option-value" class="demo">
    <h4>Value</h4>
    <div class="depiction">
      {{ $t("attributes.description.option.value") }}
      *{{ $t("attributes.description.option.value__notice") }}
    </div>

    <div class="flex-between">
      <ALineCode bolder="value" class="a-line-code" :showTitle="false" />

      <div class="demo-app" :class="appStatus">
        <FocusDemoApp
          v-model="appStatus"
          :dropdown="{
            hiddenName: true,
          }"
          :option="{
            title: false,
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
  name: "option-value",
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
