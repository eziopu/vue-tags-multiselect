import { computed } from "vue";

export default function useSystemOption(_props, _context, dep) {
  // ================ DATA ================

  const tagsGroupByTitle = dep.tagsGroupByTitle;

  const stashTag = dep.stashTag;

  const focusReInit = dep.focusReInit;

  const elInputValue = dep.elInputValue;

  const conjunction = dep.conjunction;

  const dropdownStatus = dep.dropdownStatus;

  // ============== COMPUTED ==============

  const isEditMode = dep.isEditMode;

  const tagsGroupByKey = dep.tagsGroupByKey;

  const isDisplayElOptionUndo = computed(() => {
    return stashTag.key != null;
  });

  const isDisplayElOptionORConjunction = computed(() => {
    console.log("isDisplayElOptionORConjunction 000");
    if (
      tagsGroupByTitle.value.length == 0 ||
      isEditMode.value == true ||
      stashTag.key != null
    ) {
      return false;
    }
    console.log("isStillOptionsCanSelected()");
    console.log(isStillOptionsCanSelected());
    if (isStillOptionsCanSelected() == false) {
      return false;
    }

    return conjunction.value == "";
  });
  // =============== METHODS ==============

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

  return {
    isDisplayElOptionUndo,
    isDisplayElOptionORConjunction,

    elOptionUndo,
    elOptionORConjunction,
  };
}
