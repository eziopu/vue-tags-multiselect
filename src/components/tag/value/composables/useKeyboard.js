import { ref, nextTick, inject, watch } from "vue";

export default function useKeyboard(props, _context, dep) {
  // ================ REF ================

  const elInput = dep.elInput;

  // ================ DATA ================

  const inputValue = dep.inputValue;

  const nextWillDelete = ref(false);

  const nextKeydownWillChagneEditTag = ref(false);

  // ================ INJECT ================

  const appKeydown = inject("appKeydown");

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

  // const createOption = computed(() => {
  //   return createTag.value || createOption_.value || false;
  // });

  // ============== WATCH ==============

  // watch(
  //   () => keydown.horizontalIndex,
  //   async (value) => {
  //     await nextTick();
  //     const tagValues = getTagValueElms();
  //     if (value != -1) {
  //       tagValues[tagValues.length - 1 - value].click();
  //     } else {
  //       focusApp();
  //     }
  //   }
  // );

  // =============== METHODS ==============

  const handleKeydown = async (event) => {
    console.log("handleKeydown e =", event.key);

    switch (event.key) {
      case "Backspace":
        event.preventDefault();
        if (nextWillDelete.value == true) {
          deleteTag();
        } else if (inputValue.value == "") {
          nextWillDelete.value = true;
        }

        break;

      case "Enter":
        event.preventDefault();
        await nextTick();

        if (inputValue.value == "") {
          deleteTag();
        } else {
          // if (appKeydown.UDIndex == -1) {
          //   appSetTagToTags(inputValue.value);
          // }
        }

        break;

      case "ArrowLeft":
      case "ArrowRight": {
        event.preventDefault();
        await nextTick();
        console.log("???");

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

  watch(inputValue, (value) => {
    if (value != "") {
      nextWillDelete.value = false;
    }
  });

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

  // ============== METHODS ==============
  const deleteTag = dep.deleteTag;

  watch(editByinput, async (value) => {
    await nextTick();
    if (value == true) {
      appKeydown.horizontalLock = true;
      appKeydown.backspaceLock = true;
      nextKeydownWillChagneEditTag.value = isInputSelectionLimit();
    } else {
      nextKeydownWillChagneEditTag.value = false;
    }
    console.log("nextKeydownWillChagneEditTag.value");
    console.log(nextKeydownWillChagneEditTag.value);
  });

  // const handleKeydownLR = async (keyCode = 0) => {
  //   await nextTick();
  //   console.log(keyCode);
  //   const selectionStart = elInput.value.selectionStart;
  //   console.log(elInput.value.selectionStart);
  //   if (
  //     nextKeydownWillChagneEditTag.value == true &&
  //     ((keyCode == 37 && selectionStart == 0) ||
  //       (keyCode == 39 && selectionStart == inputValue.value.length))
  //   ) {
  //     appKeydown.horizontalLock = false;
  //     nextKeydownWillChagneEditTag.value = false;
  //     // this.app.handleKeydown(keyCode);
  //   }
  //   nextKeydownWillChagneEditTag.value = isInputSelectionLimit();
  // };

  const isInputSelectionLimit = () => {
    const selectionStart = elInput.value.selectionStart;
    return selectionStart == 0 || selectionStart == inputValue.value.length
      ? true
      : false;
  };

  return {
    handleKeydown,
  };
}
