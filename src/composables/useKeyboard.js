import { toRefs, computed, nextTick, getCurrentInstance, watch } from "vue";

export default function useKeyboard(props, context, dep) {
  const {
    mode,
    addTagOn,
    searchable,
    showOptions,
    valueProp,
    groups: groupped,
    addOptionOn: addOptionOn_,
    createTag,
    createOption: createOption_,
  } = toRefs(props);

  const $this = getCurrentInstance().proxy;

  // ============ DEPENDENCIES ============

  const focusApp = dep.focusApp;
  const update = dep.update;
  const search = dep.search;
  const setPointer = dep.setPointer;
  const selectPointer = dep.selectPointer;
  const backwardPointer = dep.backwardPointer;
  const forwardPointer = dep.forwardPointer;
  const multiselect = dep.multiselect;
  const isOpen = dep.isOpen;
  const open = dep.open;
  const blur = dep.blur;
  const fo = dep.fo;

  const keydown = dep.keydown;

  const elDropdown = dep.elDropdown;

  const elInputValue = dep.elInputValue;
  const isEditMode = dep.isEditMode;

  const setTagToTags = dep.setTagToTags;

  // ============== COMPUTED ==============

  // no export
  const createOption = computed(() => {
    return createTag.value || createOption_.value || false;
  });

  // no export
  const addOptionOn = computed(() => {
    if (addTagOn.value !== undefined) {
      return addTagOn.value;
    } else if (addOptionOn_.value !== undefined) {
      return addOptionOn_.value;
    }

    return ["enter"];
  });

  // ============== WATCH ==============

  watch(keydown, async (value) => {
    await nextTick();
    const index = value.verticalIndex;
    const displayOptions = elDropdown.value.querySelectorAll(
      ".option:not(.hidden)"
    );
    displayOptions.forEach((option) => {
      option.classList.remove("hover");
    });
    if (index != -1) {
      displayOptions[index].classList.add("hover");
    }
  });

  // =============== METHODS ==============

  const handleKeydown = async (event) => {
    console.log("handleKeydown e =", event);
    context.emit("keydown", event, $this);

    const keyCode = event.keyCode ? event.keyCode : event;
    keydown.keyCode = keyCode;
    // let tagList;
    // let activeIndex;

    // if (
    //   ["ArrowLeft", "ArrowRight", "Enter"].indexOf(e.key) !== -1 &&
    //   mode.value === "tags"
    // ) {
    //   tagList = [
    //     ...multiselect.value.querySelectorAll(`[data-tags] > *`),
    //   ].filter((e) => e !== tags.value);
    //   activeIndex = tagList.findIndex((e) => e === document.activeElement);
    // }

    switch (event.key) {
      // case "Backspace":
      //   if (mode.value === "single") {
      //     return;
      //   }

      //   if (searchable.value && [null, ""].indexOf(search.value) === -1) {
      //     return;
      //   }

      //   if (iv.value.length === 0) {
      //     return;
      //   }

      //   update([...iv.value].slice(0, -1));
      //   break;

      case "Enter":
        event.preventDefault();

        if (
          props.create == true &&
          isEditMode.value == false &&
          elInputValue.value != ""
        ) {
          setTagToTags({
            displayValue: true,
            value: elInputValue.value,
          });
          elInputValue.value = "";
        }

        // if (activeIndex !== -1 && activeIndex !== undefined) {
        //   update([...iv.value].filter((v, k) => k !== activeIndex));

        //   if (activeIndex === tagList.length - 1) {
        //     if (tagList.length - 1) {
        //       tagList[tagList.length - 2].focus();
        //     } else if (searchable.value) {
        //       tags.value.querySelector("input").focus();
        //     } else {
        //       multiselect.value.focus();
        //     }
        //   }
        //   return;
        // }

        // if (addOptionOn.value.indexOf("enter") === -1 && createOption.value) {
        //   return;
        // }

        // preparePointer();
        // selectPointer();
        break;

      // case " ":
      //   if (!createOption.value && !searchable.value) {
      //     e.preventDefault();

      //     preparePointer();
      //     selectPointer();
      //     return;
      //   }

      //   if (!createOption.value) {
      //     return false;
      //   }

      //   if (addOptionOn.value.indexOf("space") === -1 && createOption.value) {
      //     return;
      //   }

      //   e.preventDefault();

      //   preparePointer();
      //   selectPointer();
      //   break;

      // case "Tab":
      // case ";":
      // case ",":
      //   if (
      //     addOptionOn.value.indexOf(e.key.toLowerCase()) === -1 ||
      //     !createOption.value
      //   ) {
      //     return;
      //   }

      //   preparePointer();
      //   selectPointer();
      //   e.preventDefault();
      //   break;

      // case "Escape":
      //   blur();
      //   break;

      case "ArrowUp":
      case "ArrowDown": {
        event.preventDefault();
        await nextTick();

        const displayOptions = elDropdown.value.querySelectorAll(
          ".option:not(.hidden)"
        );
        const numElements = displayOptions.length || 0;

        if (keydown.verticalLock == false) {
          keydown.verticalIndex += event.key == "ArrowUp" ? -1 : 1;

          if (keydown.verticalIndex <= -1) {
            keydown.verticalIndex = numElements - 1;
          }
          if (keydown.verticalIndex >= numElements) {
            keydown.verticalIndex = 0;
          }
        }

        // horizontalIndex: defaultNumber(item.horizontalIndex),
        // horizontalLock: item.horizontalLock || false,

        break;
      }

      // case "ArrowUp":
      // case "ArrowDown":

      //   e.preventDefault();

      //   if (!showOptions.value) {
      //     return;
      //   }

      //   /* istanbul ignore else */
      //   if (!isOpen.value) {
      //     open();
      //   }

      //   backwardPointer();
      //   break;

      //   e.preventDefault();

      //   if (!showOptions.value) {
      //     return;
      //   }

      //   /* istanbul ignore else */
      //   if (!isOpen.value) {
      //     open();
      //   }

      //   forwardPointer();
      //   break;

      // case "ArrowLeft":
      //   if (
      //     (searchable.value &&
      //       tags.value.querySelector("input").selectionStart) ||
      //     e.shiftKey ||
      //     mode.value !== "tags" ||
      //     !iv.value ||
      //     !iv.value.length
      //   ) {
      //     return;
      //   }

      //   e.preventDefault();

      //   if (activeIndex === -1) {
      //     tagList[tagList.length - 1].focus();
      //   } else if (activeIndex > 0) {
      //     tagList[activeIndex - 1].focus();
      //   }
      //   break;

      // case "ArrowRight":
      // if (
      //   activeIndex === -1 ||
      //   e.shiftKey ||
      //   mode.value !== "tags" ||
      //   !iv.value ||
      //   !iv.value.length
      // ) {
      //   return;
      // }

      // e.preventDefault();

      // /* istanbul ignore else */
      // if (tagList.length > activeIndex + 1) {
      //   tagList[activeIndex + 1].focus();
      // } else if (searchable.value) {
      //   tags.value.querySelector("input").focus();
      // } else if (!searchable.value) {
      //   multiselect.value.focus();
      // }

      // break;
    }
  };

  const handleKeyup = (event) => {
    context.emit("keyup", event, $this);
  };

  return {
    handleKeydown,
    handleKeyup,
  };
}
