import {
  ref,
  watch,
  computed,
  provide,
  readonly,
  inject,
  onBeforeUnmount,
} from "vue";

import clearHTML from "../../../utils/clearHTML";

export default function useDropdown(props, context) {
  // ============== DATA ================

  const { slots } = context;

  // ============== REFS ================

  const elDropdown = ref(null);

  // ============== INJECT DATA ================

  const appStashTag = inject("appStashTag");

  const appEditTagIndex = inject("appEditTagIndex");

  // ============== COMPUTED ================

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

  const isSelecting = computed(() => {
    return appStashTag.key == props.value;
  });

  const isChildEditing = computed(() => {
    if (appStashTag.key == props.value && appEditTagIndex.value != -1) {
      return true;
    }
    return false;
  });

  const isHidden = computed(() => {
    if (props.hidden == true || isDown.value == true) {
      return true;
    }
    if (appEditTagIndex.value != -1 && isChildEditing.value == false) {
      return true;
    }

    return false;
  });

  const myDisplayAll = computed(() => {
    if (hasVNodeTitle.value == false) {
      return true;
    } else {
      return props.displayAll;
    }
  });

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

  // == IsDown ==============

  const appTags = inject("appTags");
  const appProps = inject("appProps");
  const appDropdownStatus = inject("appDropdownStatus");

  const isDown = computed(() => {
    if (props.custom == true) {
      return false;
    }

    const mySelectedTags =
      appTags.filter((tag) => tag.key == props.value) || [];

    if (appProps.conjunction == "AND") {
      return mySelectedTags.length >= 1;
    }

    // 刪除可能為註解or文字的 children
    let childrenLength = slots
      .default()
      .filter((slot) => typeof slot.type === "object").length;
    if (hasVNodeTitle.value == true) {
      childrenLength -= 1;
    }
    return childrenLength == mySelectedTags.length;
  });

  if (props.value != null && props.value != "") {
    appDropdownStatus[props.value] = { isDown: false };

    watch(
      isDown,
      (value) => {
        appDropdownStatus[props.value].isDown = value;
      },
      { immediate: true }
    );

    onBeforeUnmount(() => {
      delete appDropdownStatus[props.value];
    });
  }

  // ============== PROVIDE ==============

  provide("dropdownProps", readonly(props));

  provide("dropdownIsDown", readonly(isDown));

  provide("dropdownDisplayAll", readonly(myDisplayAll));

  provide("dropdownGetTitleInnerHTML", readonly(getTitleInnerHTML));

  provide("dropdownClassList", readonly(classList));

  return {
    elDropdown,

    props,
    myDisplayAll,
    isHidden,
    isSelecting,
    isChildEditing,

    getTitleInnerHTML,
  };
}
