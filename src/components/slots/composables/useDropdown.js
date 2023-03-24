import {
  ref,
  computed,
  provide,
  readonly,
  // onMounted,
  // nextTick,
  inject,
} from "vue";

import clearHTML from "../../../utils/clearHTML";

export default function useDropdown(props, context) {
  // ================ DATA ================

  const { slots } = context;

  // ================ REFS ================

  const elDropdown = ref(null);

  // ================ INJECT DATA ================

  const appTags = inject("appTags");

  const appStashTag = inject("appStashTag");

  const appEeditTagIndex = inject("appEeditTagIndex");

  // ============== COMPUTED ==============

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
    if (appStashTag.key == props.value && appEeditTagIndex.value != -1) {
      return true;
    }
    return false;
  });

  const isHidden = computed(() => {
    if (props.hidden == true || isDown.value == true) {
      return true;
    }
    if (appEeditTagIndex.value != -1 && isChildEditing.value == false) {
      return true;
    }

    return false;
  });

  const isDown = computed(() => {
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

  const myDisplayAll = computed(() => {
    if (hasVNodeTitle.value == false) {
      return true;
    } else {
      return props.displayAll;
    }
  });

  // =============== PROVIDE ==============

  provide("dropdownProps", readonly(props));

  provide("dropdownIsDown", isDown);

  provide("dropdownDisplayAll", myDisplayAll);

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
