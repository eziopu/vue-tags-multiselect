
<script>
export default {
  name: "label-and-select",
};
</script>

<script setup>
import { computed } from "vue";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: "",
  },
  values: {
    type: Array,
    default: () => [],
  },
});

const options = computed(() => {
  return props.values.length > 0 ? props.values : ["true", "false"];
});
</script>

<template>
  <div class="flex-between">
    <div>{{ value }}</div>
    <select v-model="app[value]" :disabled="disabled">
      <option v-for="item in options" :key="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>