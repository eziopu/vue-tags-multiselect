import { computed, nextTick } from "vue";

export default function useSystemOption(_props, _context, dep) {
  // ================ REFS ================

  const elDropdown = dep.elDropdown;

  // ================ DATA ================

  const tags = dep.tags;

  const stashTag = dep.stashTag;

  const elInputValue = dep.elInputValue;

  const conjunction = dep.conjunction;

  // ============== COMPUTED ==============

  const isEditMode = dep.isEditMode;

  const isDisplayElOptionUndo = computed(() => {
    return stashTag.key != null;
  });

  const isDisplayElOptionORConjunction = computed(async () => {
    if (isEditMode.value == true || tags.length == 0 || stashTag.key != null) {
      return false;
    }

    await nextTick();
    const displayOptionElms =
      elDropdown.value.querySelectorAll(".option:not(.hidden)") || [];
    if (displayOptionElms.length == 0) {
      return false;
    }

    return (
      conjunction.value == "" && stashTag.key != null
      // &&
      // this.allDropdownIsFinish() == false
    );
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
  };

  return {
    isDisplayElOptionUndo,
    isDisplayElOptionORConjunction,

    elOptionUndo,
    elOptionORConjunction,
  };
}
