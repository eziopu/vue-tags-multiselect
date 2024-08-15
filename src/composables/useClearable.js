import { computed } from "vue";

export default function useClearable(props, context, dep) {
  // ============== DATA ================

  const tags = dep.tags;

  const tagsGroupByTitle = dep.tagsGroupByTitle;

  const elInputValue = dep.elInputValue;

  const isEditMode = dep.isEditMode;

  // ============== COMPUTED ==============

  const isClearableVisible = computed(() => {
    if (props.clearable == false || isEditMode.value == true) {
      return false;
    }

    return elInputValue.value != '' || tagsGroupByTitle.value.length >= 1;
  });

  const init = dep.init;
  const clearTags = () => {
    tags.splice(0, tags.length);
  }

  const clear = () => {
    if (props.disabled) {
      dep.log(
        `clear`,
        `method is not available while the props.disabled is 'true'`,
        `warning`
      );
      return;
    }
    clearTags();
    init();

    context.emit("clear");
  }

  return {
    isClearableVisible,
    clear
  };
}
