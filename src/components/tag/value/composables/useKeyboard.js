import { ref, nextTick, inject, watch } from "vue";

export default function useKeyboard(props, _context, dep) {
  // ================ REF ================

  const elInput = dep.elInput;

  // ================ DATA ================

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
    }, 100);
  });

  watch(inputValue, (value) => {
    if (value != "") {
      nextWillDelete.value = false;
    }
  });

  // =============== METHODS ==============

  const deleteTag = dep.deleteTag;

  const handleKeydown = async (event) => {
    console.log("handleKeydown e =", event.key);

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

        if (inputValue.value == "") {
          deleteTag("  value Enter");
        } else {
          // if (appKeydown.UDIndex == -1) {
          //   appSetTagToTags(inputValue.value);
          // }
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

  return {
    handleKeydown,
    nextKeydownWillUseAppKeydown,
  };
}
