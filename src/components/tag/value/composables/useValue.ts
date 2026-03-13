import { ref, inject, computed, watch, nextTick } from "vue";
import { TAG_INPUT_FOCUS } from "../../../../timeouts";
import useSafeTimeout from "../../../../composables/useSafeTimeout";

import type { TagValueComponentProp } from "../../../../types";
import {
  appPropsKey,
  appEnableKey,
  appIsLockKey,
  appElInputValueKey,
  appEditTagIndexKey,
  appPlaceholdersKey,
  appSetStashTagKey,
} from "../../../../injectionKeys";
import type { UseValueDeps } from "./types";

export default function useValue(props: Record<string, unknown>, dep: UseValueDeps) {
  const tag = props.tag as TagValueComponentProp;
  // ============== REF ================

  const elInput = dep.elInput;

  const elTagValueContent = ref<HTMLElement | null>(null);

  // ============== DATA ================

  const inputValue = dep.inputValue;

  // In order to tag, if the Keydown event is passed during input editing, execute the app's Keydown again.
  const keydownHorizontalLock = ref(false);

  // ============== INJECT ================

  const appProps = inject(appPropsKey)!;
  const appEnable = inject(appEnableKey)!;
  const appIsLock = inject(appIsLockKey)!;
  const appElInputValue = inject(appElInputValueKey)!;
  const appEditTagIndex = inject(appEditTagIndexKey)!;
  const appPlaceholders = inject(appPlaceholdersKey)!;

  // ============== COMPUTED ==============

  const isEditVisible = computed(() => {
    // 例外狀況
    if (
      appProps.disabled == false &&
      appProps.loading == false &&
      appProps.dropdownLoading == true
    ) {
      return true;
    }
    return !appIsLock.value;
  });

  const editMyself = computed(() => {
    return appEditTagIndex.value == tag.index;
  });

  const editByinput = computed(() => {
    return tag.custom == true && editMyself.value == true;
  });

  // ============== WATCH ==============

  const { safeTimeout } = useSafeTimeout();

  watch(editMyself, async (value) => {
    if (value == false) {
      return;
    }
    if (tag.custom == true) {
      keydownHorizontalLock.value = true;
      inputValue.value = tag.value ?? '';
      await nextTick();
      safeTimeout(() => {
        elInput.value!.focus();
      }, TAG_INPUT_FOCUS);
    } else {
      await nextTick();
      elTagValueContent.value!.focus();
    }
  });

  watch(
    () => tag.value,
    (value: string | null) => {
      inputValue.value = value ?? '';
    },
    { immediate: true }
  );

  // ============== METHODS ==============

  const appSetStashTag = inject(appSetStashTagKey)!;

  const handleClick = (event: Event) => {
    event.preventDefault();
    if (isEditVisible.value == false) return;

    if (editMyself.value == false) {
      appEditTagIndex.value = tag.index;
      appElInputValue.value = "";
      appSetStashTag(tag);
      appEnable();
    }
  };

  return {
    appProps,
    appIsLock,
    appPlaceholders,
    isEditVisible,
    inputValue,
    elTagValueContent,
    editByinput,
    editMyself,
    keydownHorizontalLock,

    handleClick,
  };
}
