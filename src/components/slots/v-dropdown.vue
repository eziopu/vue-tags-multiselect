<template>
  <div
    class="dropdown"
    ref="elDropdown"
    :class="{
      'no-title': true,
      'display-all': myDisplayAll,
      disabled: props.disabled,
      divided: props.divided,
      // selecting: current.tag.key == props.value,
      editing: isChildEditing, // editMyself
      noValue: props.value == undefined || props.value == '',
      hidden: isHidden,
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
import clearHTML from "../../utils/clearHTML";

import {
  ref,
  reactive,
  provide,
  computed,
  onMounted,
  inject,
  readonly,
} from "vue";
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
    // handle option status list
    const elDropdown = ref(null);
    const options = ref([]);
    // onMounted(() => {
    //   console.log("elDropdown", props.value);
    //   console.log(elDropdown.value);
    // });

    // data
    const hover = ref(false);
    const selecting = ref(false);

    const appStashTag = inject("appStashTag");
    const appEeditTagIndex = inject("appEeditTagIndex");
    const isChildEditing = computed(() => {
      if (appStashTag.key == props.value && appEeditTagIndex.value != -1) {
        return true;
      }
      return false;
    });

    const getTitleInnerHTML = computed(() => {
      if (elDropdown.value == null) {
        return null;
      }
      const result = [...elDropdown.value.children].find((vnode) => {
        return [...vnode.classList].includes("title");
      });
      return result != undefined ? clearHTML(result.innerHTML) : null;
    });

    const hasVNodeTitle = computed(() => {
      return getTitleInnerHTML.value != null;
    });

    const appTags = inject("appTags");
    const mySelectIsDown = computed(() => {
      if (props.custom == true) {
        return false;
      }
      const myTags = appTags.filter((tag) => tag.key == props.value) || [];
      let childrenLength = slots.default().length;
      if (hasVNodeTitle.value == true) {
        childrenLength -= 1;
      }
      return childrenLength == myTags.length;
    });
    provide("dropdownIsDown", mySelectIsDown);

    const myDisplayAll = computed(() => {
      if (hasVNodeTitle.value == false) {
        return true;
      } else {
        return props.displayAll;
      }
    });
    provide("dropdownDisplayAll", myDisplayAll);

    const classList = computed(() => {
      if (elDropdown.value == null) return [];
      const list = [...elDropdown.value.classList];
      const blacklist = new Set([
        "dropdown",
        "display-all",
        "no-title",
        "disabled",
        "divided",
        "hidden",
        "hover",
      ]);
      return list.filter((x) => !blacklist.has(x)) || [];
    });

    const children = reactive({
      optionCounts: 0,
      values: [],
      displaies: [],
      isSearchs: [],
    });

    // const initPrototypeStashTag = () => ({
    //   elm: {
    //     value: undefined,
    //     title: undefined,
    //   },
    //   key: props.value,
    //   custom: props.custom,
    //   value: undefined, // is option value
    //   displayValue: undefined, // is option value
    //   classList: classList.value,
    // });
    const prototypeStashTag = {
      titleElm: null,
      valueElm: null,
      value: null, // is option value
      key: props.value,
      custom: props.custom,
      displayValue: null, // is option value
      classList: classList.value,
    };

    const appReFocus = inject("appReFocus");
    const appSetStashTag = inject("appSetStashTag");
    const appSetStashTagToTags = inject("appSetStashTagToTags");
    provide("dropdownSetTagToTag", (item = {}) => {
      const stashTag = JSON.parse(JSON.stringify(prototypeStashTag));
      stashTag.value = item.value;
      stashTag.displayValue = item.displayValue;

      if (item.is_title == true) {
        stashTag.titleElm = item.vnode;
      } else {
        stashTag.valueElm = item.vnode;

        if (stashTag.titleElm == null) {
          stashTag.titleElm = getTitleInnerHTML.value;
        }
      }
      appSetStashTag(stashTag);

      if (stashTag.valueElm != null) {
        appSetStashTagToTags();
      }
      appReFocus();
    });

    provide("dropdownProps", readonly(props));

    const isHidden = computed(() => {
      if (props.hidden == true || mySelectIsDown.value == true) {
        return true;
      }
      if (appEeditTagIndex.value != -1 && isChildEditing.value == false) {
        return true;
      }

      return false;
    });

    const optionRegistered = (target = "title", value) => {
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
    provide("dropdownOptionRegistered", optionRegistered);

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
      elDropdown,

      props,
      myDisplayAll,
      isHidden,
      isChildEditing,
    };
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
