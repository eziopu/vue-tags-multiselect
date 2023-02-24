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
    @click="handleClick()"
    :aria-disabled="isDisabled"
    :tabindex="isDisabled ? 0 : -1"
    collapse="false"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "v-tag-option",
};
</script>

<script setup>
import {
  ref,
  toRefs,
  computed,
  inject,
  VueElement,
  useSlots,
  useAttrs,
} from "vue";

const slots = useSlots();

console.log("v-option setup", slots);
const dropdown = inject("getDropdown");
console.log(dropdown.testfunction("ya"));
console.log("v-option setup end");

// props
const props = defineProps({
  title: { type: Boolean, default: false },
  displayValue: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  divided: { type: Boolean, default: false },
  selected: { type: Boolean, default: false },
  value: { type: String, default: "" },
});

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

const handleClick = () => {
  console.log("v-option handleClick", props.value);

  if (isDisabled.value) return;

  if (props.title == true) {
    // this.dropdown.setTitle();
  } else {
    if (!props.value) return;
    // this.dropdown.setValue({
    //   elm: {
    //     value: this.$slots.default,
    //   },
    //   value: props.value,
    //   displayValue: props.displayValue,
    // });
  }
};
</script>
