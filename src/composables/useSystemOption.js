import { computed, provide, readonly } from "vue";

export default function useSystemOption(_props, _context, dep) {
  // ============== DATA ================

  const tagsGroupByTitle = dep.tagsGroupByTitle;

  const stashTag = dep.stashTag;

  const focusReInit = dep.focusReInit;

  const elInputValue = dep.elInputValue;

  const conjunction = dep.conjunction;

  const dropdownStatus = dep.dropdownStatus;

  // ============== COMPUTED ==============

  const isEditMode = dep.isEditMode;
  const tagsGroupByKey = dep.tagsGroupByKey;
  const isAllDropdownIsDown = dep.isAllDropdownIsDown;

  const isORConjunctionOptionVisible = computed(() => {
    if (
      tagsGroupByTitle.value.length == 0 ||
      isAllDropdownIsDown.value == true ||
      isEditMode.value == true ||
      stashTag.key != null
    ) {
      return false;
    }
    if (isStillOptionsCanSelected() == false) {
      return false;
    }

    return conjunction.value == "";
  });

  const isUndoOptionVisible = computed(() => {
    return stashTag.key != null && isEditMode.value == false;
  });

  // ============== METHODS ==============

  const setStashTag = dep.setStashTag;
  const elAppFocus = dep.elAppFocus;

  const elOptionUndo = () => {
    setStashTag();
    elAppFocus();
  };

  const elOptionORConjunction = () => {
    elInputValue.value = "";
    conjunction.value = "OR";

    focusReInit.value = false;
    elAppFocus();
  };

  const isStillOptionsCanSelected = () => {
    // const dropdownStatus = { "country": { "isDown": true }, "country2": { "isDown": false }, "country333": { "isDown": false } } (reactive)
    // const tagsGroupByKey = { "country": ["val1", "val2"], "country2": ["val1"] } (computed)
    const tempTagsGroupByKey = { ...tagsGroupByKey.value };
    Object.keys(dropdownStatus).forEach((key) => {
      if (
        dropdownStatus[key].isDown == true &&
        tempTagsGroupByKey[key] != undefined
      ) {
        delete tempTagsGroupByKey[key];
      }
    });
    return Object.keys(tempTagsGroupByKey).length > 0;
  };
  // ============== PROVIDE ==============

  provide("appIsUndoOptionVisible", readonly(isUndoOptionVisible));
  provide("appIsORConjunctionOptionVisible", readonly(isORConjunctionOptionVisible));

  return {
    isUndoOptionVisible,
    isORConjunctionOptionVisible,

    elOptionUndo,
    elOptionORConjunction,
  };
}
