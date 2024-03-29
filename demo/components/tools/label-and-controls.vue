<template>
  <div class="attribute flex">
    <div v-if="label" class="attribute__label">
      {{ label }}<span class="attribute__label--colon">:</span>
    </div>
    <template v-if="model == 'select'">
      <select v-model="newValue" :disabled="disabled" class="attribute__select">
        <option v-for="item in values" :key="item">
          {{ item }}
        </option>
      </select>
    </template>
    <template v-if="model == 'input'">
      <div class="ui input attribute__input">
        <input
          class="form-control"
          v-model="newValue"
          :type="text"
          :disabled="disabled"
          :placeholder="placeholder"
        />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "label-and-controls",
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
    modelValue: {
      type: [String, Boolean],
      default: () => {
        return "";
      },
    },
    model: {
      type: String,
      default: () => {
        return 'select';
      },
    },
    /**
     * input
     **/
    text: {
      type: String,
      default: () => {
        return "text";
      },
    },
    placeholder: {
      type: String,
      default: () => {
        return "";
      },
    },
    /**
     * select
     **/
    values: {
      type: Array,
      default: () => {
        return ["true", "false"];
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

.attribute__select:disabled,
.attribute__input input[disabled] {
  cursor: not-allowed !important;
}
</style>
