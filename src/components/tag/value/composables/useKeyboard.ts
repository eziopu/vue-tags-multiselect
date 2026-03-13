import { ref, nextTick, inject, watch } from "vue";
import { TAG_INPUT_KEYDOWN_AUTO_UNLOCK } from "../../../../timeouts";
import useSafeTimeout from "../../../../composables/useSafeTimeout";

import type { TagValueComponentProp } from "../../../../types";
import {
  appPropsKey,
  appIsLockKey,
  appReFocusKey,
  appIsOnlyOneTheTagKey,
  appRequestOptionClickKey,
  logKey,
  appKeydownKey,
  appHandleKeydownKey,
  appDropdownStatusKey,
} from "../../../../injectionKeys";
import type { UseKeyboardDeps } from "./types";

export default function useKeyboard(props: Record<string, unknown>, dep: UseKeyboardDeps) {
  const tag = props.tag as TagValueComponentProp;
  // ============== REF ================

  const elInput = dep.elInput;

  // ============== DATA ================

  const inputValue = dep.inputValue;

  const nextWillDelete = dep.nextWillDelete;

  const nextKeydownWillUseAppKeydown = ref(false);

  // In order to tag, if the Keydown event is passed during input editing, execute the app's Keydown again.
  const keydownHorizontalLock = dep.keydownHorizontalLock;

  // ============== COMPUTED ==============

  const editByinput = dep.editByinput;

  // ============== WATCH ==============

  const { safeTimeout } = useSafeTimeout();

  watch(editByinput, async () => {
    await nextTick();
    nextKeydownWillUseAppKeydown.value = isInputSelectionLimit();
    safeTimeout(() => {
      keydownHorizontalLock.value = false;
    }, TAG_INPUT_KEYDOWN_AUTO_UNLOCK);
  });

  watch(inputValue, (newValue) => {
    if (newValue != "" && newValue != null) {
      nextWillDelete.value = false;
    }
  });

  // ============== METHODS ==============

  const deleteTag = dep.deleteTag;
  const appProps = inject(appPropsKey)!;
  const appIsLock = inject(appIsLockKey)!;
  const appReFocus = inject(appReFocusKey)!;
  const appIsOnlyOneTheTag = inject(appIsOnlyOneTheTagKey)!;
  const appRequestOptionClick = inject(appRequestOptionClickKey)!;

  const publicLog = inject(logKey)!;
  const log = (context: string, type = "info") => {
    publicLog("tag keyup", context, type);
  };

  // using Keyup is to ensure that the input copy and other functions are executed first.
  const handleKeyup = async (event: KeyboardEvent) => {
    if (appProps.keyboard == false) {
      if (event.key == "Backspace" || event.key == "Enter") {
        log(
          "method is not yet enabled because the props keyboard value is false.",
          "warning"
        );
      }
      return;
    }

    if (appIsLock.value == true) {
      log("method is not available while the app is locked", "warning");
      return;
    }

    switch (event.key) {
      case "Backspace":
        log(`get ${event.key}`);
        event.preventDefault();
        if (nextWillDelete.value == true) {
          log(`delete tag`);
          deleteTag("keyup Backspace");
        } else if (inputValue.value == "" || inputValue.value == null) {
          log(`pressing once will delete`);
          nextWillDelete.value = true;
        }

        break;

      case "Enter":
        log(`get ${event.key}`);
        event.preventDefault();
        await nextTick();
        try {
          if (appKeydown.enterLock == false) {
            throw "lock";
          }
          if (inputValue.value == "") {
            log(`value is empty, delete tag`);
            deleteTag("keyup Enter");
            throw "deleteTag";
          }
          if (appKeydown.verticalIndex == -1) {
            // dep.checkInputValueIsRepeat();
            if (appIsOnlyOneTheTag(tag.key, inputValue.value) == false) {
              log(`tag value is duplicated`);
              throw "duplicate";
            }

            if (isHaveSameOptionValue(inputValue.value) == true) {
              log(
                `find the option with the same value and call the app to auto-match`
              );
              throw "haveSameOptionValue";
            }
          }

          appReFocus();
          throw "nothing";
        } catch (msg) {
          if (msg == "haveSameOptionValue" && tag.key != null) {
            appRequestOptionClick.key = tag.key;
            appRequestOptionClick.value = inputValue.value;
          }
          if (msg == "duplicate") {
            dep.valueRepeatFlashing();
          }
        }

        break;

      case "ArrowLeft":
        log(`get ${event.key}`);
        event.preventDefault();
        await nextTick();
        if (keydownHorizontalLock.value == true) {
          keydownHorizontalLock.value = false;
          return;
        }
        if (getElInputSelectionStart() == 0) {
          handleKeydownVerticalBoundary(event);
        }
        nextKeydownWillUseAppKeydown.value = isInputSelectionLimit();
        break;

      case "ArrowRight": {
        log(`get ${event.key}`);
        event.preventDefault();
        await nextTick();
        if (keydownHorizontalLock.value == true) {
          keydownHorizontalLock.value = false;
          return;
        }
        if (getElInputSelectionStart() == inputValue.value.length) {
          handleKeydownVerticalBoundary(event);
        }
        nextKeydownWillUseAppKeydown.value = isInputSelectionLimit();

        break;
      }
    }
  };

  const getElInputSelectionStart = (): number => {
    return elInput.value ? elInput.value.selectionStart ?? 0 : 0;
  };

  const isInputSelectionLimit = (): boolean => {
    const selectionStart = getElInputSelectionStart();
    return selectionStart == 0 || selectionStart == inputValue.value.length;
  };

  const appKeydown = inject(appKeydownKey)!;
  const appHandleKeydown = inject(appHandleKeydownKey)!;
  const handleKeydownVerticalBoundary = (event: KeyboardEvent) => {
    log(`pressing the "${event.key}" once will exit the current tag`);
    if (nextKeydownWillUseAppKeydown.value == true) {
      appKeydown.horizontalLock = false;
      appHandleKeydown(event);
    }
  };

  const appDropdownStatus = inject(appDropdownStatusKey)!;
  const isHaveSameOptionValue = (value: string): boolean => {
    if (tag.key == null) return false;
    const values = appDropdownStatus[tag.key].values;
    return values.includes(value);
  };

  return {
    handleKeyup,
    nextKeydownWillUseAppKeydown,
  };
}
