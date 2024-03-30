<template>
  <div class="attribute flex tool-attribute" :class="model">
    <div v-if="label" class="tool-attribute__label">
      {{ label }}<span class="tool-attribute__label--colon">:</span>
    </div>
    <template v-if="model == 'select'">
      <select
        v-model="newValue"
        class="tool-attribute__select"
        :disabled="disabled"
        :style="{'width': width}"
      >
        <option v-for="item in values" :key="item">
          {{ item }}
        </option>
      </select>
    </template>
    <template v-if="model == 'input'">
      <div class="ui input tool-attribute__input">
        <div class="tool-attribute__input--fake-placeholder">
          <slot name="fake-placeholder"></slot>
        </div>
        <input
          v-model="newValue"
          class="form-control"
          :style="{'width': width}"
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
    width: {
      type: String,
      default: () => {
        return "atuo";
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

<style scoped lang="scss">
.tool-attribute {
  flex-flow: wrap;
}

.tool-attribute__label--colon {
  margin: 0 .3rem;
}

.tool-attribute__select:disabled,
.tool-attribute__input input[disabled] {
  cursor: not-allowed !important;
}

.tool-attribute__input {
  position: relative;
  flex: 1 1 auto;
}

.tool-attribute__input--fake-placeholder {
  position: absolute;
  padding-left: .9rem;
  top: 50%;
  user-select:none;
  pointer-events: none;
  transform: translate(0%, -50%);
  color: #6c757d;
}
</style>