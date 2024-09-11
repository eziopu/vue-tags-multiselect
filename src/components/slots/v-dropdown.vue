<template>
  <div
    class="v-dropdown"
    ref="elDropdown"
    :class="{
      'no-title': !hasVNodeTitle,
      'display-all': myDisplayAll,
      disabled: props.disabled,
      divided: props.divided,
      selecting: isSelecting,
      editing: isChildEditing,
      hidden: isHidden,
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
import { vDropdownProps } from "./models.js";
import useDropdown from "./composables/useDropdown";

import resolve from "./../../utils/resolve";

export default {
  name: "v-dropdown",

  props: vDropdownProps(),

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
