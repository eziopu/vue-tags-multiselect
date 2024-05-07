import { ref, nextTick, watch, provide } from "vue";

import { APP_KEYDOWN_LOCK_BY_TAG_INPUT_FOCUS } from "../timeouts.js";

export default function useKeyboard(props, _context, dep) {
  // ============== DEPENDENCIES ==============

  const focusApp = dep.focusApp;

  const tags = dep.tags;

  const tagsGroupByTitle = dep.tagsGroupByTitle;

  const conjunction = dep.conjunction;

  const keydown = dep.keydown;

  const elInputValue = dep.elInputValue;

  const isEditMode = dep.isEditMode;

  const stashTag = dep.stashTag;

  const setTagToTags = dep.setTagToTags;

  // ============== REFS ================

  const elDropdown = dep.elDropdown;

  const elTags = dep.elTags;

  // ============== COMPUTED ==============

  const appIsLock = dep.appIsLock;

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
        keydown.enterLock = false;
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
    if (value == -1) {
      return;
    }

    await nextTick();
    const tagValues = getTagValueElms();

    for (let index = 0; index < tagValues.length; index++) {
      const targetIndex = tagValues.length - 1 - index;
      if (
        Number(tagValues[index].dataset.index) == value &&
        keydown.horizontalIndex != targetIndex
      ) {
        horizontalClickEnable.value = false;
        keydown.horizontalIndex = targetIndex;
      }
    }
    setTimeout(() => {
      if (isActiveElementContainApp() == true) {
        const actElm = document.activeElement;
        const isTagValueInput = actElm.classList.contains("v-tag__value--input");
        keydown.horizontalLock = isTagValueInput;
        keydown.backspaceLock = isTagValueInput;
        keydown.enterLock = isTagValueInput;
      }
    }, APP_KEYDOWN_LOCK_BY_TAG_INPUT_FOCUS);
  });

  // ============== METHODS ==============

  const setStashTag = dep.setStashTag;

  const deleteTags = dep.deleteTags;

  const getDisplayOptionElms = () => {
    return elDropdown.value.querySelectorAll(".v-option:not(.hidden)") || [];
  };

  const getTagValueElms = () => {
    return elTags.value.querySelectorAll(".v-tag__value") || [];
  };

  const publicLog = dep.log;
  const log = (context, type = "info") => {
    publicLog("keydown", context, type);
  };

  const init = dep.init;
  const isPassTagInputBlur = dep.isPassTagInputBlur;
  const handleKeydown = async (event) => {
    if (props.keyboard == false) {
      log(
        "method is not yet enabled because the props keyboard value is false.",
        "warning"
      );
      return;
    }

    if (appIsLock.value == true) {
      log("method is not yet enabled while the app is locked", "warning");
      return;
    }

    switch (event.key) {
      case "Enter":
        log(`get ${event.key}`);
        if (keydown.enterLock == true) {
          return;
        }
        event.preventDefault();
        await nextTick();

        if (keydown.verticalIndex != -1) {
          const displayOptions = getDisplayOptionElms();
          const option = displayOptions[keydown.verticalIndex];

          if (option != undefined && option.classList.contains("hover")) {
            if (isHoverSystemOption() == true) {
              handleSystemOption();
            } else {
              log(`click option`);
              isPassTagInputBlur.value = true;
              option.click();
            }
            keydown.verticalIndex = -1;
            elInputValue.value = "";
            log(`vertical index to initialize`);
            log(`input value reset`);
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
            log(`generate a tag`);
            setTagToTags(newTag);
            log(`initialize`);
            init();
          }

          if (
            stashTag.key != null &&
            stashTag.value == null &&
            stashTag.custom == true
          ) {
            log(`generate a tag`);
            setTagToTags({
              ...stashTag,
              ...newTag,
            });
            setStashTag();
            log(`initialize`);
            init();
          }
        }

        break;

      case "Delete":
      case "Backspace": {
        log(`get ${event.key}`);
        if (elInputValue.value != "" || keydown.backspaceLock == true) {
          return;
        }
        event.preventDefault();

        try {
          let isExecuted = false;

          if (stashTag.key != null && stashTag.value == null) {
            log(`clear stashTag`);
            setStashTag();
            isExecuted = true;
          }

          if (isEditMode.value == true && stashTag.custom == false) {
            log(`delete the tag`);
            deleteTags([editTagIndex.value]);
            focusApp();
            isExecuted = true;
          }

          if (
            conjunction.value == "OR" &&
            (props.conjunction != "OR" || props.conjunction != "AND")
          ) {
            log(`clear conjunction`);
            conjunction.value = "";
            throw "";
          }

          if (isExecuted == false && tagsGroupByTitle.length != 0) {
            if (props.merge == true) {
              const indexs = tagsGroupByTitle.value[
                tagsGroupByTitle.value.length - 1
              ].values.map((value) => value.index);

              log(`delete tags`);
              deleteTags(indexs);
              throw "";
            } else {
              const getLastTag = () => {
                const clearTags = tags.filter(
                  (tag) => tag != null && tag != undefined
                );
                return clearTags[clearTags.length - 1];
              };
              const indexs = [getLastTag().index];
              log(`delete the last tag`);
              deleteTags(indexs);
              throw "";
            }
          }
        } catch (msg) {
          if (msg != "") {
            log(msg, "error");
          }
        }
        break;
      }

      case "ArrowUp":
      case "ArrowDown": {
        log(`get ${event.key}`);
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

          const navigationMaxNumber = editTagIndex.value == -1 ? -1 : -2;

          if (newIndex <= navigationMaxNumber) {
            newIndex = numElements - 1;
          } else if (newIndex >= numElements) {
            newIndex = editTagIndex.value == -1 ? 0 : -1;
          }

          keydown.verticalIndex = newIndex;
        } catch (error) {
          if (error != "locked") {
            log(error, `error`);
            keydown.verticalIndex = -1;
          }
        }

        break;
      }

      case "ArrowLeft":
      case "ArrowRight": {
        log(`get ${event.key}`);
        await nextTick();

        try {
          if (keydown.horizontalLock == true) throw "locked";
          event.preventDefault();

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
            log(error, `error`);
            keydown.horizontalIndex = -1;
          }
        }

        break;
      }
    }
  };
  const isUndoOptionVisible = dep.isUndoOptionVisible;
  const isORConjunctionOptionVisible = dep.isORConjunctionOptionVisible;
  const elOptionUndo = dep.elOptionUndo;
  const elOptionORConjunction = dep.elOptionORConjunction;

  const isHoverSystemOption = () => {
    return (
      keydown.verticalIndex == 0 &&
      (isUndoOptionVisible.value || isORConjunctionOptionVisible.value)
    );
  };

  const handleSystemOption = () => {
    if (isUndoOptionVisible.value) {
      log(`click undo option`);
      elOptionUndo();
    }
    if (isORConjunctionOptionVisible.value) {
      log(`click OR conjunction option`);
      elOptionORConjunction();
    }
  };

  // ============== PROVIDE ==============
  provide("appHandleKeydown", handleKeydown);

  return {
    handleKeydown,
  };
}
