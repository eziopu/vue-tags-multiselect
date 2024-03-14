<template>
  <div
    class="v-dropdown"
    ref="elDropdown"
    :class="{
      'no-title': true,
      'display-all': myDisplayAll,
      disabled: props.disabled,
      divided: props.divided,
      selecting: isSelecting,
      editing: isChildEditing,
      noValue: props.value == undefined || props.value == '',
      hidden: isHidden,
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
import useDropdown from "./composables/useDropdown";

import resolve from "./../../utils/resolve";

export default {
  name: "v-dropdown",

  props: {
    disabled: { type: Boolean, default: false },
    divided: { type: Boolean, default: false },
    displayAll: { type: Boolean, default: false },
    hidden: { type: Boolean, default: false },
    custom: { type: Boolean, default: false },
    system: { type: Boolean, default: false },
    value: { type: String, default: "" },
  },

  setup(props, context) {
    return resolve(props, context, [useDropdown]);
  },
};
</script>

<style scoped lang="scss">
.v-dropdown {
  &.hidden {
    display: none;
  }
  &.divided {
    border-top: 1px solid #22242626;
  }
  &.disabled {
    cursor: not-allowed;
  }
}
</style>
