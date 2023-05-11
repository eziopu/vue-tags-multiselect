<template>
  <div class="flex-between">
    <div>{{ value }}</div>
    <select v-model="app[value]" :disabled="disabled">
      <option v-for="item in values" :key="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script>
import InjectApp from "../mixins/inject-app.js";
import { defineComponent } from "vue";
export default defineComponent({
  name: "label-and-select",
  mixins: [InjectApp],
  props: {
    disabled: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    value: {
      type: String,
      default: () => {
        return "";
      },
    },
    values: {
      type: Array,
      default: () => {
        return ["true", "false"];
      },
    },
  },
});
</script>
