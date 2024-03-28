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
    modelValue: {
      type: [Boolean, String],
      default: () => {
        return false;
      },
    },
  },
  model: {
    prop: "value",
    event: "update:modelValue",
  },
  computed: {
    newValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", this.toBoolean(value));
      },
    },
  },
  methods: {
    toBoolean(value) {
      if (value === "true" || value === true) return true;
      if (value === "false" || value === false) return false;
      return value;
    },
  },
};
</script>
