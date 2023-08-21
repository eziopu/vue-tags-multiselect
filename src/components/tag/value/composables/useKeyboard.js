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
  const appIsLock = inject("appIsLock");
  const appReFocus = inject("appReFocus");
  const appUpdateTag = inject("appUpdateTag");
  const appIsDuplicateTag = inject("appIsDuplicateTag");
  const appRequestOptionClick = inject("appRequestOptionClick");

  const publicLog = inject("log");
  const log = (context, type = "info") => {
    publicLog("tag keydown", context, type);
  };

  const handleKeydown = async (event) => {
    console.log("handleKeydown e =", event.key);

    if (appIsLock.value == true) {
      log("method is not available while the app is locked", "warning");
      return;
    }

    if (
      ["Enter", "Backspace", "ArrowLeft", "ArrowRight"].includes(
        String(event.key)
      )
    ) {
      log(`get ${event.key}`);
    }

    switch (event.key) {
      case "Backspace":
        event.preventDefault();
        if (nextWillDelete.value == true) {
          deleteTag("  value Backspace");
        } else if (inputValue.value == "") {
          nextWillDelete.value = true;
        }

        break;

      case "Enter":
        event.preventDefault();
        await nextTick();
        try {
          if (appKeydown.enterLock == false) {
            throw "lock";
          }
          if (inputValue.value == "") {
            deleteTag("  value Enter");
            throw "deleteTag";
          }
          if (
            appKeydown.verticalIndex == -1 &&
            inputValue.value != props.tag.value
          ) {
            // dep.checkInputValueIsRepeat();
            if (appIsDuplicateTag(props.tag.key, inputValue.value) == true) {
              throw "duplicate";
            }

            if (isHaveSameOptionValue(inputValue.value) == true) {
              throw "haveSameOptionValue";
            }

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
            console.log("nnnnnn", appRequestOptionClick);
          }
          if (msg == "duplicate") {
            const valueRepeatFlashing = dep.valueRepeatFlashing;
            valueRepeatFlashing();
          }
        }

        break;

      case "ArrowLeft":
        event.preventDefault();
        await nextTick();
        if (keydownHorizontalLock.value == true) {
          keydownHorizontalLock.value = false;
          return;
        }
        console.log("       tag value keydown ArrowLeft");
        if (getElInputSelectionStart() == 0) {
          handleKeydownVerticalBoundary(event);
        }
        nextKeydownWillUseAppKeydown.value = isInputSelectionLimit();
        break;

      case "ArrowRight": {
        event.preventDefault();
        await nextTick();
        if (keydownHorizontalLock.value == true) {
          keydownHorizontalLock.value = false;
          return;
        }
        console.log("       tag value keydown ArrowRight");
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
    handleKeydown,
    nextKeydownWillUseAppKeydown,
  };
}
