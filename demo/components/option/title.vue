<template>
  <div id="option-title" class="demo">
    <h4>Title</h4>
    <div class="depiction">
      {{ $t("attributes.description.option.title") }}
    </div>

    <div class="flex-between">
      <ALineCode bolder="title" class="a-line-code" />

      <div class="demo-app" :class="appStatus">
        <FocusDemoApp
          v-model="appStatus"
          :dropdown="{
            hiddenName: true,
          }"
          :option="{
            title: true,
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
  name: "option-title",
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
