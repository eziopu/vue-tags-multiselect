import { ref, computed, watch, inject } from "vue";
import useSafeTimeout from "../../../../composables/useSafeTimeout";

import type { TagValueComponentProp } from "../../../../types";
import {
  appIsEnableKey,
  appIsDuplicateTagKey,
  appIsOnlyOneTheTagKey,
  appEditTagIndexKey,
  appUpdateTagKey,
  appStashTagKey,
  appBlurKey,
  appIsActiveToFalseKey,
  isActiveElementContainAppKey,
  appIsPassTagInputBlurKey,
} from "../../../../injectionKeys";
import type { UseInputDeps } from "./types";

export default function useInput(props: Record<string, unknown>, dep: UseInputDeps) {
  const tag = props.tag as TagValueComponentProp;

  // ============== REF ================

  const elInput = ref<HTMLInputElement | null>(null);

  // ============== DATA ================

  const inputValue = ref("");

  const isInputValueRepeat = ref(false);

  const nextWillDelete = ref(false);

  // ============== COMPUTED ==============

  const inputWidth = computed(() => {
    const value = inputValue.value || "";
    return (value.length || 2) + 1 + "em";
  });

  // ============== WATCH ==============

  const { safeTimeout, safeClear } = useSafeTimeout();
  let timer: ReturnType<typeof setTimeout> | null = null;
  let flashTimer: ReturnType<typeof setTimeout> | null = null;
  const orriginalTag = { ...tag };
  const appIsEnable = inject(appIsEnableKey)!;
  const appIsDuplicateTag = inject(appIsDuplicateTagKey)!;
  const appIsOnlyOneTheTag = inject(appIsOnlyOneTheTagKey)!;
  const appEditTagIndex = inject(appEditTagIndexKey)!;

  const editMyself = computed(() => {
    return appEditTagIndex.value == tag.index;
  });

  watch(inputValue, (newValue) => {
    if (
      editMyself.value == false ||
      appIsEnable.value == false ||
      tag.custom == false
    ) {
      return;
    }

    const newTag: { value: string; valueElm: string | null; displayValue: boolean } = {
      value: newValue,
      valueElm: null,
      displayValue: true,
    };

    if (newValue == orriginalTag.value) {
      newTag.valueElm = orriginalTag.valueElm;
      newTag.displayValue = orriginalTag.displayValue;
    } else {
      if (appIsDuplicateTag(tag.key, newValue)) {
        timer = safeTimeout(() => {
          valueRepeatFlashing();
        }, 500);
      } else {
        safeClear(timer);
      }
    }
    updateTag(newTag);
  });

  // ============== METHODS ==============

  const appUpdateTag = inject(appUpdateTagKey)!;
  const appStashTag = inject(appStashTagKey)!;
  const updateTag = (newTag: { value: string; valueElm: string | null; displayValue: boolean }) => {
    appUpdateTag(newTag);
    appStashTag.value = newTag.value;
    appStashTag.valueElm = newTag.valueElm;
    appStashTag.displayValue = newTag.displayValue;
  };

  const valueRepeatFlashing = () => {
    isInputValueRepeat.value = true;
    safeClear(flashTimer);
    flashTimer = safeTimeout(() => {
      isInputValueRepeat.value = false;
    }, 1000);
  };

  const elInputFocus = (event: FocusEvent) => {
    const selectionStart = (event.target as HTMLInputElement).selectionStart;
    const value = inputValue.value || "";
    if (selectionStart == 0 || selectionStart == value.length) {
      nextWillDelete.value = false;
    }
  };

  const appBlur = inject(appBlurKey)!;
  const appIsActiveToFalse = inject(appIsActiveToFalseKey)!;
  const isActiveElementContainApp = inject(isActiveElementContainAppKey)!;

  const blur = () => {
    safeTimeout(() => {
      if (isActiveElementContainApp() == false) {
        appIsActiveToFalse();
      }
      appBlur();
    }, 50);
  };

  const deleteTag = dep.deleteTag;
  const appIsPassTagInputBlur = inject(appIsPassTagInputBlurKey)!;
  const elInputBlur = () => {
    if (appIsPassTagInputBlur.value == true) {
      appIsPassTagInputBlur.value = false;
      return;
    }

    if (inputValue.value == "" || inputValue.value == null) {
      deleteTag("elInputBlur", "value is empty");
    } else if (
      appIsOnlyOneTheTag(tag.key, inputValue.value) == false
    ) {
      deleteTag("elInputBlur", "value duplication");
    }
    blur();
  };

  return {
    elInput,
    inputValue,
    inputWidth,
    isInputValueRepeat,
    nextWillDelete,

    valueRepeatFlashing,
    elInputFocus,
    elInputBlur,
    blur,
  };
}
