<template>
  <div
    class="option"
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
  {{ isHover }}
    <slot></slot>
  </div>
</template>

<script>
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
  setup(props, { slots }) {
    const indexBySlot = ref(-1);
    const isHover = ref(false);

    const isDisabled = computed(() => {
      if (props.title == true) {
        return props.disabled;
      }
      return props.disabled == true || props.value == "";
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

    const dropdownSetValue = inject("dropdownSetValue");
    const handleClick = (event) => {
      if (isDisabled.value) return;

      dropdownSetValue({
        is_title: props.title,
        vnode: event.target.innerHTML || "",
        // vnode: slots.default(),
        value: props.value,
        displayValue: props.displayValue,
      });
    };

    if (props.selected == true) {
      handleClick();
    }

    return {
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
