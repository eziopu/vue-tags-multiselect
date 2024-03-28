<template>
  <div class="attribute" :class="{flexBetween: flexBetween, flex: !flexBetween}">
    <div v-if="label" class="attribute__label">
      {{ label }}<span class="attribute__label--colon">:</span>
    </div>
    <select v-model="newValue" :disabled="disabled" class="attribute__select">
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
    flexBetween: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
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

<style>
.attribute__label--colon {
  margin: 0 .3rem;
}
</style>
