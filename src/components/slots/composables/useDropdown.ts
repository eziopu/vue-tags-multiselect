import {
  ref,
  reactive,
  watchEffect,
  computed,
  provide,
  inject,
  onBeforeUnmount,
} from "vue";

import clearHTML from "../../../utils/clearHTML";

import type { OptionStatusMap, VDropdownPropsType } from "../../../types";

const CLASS_BLACKLIST = new Set([
  "v-dropdown",
  "display-all",
  "disabled",
  "divided",
  "hidden",
  "hover",
]);

import {
  appStashTagKey,
  appEditTagIndexKey,
  appIsDuplicateTagByKeyKey,
  appIsUndoOptionVisibleKey,
  appIsORConjunctionOptionVisibleKey,
  appConjunctionKey,
  appDropdownStatusKey,
  dropdownPropsKey,
  dropdownIsDownKey,
  dropdownDisplayAllKey,
  dropdownGetTitleInnerHTMLKey,
  dropdownClassListKey,
  dropdownIsAnyOptionBeSearchedKey,
  dropdownOptionStatusKey,
} from "../../../injectionKeys";

export default function useDropdown(props: Record<string, unknown>) {
  // ============== DATA ================

  const optionStatus: OptionStatusMap = reactive({});

  // ============== REFS ================

  const elDropdown = ref<HTMLElement | null>(null);

  // ============== INJECT DATA ================

  const appStashTag = inject(appStashTagKey)!;

  const appEditTagIndex = inject(appEditTagIndexKey)!;

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

  const appIsDuplicateTagByKey = inject(appIsDuplicateTagByKeyKey)!;

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
      return props.displayAll as boolean;
    }
  });

  const classList = computed(() => {
    if (elDropdown.value == null) return [] as string[];
    const list = [...elDropdown.value.classList];
    return list.filter((x) => !CLASS_BLACKLIST.has(x));
  });

  // == System hidden ==============

  const appIsUndoOptionVisible = inject(appIsUndoOptionVisibleKey)!;
  const appIsORConjunctionOptionVisible = inject(
    appIsORConjunctionOptionVisibleKey
  )!;
  const isHiddenBySystem = (): boolean => {
    return !(
      appIsUndoOptionVisible.value || appIsORConjunctionOptionVisible.value
    );
  };

  // == IsDown ==============

  const appConjunction = inject(appConjunctionKey)!;

  const optionStatusDerived = computed(() => {
    let allSelected = true;
    let allHidden = true;
    let anySearched = false;
    for (const status of Object.values(optionStatus)) {
      if (!status.isTitle) {
        if (!status.isSelected) allSelected = false;
      }
      if (!status.isHidden) allHidden = false;
      if (status.isBeSearched) anySearched = true;
    }
    return { allSelected, allHidden, anySearched };
  });

  const isAllOptionSelected = computed(() => optionStatusDerived.value.allSelected);

  const isAllOptionIsHidden = computed(() => optionStatusDerived.value.allHidden);

  const isAnyOptionBeSearched = computed(() => optionStatusDerived.value.anySearched);

  const isDown = computed(() => {
    if (props.custom == true) {
      return false;
    }

    if (
      appConjunction.value == "AND" &&
      appIsDuplicateTagByKey(props.value as string) == true
    ) {
      return true;
    }

    return isAllOptionSelected.value;
  });

  if (props.value != null && props.value != "") {
    const appDropdownStatus = inject(appDropdownStatusKey)!;
    appDropdownStatus[props.value as string] = {
      isAllOptionSelected: false,
      isDown: false,
      values: [],
    };

    watchEffect(() => {
      const status = appDropdownStatus[props.value as string];
      status.isAllOptionSelected = isAllOptionSelected.value;
      status.isHidden = isHidden.value;
      status.isDown = isDown.value;
      status.values = Object.keys(optionStatus);
    });

    onBeforeUnmount(() => {
      delete appDropdownStatus[props.value as string];
    });
  }

  // ============== PROVIDE ==============

  provide(dropdownPropsKey, props as Readonly<VDropdownPropsType>);

  provide(dropdownIsDownKey, isDown);

  provide(dropdownDisplayAllKey, myDisplayAll);

  provide(dropdownGetTitleInnerHTMLKey, getTitleInnerHTML);

  provide(dropdownClassListKey, classList);

  provide(dropdownIsAnyOptionBeSearchedKey, isAnyOptionBeSearched);

  provide(dropdownOptionStatusKey, optionStatus);

  return {
    elDropdown,

    props,
    myDisplayAll,
    hasVNodeTitle,
    isHidden,
    isSelecting,
    isChildEditing,

    getTitleInnerHTML,
  };
}
