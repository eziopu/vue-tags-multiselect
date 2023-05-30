<template>
  <div
    class="option"
    ref="elOption"
    :class="{
      title: props.title == true,
      disabled: isDisabled,
      divided: props.divided,
      hover: isHover,
      noValue: props.value == undefined,
      hidden: isHide,
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
import resolve from "./../../utils/resolve";
import useInjects from "./composables/useInjects";
import useSetTag from "./composables/useSetTag";
import useSearch from "./composables/useSearch";
import useOption from "./composables/useOption";
import useRegistration from "./composables/useRegistration";

export default {
  name: "v-tag-option",
  props: {
    title: { type: Boolean, default: false },
    displayValue: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    divided: { type: Boolean, default: false },
    selected: { type: Boolean, default: false },
    value: { type: String, default: "" },
  },
  setup(props, context) {
    return resolve(props, context, [
      useInjects,
      useSetTag,
      useSearch,
      useOption,
      useRegistration,
    ]);
  },
};
</script>

<style scoped lang="scss">
.option {
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
    border-bottom: 1px solid #2224261a;
  }

  &.hover {
    background: #f2f2f2;
  }

  &.hidden {
    height: 0;
    padding: 0;
    visibility: hidden;
    opacity: 0;
    transform: scaleY(0);
  }
}
</style>
