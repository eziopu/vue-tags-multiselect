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
import clearHTML from "../../utils/clearHTML";
import slotToText from "../../utils/slotToText";

import { ref, computed, inject, onMounted, watch } from "vue";

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
  setup(props) {
    const elOption = ref(null);
    const indexBySlot = ref(-1);
    const isHover = ref(false);

    const appProps = inject("appProps");
    const appStashTag = inject("appStashTag");
    const dropdownProps = inject("dropdownProps");
    const dropdownIsDown = inject("dropdownIsDown");
    const appIsDuplicateTag = inject("appIsDuplicateTag");

    const isDisabled = computed(() => {
      if (props.title == true) {
        return props.disabled;
      }
      return props.disabled == true || props.value == "";
    });

    const isHide = computed(() => {
      console.log("---------option isHide() dropdownIsDown=", dropdownIsDown.value);
      const isTitle = props.title;
      if (appIsDuplicateTag(dropdownProps.value, props.value) == true) {
        return true;
      }

      if (dropdownIsDown == true) {
        return true;
      }

      if (appStashTag.key != undefined) {
        if (appStashTag.key != dropdownProps.value) {
          return true;
        } else {
          return isTitle ? true : false;
        }
      }



      if (indexBySlot.value == -1) return;
      return false;
      // return dropdown.optionHide(
      //   indexBySlot,
      //   props.title ? "title" : "option",
      //   props.value
      // );
    });

    const dropdownSetTagToTag = inject("dropdownSetTagToTag");
    const handleClick = () => {
      if (isDisabled.value) return;

      dropdownSetTagToTag({
        is_title: props.title,
        vnode: clearHTML(elOption.value.innerHTML) || "",
        // vnode: slots.default(),
        value: props.value,
        displayValue: props.displayValue,
      });
    };

    if (props.selected == true) {
      handleClick();
    }

    return {
      elOption,

      props,
      isDisabled,
      isHover,
      isHide,

      handleClick,
    };
  },
};
</script>

<!-- <script setup>
import {
  ref,
  reactive,
  toRefs,
  computed,
  provide,
  inject,
  VueElement,
  useSlots,
  getCurrentInstance,
  useAttrs,
} from "vue";

const props = defineProps({
  title: { type: Boolean, default: false },
  displayValue: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  divided: { type: Boolean, default: false },
  selected: { type: Boolean, default: false },
  value: { type: String, default: "" },
});
console.log(props.value, "script setup");

const indexBySlot = ref(-1);

const isDisabled = computed(() => {
  return props.disabled == true || props.value == "";
});

const isHover = computed(() => {
  return false;
});

const isHide = computed(() => {
  if (indexBySlot.value == -1) return;
  return false;
  // return dropdown.optionHide(
  //   indexBySlot,
  //   props.title ? "title" : "option",
  //   props.value
  // );
});

const setValue = inject("setValue");
const handleClick = () => {
  console.log("v-option handleClick", props.value);

  if (isDisabled.value) return;
  if (!props.title && !props.value) return;

  const slots = useSlots();
  const instance = getCurrentInstance();
  const obj = {
    is_title: props.title,
    slots: instance,
    value: props.value,
    displayValue: props.displayValue,
  };

  console.log("v-option handleClick setValue", slots.default());

  setValue({
    is_title: props.title,
    slots: slots,
    value: props.value,
    displayValue: props.displayValue,
  });
};
</script> -->

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
