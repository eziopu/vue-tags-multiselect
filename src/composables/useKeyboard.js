import {
  ref,
  toRefs,
  computed,
  nextTick,
  getCurrentInstance,
  watch,
} from "vue";

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

  const tags = dep.tags;

  const tagsGroupByTitle = dep.tagsGroupByTitle;

  const conjunction = dep.conjunction;

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

  const horizontalClickEnable = ref(true);
  const isActiveElementContainApp = dep.isActiveElementContainApp;
  watch(
    () => keydown.horizontalIndex,
    async (value) => {
      if (horizontalClickEnable.value == false) {
        horizontalClickEnable.value = true;
        return;
      }
      await nextTick();
      const tagValues = getTagValueElms();
      if (value != -1) {
        tagValues[tagValues.length - 1 - value].click();
      } else {
        if (isActiveElementContainApp() == true) {
          focusApp();
        }
      }
    }
  );

  const editTagIndex = dep.editTagIndex;
  watch(editTagIndex, async (value) => {
    if (value != -1) {
      await nextTick();

      const tagValues = getTagValueElms();
      for (let index = 0; index < tagValues.length; index++) {
        const element = tagValues[index];
        const targetIndex = tagValues.length - 1 - index;
        if (
          Number(element.dataset.index) == value &&
          keydown.horizontalIndex != targetIndex
        ) {
          horizontalClickEnable.value = false;
          keydown.horizontalIndex = targetIndex;
        }
      }
    }
  });

  // =============== METHODS ==============

  const setStashTag = dep.setStashTag;

  const deleteTags = dep.deleteTags;

  const getDisplayOptionElms = () => {
    return elDropdown.value.querySelectorAll(".option:not(.hidden)") || [];
  };

  const getTagValueElms = () => {
    return elTags.value.querySelectorAll(".tag__value") || [];
  };

  const handleKeydown = async (event) => {
    // console.log("handleKeydown e =", event);
    context.emit("keydown", event, $this);

    const keyCode = event.keyCode ? event.keyCode : event;
    keydown.keyCode = keyCode;

    switch (event.key) {
      case "Backspace":
        // event.preventDefault();

        if (elInputValue.value != "" || keydown.backspaceLock == true) {
          return;
        }

        var isWorked = false;

        if (
          conjunction.value == "OR" &&
          (props.conjunction != "OR" || props.conjunction != "AND")
        ) {
          isWorked = true;
          conjunction.value = "";
        }

        if (isWorked == false && stashTag.key != null) {
          isWorked = true;
          setStashTag();
        }

        if (isWorked == false && tagsGroupByTitle.length != 0) {
          const getLastTag = () => {
            const clearTags = tags.filter(
              (tag) => tag != null && tag != undefined
            );
            return clearTags[clearTags.length];
          };
          const indexs =
            props.merge == true
              ? tagsGroupByTitle.value[
                  tagsGroupByTitle.value.length - 1
                ].values.map((value) => value.index)
              : [getLastTag().index];
          deleteTags(indexs);
        }

        isWorked = false;
        break;

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
        // event.preventDefault();
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

        break;
      }
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
