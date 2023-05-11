<template>
  <div class="attribute flex-between">
    <div v-if="label">{{ label }} :&nbsp;</div>
    <select v-model="newValue" :disabled="disabled">
      <option v-for="item in values" :key="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "label-and-select",
  props: {
    disabled: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    label: {
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
    value: {
      type: String,
      default: () => {
        return "false";
      },
    },
  },
  data() {
    return {
      newValue: this.value,
    };
  },
  model: {
    prop: "value",
    event: "update",
  },
  watch: {
    newValue(newValue) {
      this.$emit("update", newValue);
    },
  },
};
</script>
