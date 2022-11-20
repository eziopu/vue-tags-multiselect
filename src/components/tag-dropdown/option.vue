<template>
  <div
    class="option"
    :class="{
      title: title,
      disabled: isDisabled,
      divided: divided,
      hover: isHover,
      noValue: value == undefined,
      hidden: isHide == true,
    }"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
    @click="handleClick"
    :aria-disabled="isDisabled"
    :tabindex="isDisabled ? null : -1"
    collapse="false"
  >
    <slot></slot>
  </div>
</template>
<script>
import InjectApp from "../mixins/inject-app";
import InputSearch from "./mixins/input-search";
import SlotsToText from "./mixins/slots-to-text";

import { defineComponent } from "vue-demi";
export default defineComponent({
  name: "v-tag-option",
  mixins: [InjectApp, InputSearch, SlotsToText],
  inject: ["getDropdown"],
  props: {
    title: Boolean,
    displayValue: Boolean,
    disabled: Boolean,
    divided: Boolean,
    selected: Boolean,
    value: String,
  },
  data() {
    return {
      isSearch: false,
      isHover: false,
      indexBySlot: -1,
    };
  },
  computed: {
    dropdown() {
      return this.getDropdown();
    },
    isHide() {
      if (this.indexBySlot == -1) return;
      return this.dropdown.optionHide(
        this.indexBySlot,
        this.title ? "title" : "option",
        this.value
      );
    },
    isDisabled() {
      return this.disabled == true || this.dropdown.disabled == true;
    },
  },
  watch: {
    value(value) {
      if (this.title == false) {
        this.dropdown.children.values[this.indexBySlot] = value;
      }
    },
    isHover(value) {
      if (value == true) {
        this.app.optionHoverByMouse = true;
      }
    },
    isHide: {
      handler(value) {
        if (this.indexBySlot == -1) return;
        this.dropdown.setChildrenDisplaies(this.indexBySlot, !value);
      },
      immediate: true,
    },
    "app.optionHoverByMouse": {
      handler(value) {
        if (value == true && this.isHover == false) {
          this.$nextTick(() => {
            this.$el.classList.remove("hover");
          });
        }
      },
      immediate: true,
    },
    "app.edit.value": {
      handler(value) {
        if (this.title == false && value == this.value) {
          this.isHover = true;
        } else {
          this.isHover = false;
        }
      },
      deep: true,
    },
  },
  created() {
    this.indexBySlot = this.dropdown.getChildrenIndex(this.$slots.default);
    this.dropdown.optionRegistered(
      this.title ? "title" : "option",
      this.title ? this.$slots.default : this.value,
      this.indexBySlot
    );
  },
  beforeUnmount() {
    this.dropdown.optionCancelled(
      this.title ? "title" : "option",
      this.title ? "" : this.value,
      this.indexBySlot
    );
  },
  mounted() {
    if (this.selected == true) {
      this.handleClick();
    }
  },
  methods: {
    handleClick() {
      if (this.isDisabled) return;

      if (this.title == true) {
        this.dropdown.setTitle();
      } else {
        if (!this.value) return;
        this.dropdown.setValue({
          elm: {
            value: this.$slots.default,
          },
          value: this.value,
          displayValue: this.displayValue,
        });
      }
    },
  },
});
</script>
