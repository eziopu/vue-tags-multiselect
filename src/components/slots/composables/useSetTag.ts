import { ref, computed, watch, inject } from "vue";

import { getTagModel } from "../../../models";
import type { EmitFn } from "../../../types";

import clearHTML from "../../../utils/clearHTML";

import {
  appEditTagIndexKey,
  appUpdateTagKey,
  appReFocusKey,
  appNextReFocusDontInitKey,
  appSetStashTagKey,
  appSetTagToTagsKey,
  appCallOptionSetTagKey,
  appCallOptionSetTagFinishKey,
  dropdownPropsKey,
  dropdownClassListKey,
  dropdownGetTitleInnerHTMLKey,
} from "../../../injectionKeys";

import { defaultDropdownProps } from "../models";

export default function useSetTag(props: Record<string, unknown>, emit: EmitFn, dep: Record<string, any>) {
  // ============== REFS ==============

  const elOption = ref<HTMLElement | null>(null);

  // ============== INJECTs ================

  const appEditTagIndex = inject(appEditTagIndexKey)!;
  const appUpdateTag = inject(appUpdateTagKey)!;
  const appReFocus = inject(appReFocusKey)!;
  const appNextReFocusDontInit = inject(appNextReFocusDontInitKey)!;
  const appSetStashTag = inject(appSetStashTagKey)!;
  const appSetTagToTags = inject(appSetTagToTagsKey)!;
  const appCallOptionSetTag = inject(appCallOptionSetTagKey)!;
  const appCallOptionSetTagFinish = inject(appCallOptionSetTagFinishKey)!;

  const dropdownProps = inject(dropdownPropsKey, defaultDropdownProps);
  const dropdownClassList = inject(dropdownClassListKey, computed(() => [] as string[]));
  const dropdownGetTitleInnerHTML = inject(dropdownGetTitleInnerHTMLKey, computed((): string | null => ""));

  // ============== DATA ==============

  const isDisabled = dep.isDisabled;

  // ============== COMPUTED ==============

  const innerHTML = computed(() => {
    if (elOption.value == null) {
      return null;
    }
    return clearHTML(elOption.value.innerHTML) || "";
  });

  const prototypeStashTag = computed(() => {
    const result = Object.seal({ ...getTagModel() });
    result.custom = dropdownProps.custom;
    result.classList = dropdownClassList.value;
    result.displayValue = props.displayValue as boolean;

    if (props.title) {
      result.key = dropdownProps.value;
      result.titleElm = innerHTML.value;
    } else {
      result.key = dropdownProps.value;
      result.titleElm = dropdownGetTitleInnerHTML.value;
      result.value = props.value as string;
      result.valueElm = innerHTML.value;
    }
    return result;
  });

  const handleClick = (event?: Event) => {
    if (isDisabled) return;
    emit('click', event);

    if (!props.title && props.value == "") {
      return;
    }

    // 編輯模式
    if (appEditTagIndex.value != -1) {
      appUpdateTag(prototypeStashTag.value);
      appReFocus();
      return;
    }

    if (prototypeStashTag.value.valueElm != null) {
      appSetTagToTags(prototypeStashTag.value);
      appSetStashTag();
    } else {
      appSetStashTag(prototypeStashTag.value);
      appNextReFocusDontInit();
    }
    appReFocus();
  };

  watch(appCallOptionSetTag, (value) => {
    if (
      props.title == false &&
      value.key == dropdownProps.value &&
      value.value == props.value
    ) {
      handleClick();
      appCallOptionSetTagFinish();
    } else if (
      props.title == true &&
      value.key == dropdownProps.value &&
      value.valueIsCustome == true
    ) {
      handleClick();
      appCallOptionSetTagFinish();
    }
  });

  return {
    elOption,
    innerHTML,
    handleClick,
  };
}
