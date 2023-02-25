<template>
  <div
    class="dropdown"
    :class="{
      'no-title': true,
      'display-all': true,
      disabled: props.disabled,
      divided: props.divided,
      // selecting: current.tag.key == props.value,
      editing: editMyself,
      noValue: props.value == undefined,
      // hidden:
      //   this.hidden ||
      //   this.allChildrenIsHidden() ||
      //   (this.system == false && this.validatorString(this.value) == false),
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
import slotToText from "../../utils/slotToText";

import { ref, reactive, provide, computed, h, inject } from "vue";
export default {
  name: "v-dropdown",

  props: {
    disabled: { type: Boolean, default: false },
    divided: { type: Boolean, default: false },
    displayAll: { type: Boolean, default: false },
    hidden: { type: Boolean, default: false },
    system: { type: Boolean, default: false },
    custom: { type: Boolean, default: false },
    value: { type: String, default: "" },
  },

  setup(props, { slots }) {
    // data
    const hover = ref(false);
    const selecting = ref(false);
    const editMyself = ref(false);
    const titleVNode = reactive({
      exist: false,
      elm: undefined,
    });
    const classList = reactive([]);
    const children = reactive({
      optionCounts: 0,
      values: [],
      displaies: [],
      isSearchs: [],
    });

    // const app = inject("getApp");

    // const currentTagKey = computed(() => {
    //   return (app.current.tag || {}).key || undefined;
    // });

    // mounted() {
    //   if (this.selected == true) {
    //     this.handleClick();
    //   }
    // }

    // beforeUnmount() {
    //   // this.appCancelled();
    // }

    /*

*/

    provide("dropdownSetValue", (item = {}) => {
      const tag = {
        elm: {
          title: undefined,
          value: undefined,
        },
        key: props.value,
        value: item.value,
        custom: props.custom,
        classList: props.classList,
        displayValue: item.displayValue,
      };

      if (item.is_title == true) {
        tag.elm.title = item.vnode;
      } else {
        tag.elm.title = getTitleVNode();
        tag.elm.value = item.vnode;
      }
      console.log("tag = ");
      console.log(tag.elm.title);
    });

    // this.dropdown.setTitle();
    // this.dropdown.setValue({
    //   elm: {
    //     value: this.$slots.default,
    //   },
    //   value: props.value,
    //   displayValue: props.displayValue,
    // });

    const getTitleVNode = () => {
      const vnode =
        slots.default().filter((vnode) => {
          return (
            vnode.props.title == "" &&
            slotToText(vnode.children.default()) != ""
          );
        }) || undefined;

      return vnode != undefined ? vnode[0].children.default() : undefined;
    };
    console.log("v-dropdown setup", getTitleVNode());

    const optionRegistered = (target = "title", value, indexBySlot) => {
      console.log("dropdown methods optionRegistered", target, value);
      // if (target == "title" && this.titleVNode.exist == false) {
      //   this.titleVNode.exist = true;
      //   this.titleVNode.elm = value;
      // } else if (target == "option") {
      //   this.children.optionCounts++; // maybe option value is undefined (need use push update option value)
      //   this.children.values.splice(indexBySlot, 0, value);
      // }
      // this.children.isSearchs.splice(indexBySlot, 0, false);
    };
    const appCancelled = (value = this.value) => {
      console.log("dropdown methods", value);

      // if (this.validatorString(value) == false) return;
      // let { app } = this;
      // this.$delete(app.dropdown.customs, value);
      // this.$delete(app.dropdown.isFinishs, value);
      // this.$delete(app.dropdown.optionCounts, value);
      // this.$delete(app.dropdown.optionDisplaies, value);
    };
    const optionHide = (
      indexBySlot = 0,
      target = "title",
      optionValue = ""
    ) => {
      // if (this.system == true) return false;
      // if (this.hidden == true || this.isFinish == true) return true;

      // if (target == "option") {
      //   if (this.app.isRepeatTags(this.value, optionValue) == true) return true;
      // }

      // if (this.appIsEditMode == true) {
      //   if (this.editMyself == false) return true;
      //   if (this.editMyself == true) {
      //     return target == "title";
      //   }
      // }

      // // selecting no key
      // if (this.currentConjunction == "AND" || this.currentConjunction == "") {
      //   if (this.app.isRepeatTagsByKey(this.value) == true) return true;
      // }

      // // 竟可能過濾 虛隱藏的情況 最後return false
      // if (this.currentTagKey) {
      //   if (this.currentTagKey != this.value) return true;
      //   if (target == "title") return true;
      // }

      // if (this.appIsSearchMode == true) {
      //   return this.optionHideBySearchMode(indexBySlot, target);
      // }

      // if (target == "option" && this.currentTagKey == undefined) {
      //   return !this.realDisplayAll;
      // }
      return false;
    };

    return {
      props,
    };
  },
};
</script>

<script setup></script>

<style scoped lang="scss">
.dropdown {
  &,
  .option {
    // visibility: visible;
    // opacity: 1;
  }

  &.transition,
  &.transition .option {
    transform: scaleY(1);
    transform-origin: top;
    transition: transform 0.26s ease;
  }

  .option {
    padding: 8px 18px;
    height: auto;
    text-align: left;
    cursor: pointer;

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
  }

  &.divided {
    border-bottom: 1px solid #2224261a;
  }

  &.hidden,
  .option.hidden {
    height: 0;
    padding: 0;
    visibility: hidden;
    opacity: 0;
    transform: scaleY(0);
  }

  &.display-all:not(.no-title):not(.editing):not(.selecting) {
    // show all
    .option:not(.title) {
      padding-left: 30px;
    }
  }
}
</style>
