<template>
  <div
    class="v-option"
    ref="elOption"
    :class="{
      title: props.title == true,
      disabled: isDisabled,
      divided: props.divided,
      hover: isHover,
      'no-value': props.value == undefined || props.value == '',
      hidden: isDuplicateOption || isHidden,
    }"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
    @click="handleClick"
    :aria-disabled="isDisabled"
    :tabindex="isDisabled ? 0 : -1"
    collapse="false"
  >
    <slot></slot>
  </div>
</template>

<script>
import { vOptionProps } from "./models.js";
import useSetTag from "./composables/useSetTag";
import useSearch from "./composables/useSearch";
import useOption from "./composables/useOption";
import useRegistration from "./composables/useRegistration";

import resolve from "./../../utils/resolve";

export default {
  name: "v-option",
  props: vOptionProps(),
  setup(props, context) {
    return resolve(props, context, [
      useSetTag,
      useSearch,
      useOption,
      useRegistration,
    ]);
  },
};
</script>

<style scoped lang="scss">
.v-option {
  padding: 8px 18px;
  height: auto;
  text-align: left;
  cursor: pointer;
  visibility: visible;
  opacity: 1;

  &.title {
    padding-left: 9px;
  }

  &.disabled {
    cursor: default;
    pointer-events: none;
    opacity: 0.45;
  }

  &.divided {
    border-top: 1px solid #22242626;
  }

  &.hover {
    background: #f2f2f2;
  }

  &.hidden {
    height: 0 !important;
    padding: 0 !important;
    visibility: hidden;
    opacity: 0;
    transform: scaleY(0);
  }
}
</style>
