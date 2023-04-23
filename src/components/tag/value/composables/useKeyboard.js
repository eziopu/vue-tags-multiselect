import { ref, reactive, nextTick, inject, watch } from "vue";

export default function useKeyboard(props, _context, dep) {
  // ================ REF ================

  const elInput = dep.elInput;

  // ================ DATA ================

  const inputValue = dep.inputValue;

  const nextWillDelete = ref(false);

  const nextKeydownWillUseAppKeydown = ref(false);

  const inputCursorBoundary = reactive({
    isLeft: false,
    isRight: false,
  });

  // ============ DEPENDENCIES ============

  // const focusApp = dep.focusApp;
  // const update = dep.update;
  // const search = dep.search;
  // const setPointer = dep.setPointer;
  // const selectPointer = dep.selectPointer;
  // const backwardPointer = dep.backwardPointer;
  // const forwardPointer = dep.forwardPointer;
  // const multiselect = dep.multiselect;
  // const isOpen = dep.isOpen;

  // const tags = dep.tags;

  // const tagsGroupByTitle = dep.tagsGroupByTitle;

  // const conjunction = dep.conjunction;

  // const keydown = dep.keydown;

  // const elInputValue = dep.elInputValue;

  // const isEditMode = dep.isEditMode;

  // const stashTag = dep.stashTag;

  // const setTagToTags = dep.setTagToTags;

  // ================ REFS ================

  // const elInput = dep.elInput;

  // ============== COMPUTED ==============

  const editByinput = dep.editByinput;

  const editMyself = dep.editMyself;

  const noCustomeHoverAndEditMyself = dep.noCustomeHoverAndEditMyself;

  // ============== WATCH ==============

  watch(editByinput, async () => {
    await nextTick();
    nextKeydownWillUseAppKeydown.value = isInputSelectionLimit();
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
        console.log("       tag value keydown ArrowLeft", inputCursorBoundary.isLeft);
        if (getElInputSelectionStart() == 0) {
          handleKeydownVerticalBoundary(event);
        }
        nextKeydownWillUseAppKeydown.value = isInputSelectionLimit();
        break;

      case "ArrowRight": {
        event.preventDefault();
        await nextTick();
        console.log("       tag value keydown ArrowRight", inputCursorBoundary.isRight);
        if (getElInputSelectionStart() == inputValue.value.length) {
          handleKeydownVerticalBoundary(event);
        }
        nextKeydownWillUseAppKeydown.value = isInputSelectionLimit();

        try {
          // if (keydown.horizontalLock == true) throw "locked";
          // keydown.verticalIndex = -1;
          // const tagValues = getTagValueElms();
          // const numElements = tagValues.length || 0;
          // let newIndex =
          //   event.key == "ArrowRight"
          //     ? keydown.horizontalIndex - 1
          //     : keydown.horizontalIndex + 1;
          // if (newIndex == -2 && keydown.horizontalIndex == -1) {
          //   newIndex = numElements - 1;
          // }
          // if (newIndex >= numElements) {
          //   newIndex = -1;
          // }
          // keydown.horizontalIndex = newIndex;
        } catch (error) {
          // if (error != "locked") {
          //   keydown.horizontalIndex = -1;
          // }
        }

        break;
      }
    }
  };



  // watch(
  //   appKeydown,
  //   (value) => {
  //     if (editByinput.value == true) {
  //       handleKeydownLR(value.keyCode);
  //     }
  //     if (
  //       noCustomeHoverAndEditMyself.value == true &&
  //       [8, 46].indexOf(value.keyCode) > -1
  //     ) {
  //       // back space, del
  //       deleteTag();
  //     }
  //     if (editMyself.value == false) return;
  //     if (value.keyCode != 13) return;
  //     dep.elInputEnter();
  //   },
  //   {
  //     deep: true,
  //   }
  // );

  const getElInputSelectionStart = () => {
    return elInput.value.selectionStart;
  };

  const isInputSelectionLimit = () => {
    const selectionStart = getElInputSelectionStart();
    return selectionStart == 0 || selectionStart == inputValue.value.length;
  };

  const appKeydown = inject("appKeydown");
  const appHandleKeydown = inject("appHandleKeydown");
  const handleKeydownVerticalBoundary = (event) => {
    if (nextKeydownWillUseAppKeydown.value == true) {
      console.log("WTFFFF");
      appKeydown.horizontalLock = false;
      appHandleKeydown(event);
    }
  };

  return {
    handleKeydown,
  };
}
