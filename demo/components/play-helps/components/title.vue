<template>
  <div
    @click="app.displays[target] = !app.displays[target]"
    class="help-title pointer "
    :class="{ active: app.displays[target] }"
  >
    <h3 class="ui title">
      {{ label }}
    </h3>
    <span class="arrow"></span>
  </div>
</template>

<script>
import InjectApp from "../mixins/inject-app.js";

import { defineComponent } from "vue";
export default defineComponent({
  name: "help-title",
  mixins: [InjectApp],
  props: {
    label: {
      type: String,
      default: () => {
        return "";
      },
    },
    target: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
});
</script>

<style scoped lang="scss">
.help-title {
  padding-bottom: 0.6rem;
  &:not(.active) {
    border-bottom: 2px solid #999;
  }
}
</style>
