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

    if (
      props.hidden == true ||
      (appEditTagIndex.value == -1 && isDown.value == true)
    ) {
      return true;
    }

    if (appEditTagIndex.value != -1) {
      if (isChildEditing.value == false) {
        return true;
      }
      if (isAllOptionSelected.value == false && isChildEditing.value == true) {
        return false;
      }
    }

    if (isAllOptionIsHidden.value == true) {
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
    const appIsORConjunctionOptionVisible = inject(
      "appIsORConjunctionOptionVisible"
    );
    return !(
      appIsUndoOptionVisible.value || appIsORConjunctionOptionVisible.value
    );
  };

  // == IsDown ==============

  // const appTags = inject("appTags");
  // const appProps = inject("appProps");
  const appConjunction = inject("appConjunction");

  // 移除 isTitle 為 true 的
  const noTitleOptionStatus = computed(() => {
    return Object.values(optionStatus).filter(
      (status) => status.isTitle !== true
    );
  });

  const isAllOptionSelected = computed(() => {
    /*
    (reactive)
    const optionStatus =
    {
      "country": { isTitle: true, isSelected: false },
      "country2": { isTitle: false, isSelected: true },
      "country3": { isTitle: false, isSelected: false }
    }
    {
      "country": { isTitle: true, isSelected: false },
      "country2": { isTitle: false, isSelected: true },
      "country3": { isTitle: false, isSelected: true }
    }
    */

    // 全部 isSelected 為 true 才輸出 true
    return Object.values(noTitleOptionStatus.value).every(
      (status) => status.isSelected
    );
  });

  const isAllOptionIsHidden = computed(() => {
    // const optionStatus = { "country": { "isHidden": true }, "country2": { "isHidden": false }, "country333": { "isHidden": false } } (reactive)
    return Object.values(optionStatus).every((status) => status.isHidden);
  });

  const isAnyOptionBeSearched = computed(() => {
    // const optionStatus = { "country": { "isBeSearched": true }, "country2": { "isBeSearched": false }, "country333": { "isBeSearched": false } } (reactive)
    return Object.values(optionStatus).some((status) => status.isBeSearched);
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
      isHidden,
      (value) => {
        appDropdownStatus[props.value].isHidden = value;
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

  provide("dropdownIsAnyOptionBeSearched", readonly(isAnyOptionBeSearched));

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
