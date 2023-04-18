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

  const elInputValue = dep.elInputValue;

  const isEditMode = dep.isEditMode;

  const stashTag = dep.stashTag;

  const setTagToTags = dep.setTagToTags;

  // ================ REFS ================

  const elInput = dep.elInput;

  const elDropdown = dep.elDropdown;

  const elTags = dep.elTags;

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
  watch(
    () => keydown.verticalIndex,
    async (value) => {
      await nextTick();
      const displayOptions = getDisplayOptionElms();
      displayOptions.forEach((option) => {
        option.classList.remove("hover");
      });
      if (value != -1) {
        displayOptions[value].classList.add("hover");
      }
    }
  );

  watch(
    () => keydown.horizontalIndex,
    async (value) => {
      await nextTick();
      const tagValues = getTagValueElms();
      if (value != -1) {
        tagValues[tagValues.length - 1 - value].click();
      } else {
        focusApp();
      }
    }
  );

  // =============== METHODS ==============

  const setStashTag = dep.setStashTag;

  const getDisplayOptionElms = () => {
    return elDropdown.value.querySelectorAll(".option:not(.hidden)") || [];
  };

  const getTagValueElms = () => {
    return elTags.value.querySelectorAll(".tag__value") || [];
  };

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
        await nextTick();

        if (keydown.verticalIndex != -1) {
          const displayOptions = getDisplayOptionElms();
          const option = displayOptions[keydown.verticalIndex];

          if (option != undefined && option.classList.contains("hover")) {
            if (isHoverSystemOption() == true) {
              handleSystemOption();
            } else {
              option.click();
            }
            keydown.verticalIndex = -1;
            elInputValue.value = "";
          }
        }

        if (elInputValue.value != "") {
          const newTag = {
            displayValue: true,
            value: elInputValue.value,
          };

          if (
            props.create == true &&
            stashTag.key == null &&
            isEditMode.value == false
          ) {
            setTagToTags(newTag);
            elInputValue.value = "";
          }

          if (
            stashTag.key != null &&
            stashTag.value == null &&
            stashTag.custom == true
          ) {
            setTagToTags({
              ...stashTag,
              ...newTag,
            });
            setStashTag();
            elInputValue.value = "";
          }
        }

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

        try {
          if (keydown.verticalLock == true) throw "locked";
          const displayOptions = getDisplayOptionElms();
          const numElements = displayOptions.length || 0;
          let newIndex =
            event.key == "ArrowUp"
              ? keydown.verticalIndex - 1
              : keydown.verticalIndex + 1;

          if (newIndex <= -1) {
            newIndex = numElements - 1;
          }
          if (newIndex >= numElements) {
            newIndex = 0;
          }

          keydown.verticalIndex = newIndex;
        } catch (error) {
          if (error != "locked") {
            keydown.verticalIndex = -1;
          }
        }

        break;
      }

      case "ArrowLeft":
      case "ArrowRight": {
        event.preventDefault();
        await nextTick();

        try {
          if (keydown.horizontalLock == true) throw "locked";
          keydown.verticalIndex = -1;
          const tagValues = getTagValueElms();
          const numElements = tagValues.length || 0;
          let newIndex =
            event.key == "ArrowRight"
              ? keydown.horizontalIndex - 1
              : keydown.horizontalIndex + 1;

          if (newIndex == -2 && keydown.horizontalIndex == -1) {
            newIndex = numElements - 1;
          }
          if (newIndex >= numElements) {
            newIndex = -1;
          }

          keydown.horizontalIndex = newIndex;
        } catch (error) {
          if (error != "locked") {
            keydown.horizontalIndex = -1;
          }
        }

        // try {
        //   if (current.lockKeydownLR == true) throw "locked";
        //   this.current.selectLRIndex += keyCode == 37 ? 1 : -1;
        //   const selectLRIndex = current.selectLRIndex;
        //   if (selectLRIndex == -1 || selectLRIndex == this.tags.length)
        //     throw "refocus";

        //   if (
        //     selectLRIndex <= -1 ||
        //     selectLRIndex >= this.tags.length ||
        //     this.tags.length == 0
        //   )
        //     throw "init";

        //   const tagIndexs = this.getTagIndexs();
        //   const tagIndex = tagIndexs[tagIndexs.length - 1 - selectLRIndex];
        //   const tag = this.tags.find((tag) => tag.index == tagIndex);
        //   if (tag.custom == false) {
        //     this.toFocusInput();
        //   }
        //   this.current.selectUDIndex = -1;
        //   this.edit.index = tag.index;
        //   this.edit.key = tag.key;
        //   this.edit.value = tag.value;
        // } catch (error) {
        //   if (error != "locked") {
        //     this.initDataEdit();
        //     this.current.selectLRIndex = -1;
        //   }
        //   if (error == "refocus") {
        //     this.toFocusInput();
        //   }
        // }

        break;
      }
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
  const isDisplayElOptionUndo = dep.isDisplayElOptionUndo;
  const isDisplayElOptionORConjunction = dep.isDisplayElOptionORConjunction;
  const elOptionUndo = dep.elOptionUndo;
  const elOptionORConjunction = dep.elOptionORConjunction;

  const isHoverSystemOption = () => {
    return (
      keydown.verticalIndex == 0 &&
      (isDisplayElOptionUndo.value || isDisplayElOptionORConjunction.value)
    );
  };

  const handleSystemOption = () => {
    if (isDisplayElOptionUndo.value) {
      elOptionUndo();
    }
    if (isDisplayElOptionORConjunction.value) {
      elOptionORConjunction();
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
