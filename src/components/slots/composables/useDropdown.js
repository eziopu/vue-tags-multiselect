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

  const appIsDuplicateTagByKey = inject("appIsDuplicateTagByKey");
  const isHidden = computed(() => {
    if (props.system == true) {
      return isHiddenBySystem();
    }

    if (props.hidden == true || isDown.value == true) {
      return true;
    }

    if (appEditTagIndex.value != -1 && isChildEditing.value == false) {
      return true;
    }

    if (isAllOptionSelected.value == true) {
      if (hasVNodeTitle.value == false || isChildEditing.value == true) {
        return true;
      }
      if (appConjunction.value != "OR" && props.custom != true) {
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
    const appIsUndoOptionVisible = inject("appIsUndoOptionVisible");
    const appIsORConjunctionOptionVisible = inject("appIsORConjunctionOptionVisible");
    return !(appIsUndoOptionVisible.value || appIsORConjunctionOptionVisible.value);
  };

  // == IsDown ==============

  const appTags = inject("appTags");
  const appProps = inject("appProps");
  const appConjunction = inject("appConjunction");

  const isAllOptionSelected = computed(() => {
    if (appProps.conjunction == "AND") {
      const mySelectedTags =
        appTags.filter((tag) => tag.key == props.value) || [];

      return mySelectedTags.length >= 1;
    }
    // const optionStatus = { "country": { "isSelected": true }, "country2": { "isSelected": false }, "country333": { "isSelected": false } } (reactive)
    return Object.values(optionStatus).every((status) => status.isSelected);
  });

  const isDown = computed(() => {
    if (props.custom == true) {
      return false;
    }

    if (
      appConjunction.value == "AND" &&
      appIsDuplicateTagByKey(props.value) == true
    ) {
      return true;
    }

    return isAllOptionSelected.value;
  });

  if (props.value != null && props.value != "") {
    const appDropdownStatus = inject("appDropdownStatus");
    appDropdownStatus[props.value] = {
      isAllOptionSelected: false,
      isDown: false,
      values: [],
    };

    watch(
      isAllOptionSelected,
      (value) => {
        appDropdownStatus[props.value].isAllOptionSelected = value;
      },
      { immediate: true }
    );

    watch(
      isDown,
      (value) => {
        appDropdownStatus[props.value].isDown = value;
      },
      { immediate: true }
    );

    watch(
      optionStatus,
      (value) => {
        // const optionStatus = { "country": { "isSelected": true }, "country2": { "isSelected": false }, "country333": { "isSelected": false } } (reactive)
        appDropdownStatus[props.value].values = Object.keys(value);
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
