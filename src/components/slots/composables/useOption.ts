import { ref, watch, computed, inject, onMounted } from "vue";

import {
  appPropsKey,
  appTagsKey,
  appEditTagIndexKey,
  appStashTagKey,
  appConjunctionKey,
  dropdownPropsKey,
  dropdownIsDownKey,
  dropdownIsAnyOptionBeSearchedKey,
  dropdownDisplayAllKey,
  logKey,
  log2Key,
  appRequestOptionClickKey,
  appRequestOptionClickInitKey,
} from "../../../injectionKeys";

import { defaultDropdownProps } from "../models";
import type { UseOptionDeps } from "./types";

export default function useOption(props: Record<string, unknown>, dep: UseOptionDeps) {
  // ============== INJECTs ================

  const appProps = inject(appPropsKey)!;
  const appTags = inject(appTagsKey)!;
  const appEditTagIndex = inject(appEditTagIndexKey)!;
  const appStashTag = inject(appStashTagKey)!;
  const appConjunction = inject(appConjunctionKey)!;

  const dropdownProps = inject(dropdownPropsKey, defaultDropdownProps);
  const dropdownIsDown = inject(dropdownIsDownKey, computed(() => false));
  const dropdownIsAnyOptionBeSearched = inject(dropdownIsAnyOptionBeSearchedKey, computed(() => false));
  const dropdownDisplayAll = inject(dropdownDisplayAllKey, computed(() => false));

  // ============== DATA ==============

  const isHover = ref(false);

  // ============== COMPUTED ==============

  const { isCanSearch, isSearchable } = dep;

  const isDisabled = computed(() => {
    if (dropdownProps.disabled == true) {
      return true;
    }
    return props.disabled || appProps.disabled;
  });

  const isSelected = computed(() => {
    return appTags.find((tag) => {
      return (
        tag != undefined &&
        tag.key == dropdownProps.value &&
        tag.value == props.value
      );
    })
      ? true
      : false;
  });

  const isSelectedByKey = computed(() => {
    return appTags.find((tag) => {
      return tag != undefined && tag.key == dropdownProps.value;
    })
      ? true
      : false;
  });

  const isHidden = computed(() => {
    if (dropdownProps.system == true) {
      return false;
    }

    const isTitle = props.title;
    // 已被選取
    if (isSelected.value == true) {
      return true;
    }

    // 編輯模式
    if (appEditTagIndex.value != -1) {
      if (isTitle) {
        return true;
      }
      return appStashTag.key != dropdownProps.value ? true : false;
    }

    // selecting no key
    if (appConjunction.value == "AND" || appConjunction.value == "") {
      if (isSelectedByKey.value == true) {
        return true;
      }
    }

    // dropdown 已全部選擇過 且未啟用custom
    if (dropdownIsDown.value == true) {
      return true;
    }

    // 一般選擇情境
    if (appStashTag.key != undefined) {
      if (appStashTag.key != dropdownProps.value) {
        return true;
      } else {
        return isTitle ? true : false;
      }
    }

    if (isCanSearch.value == true) {
      if (isTitle == true) {
        return dropdownIsAnyOptionBeSearched.value == true
          ? false
          : !isSearchable.value;
      } else {
        return !isSearchable.value;
      }
    }

    if (isTitle == false) {
      return !dropdownDisplayAll.value;
    }

    return false;
  });

  // ============== Init to selected ====================

  const { handleClick } = dep;

  const log = inject(logKey)!;
  const log2 = inject(log2Key)!;
  onMounted(() => {
    if (props.selected == true) {
      log(`option(key:${dropdownProps.value}, value:${props.value})`);
      log2(`props.selected is true`);
      log2(`the tag will be automatically generated`);
      handleClick();
    }
  });

  // ============== App request option to click ====================

  if (props.value != "") {
    const appRequestOptionClick = inject(appRequestOptionClickKey)!;
    const appRequestOptionClickInit = inject(appRequestOptionClickInitKey)!;
    watch(
      appRequestOptionClick,
      (value) => {
        if (value.key == dropdownProps.value && value.value == props.value) {
          handleClick();
          appRequestOptionClickInit();
        }
      },
      { immediate: true }
    );
  }

  return {
    props,
    isDisabled,
    isSelected,
    isHover,
    isHidden,
  };
}
