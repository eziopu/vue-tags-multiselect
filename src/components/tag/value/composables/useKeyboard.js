import { ref, nextTick, inject, watch } from "vue";
import { TAG_INPUT_KEYDOWN_AUTO_UNLOCK } from "../../../../timeouts.js";

export default function useKeyboard(props, _context, dep) {
  // ============== REF ================

  const elInput = dep.elInput;

  // ============== DATA ================

  const inputValue = dep.inputValue;

  const nextWillDelete = ref(false);

  const nextKeydownWillUseAppKeydown = ref(false);

  // In order to tag, if the Keydown event is passed during input editing, execute the app's Keydown again.
  const keydownHorizontalLock = dep.keydownHorizontalLock;

  // ============== COMPUTED ==============

  const editByinput = dep.editByinput;

  // ============== WATCH ==============

  watch(editByinput, async () => {
    await nextTick();
    nextKeydownWillUseAppKeydown.value = isInputSelectionLimit();
    setTimeout(() => {
      keydownHorizontalLock.value = false;
    }, TAG_INPUT_KEYDOWN_AUTO_UNLOCK);
  });

  watch(inputValue, (value) => {
    if (value != "") {
      nextWillDelete.value = false;
    }
  });

  // ============== METHODS ==============

  const deleteTag = dep.deleteTag;
  const appProps = inject("appProps");
  const appIsLock = inject("appIsLock");
  const appReFocus = inject("appReFocus");
  const appUpdateTag = inject("appUpdateTag");
  const appIsDuplicateTag = inject("appIsDuplicateTag");
  const appRequestOptionClick = inject("appRequestOptionClick");

  const publicLog = inject("log");
  const log = (context, type = "info") => {
    publicLog("tag keyup", context, type);
  };

  // using Keyup is to ensure that the input copy and other functions are executed first.
  const handleKeyup = async (event) => {
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
        } else if (inputValue.value == "") {
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
          if (
            appKeydown.verticalIndex == -1 &&
            inputValue.value != props.tag.value
          ) {
            // dep.checkInputValueIsRepeat();
            if (appIsDuplicateTag(props.tag.key, inputValue.value) == true) {
              log(`tag value is duplicated`);
              throw "duplicate";
            }

            if (isHaveSameOptionValue(inputValue.value) == true) {
              log(
                `find the option with the same value and call the app to auto-match`
              );
              throw "haveSameOptionValue";
            }

            log(`update the tag`);
            appUpdateTag({
              value: inputValue.value,
              valueElm: null,
              displayValue: true,
            });

            appReFocus();
            throw "updateTag";
          }

          appReFocus();
          throw "nothing";
        } catch (msg) {
          if (msg == "haveSameOptionValue") {
            appRequestOptionClick.key = props.tag.key;
            appRequestOptionClick.value = inputValue.value;
          }
          if (msg == "duplicate") {
            const valueRepeatFlashing = dep.valueRepeatFlashing;
            valueRepeatFlashing();
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

  const getElInputSelectionStart = () => {
    return elInput.value ? elInput.value.selectionStart : 0;
  };

  const isInputSelectionLimit = () => {
    const selectionStart = getElInputSelectionStart();
    return selectionStart == 0 || selectionStart == inputValue.value.length;
  };

  const appKeydown = inject("appKeydown");
  const appHandleKeydown = inject("appHandleKeydown");
  const handleKeydownVerticalBoundary = (event) => {
    log(`pressing the "${event.key}" once will exit the current tag`);
    if (nextKeydownWillUseAppKeydown.value == true) {
      appKeydown.horizontalLock = false;
      appHandleKeydown(event);
    }
  };

  const appDropdownStatus = inject("appDropdownStatus");
  const isHaveSameOptionValue = (value) => {
    const values = appDropdownStatus[props.tag.key].values;
    return values.includes(value);
  };

  return {
    handleKeyup,
    nextKeydownWillUseAppKeydown,
  };
}
