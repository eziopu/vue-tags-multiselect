<template>
  <div
    class="dropdown"
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
    value: { type: String, default: "" },
  },

  setup(props, context) {
    return resolve(props, context, [useDropdown]);
  },
};
</script>

<style scoped lang="scss">
.dropdown {
  &.hidden {
    display: none;
  }
}
</style>
