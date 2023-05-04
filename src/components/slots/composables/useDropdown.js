import {
  ref,
  reactive,
  watch,
  computed,
  provide,
  readonly,
  inject,
  onBeforeUnmount,
} from "vue";

import clearHTML from "../../../utils/clearHTML";

export default function useDropdown(props) {
  // ============== DATA ================

  const optionStatus = reactive({});

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

  const appConjunction = inject("appConjunction");
  const isHidden = computed(() => {
    if (props.system == true) {
      return isHiddenBySystem();
    }
    if (props.hidden == true || isDown.value == true) {
      console.log("11111111");
      return true;
    }

    if (appEditTagIndex.value != -1 && isChildEditing.value == false) {
      console.log("222222");
      return true;
    }

    if (isAllOptionSelected.value == true) {
      console.log("3333", isChildEditing.value);
      if (hasVNodeTitle.value == false || isChildEditing.value == true) {
        console.log("4444");
        return true;
      }
      if (appConjunction.value != "OR" && props.custom != true) {
        console.log("555");
        return true;
      }
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

  // == System hidden ==============

  const isHiddenBySystem = () => {
    const appisShowUndoOption = inject("appisShowUndoOption");
    const appisShowORConjunctionOption = inject("appisShowORConjunctionOption");
    return !(appisShowUndoOption.value || appisShowORConjunctionOption.value);
  };

  // == IsDown ==============

  const appTags = inject("appTags");
  const appProps = inject("appProps");

  const isAllOptionSelected = computed(() => {
    if (appProps.conjunction == "AND") {
      const mySelectedTags =
        appTags.filter((tag) => tag.key == props.value) || [];

      return mySelectedTags.length >= 1;
    }
    // const optionStatus = { "country": { "isSelected": true }, "country2": { "isSelected": false }, "country333": { "isSelected": false } } (reactive)
    return Object.values(optionStatus).every((status) => status.isSelected);

    // console.log(" ");
    // console.log(".... props.value ....");
    // console.log(props.value, result, optionStatus);

    // // 刪除可能為註解or文字的 children
    // let childrenLength = slots
    //   .default()
    //   .filter((slot) => typeof slot.type === "object").length;
    // if (hasVNodeTitle.value == true) {
    //   childrenLength -= 1;
    // }
    // return mySelectedTags.length >= childrenLength;
  });

  const isDown = computed(() => {
    if (props.custom == true) {
      return false;
    }

    return isAllOptionSelected.value;
  });

  if (props.value != null && props.value != "") {
    const appDropdownStatus = inject("appDropdownStatus");
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

  provide("dropdownOptionStatus", optionStatus);

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
