import { ref, computed } from "vue";

export default function useDropdown(props, _context, dep) {
  // ================ REFS ================

  const elInput = ref(null);

  // ================ REFS DATA ================

  const elInputValue = ref("");

  // ================ DATA ================

  const tags = dep.tags;

  const stashTag = dep.stashTag;

  // ============== COMPUTED ==============

  const appIsLock = computed(() => {
    return props.loading == true || props.disabled == true;
  });

  const elInputDisabled = computed(() => {
    return props.search == false && props.create == false;
  });

  const elInputMaxlength = computed(() => {
    return appIsLock.value == true ||
      elInputDisabled.value ||
      stashTag.key != null
      ? 0
      : 99;
  });

  const elInputPlaceholder = computed(() => {
    const {
      placeholder,
      firstPlaceholder, // data
      loadingPlaceholder,
      finishPlaceholder,
    } = props;
    const change = firstPlaceholder != placeholder && placeholder != "";
    if (change == true) return placeholder;

    if (props.loading == true) return loadingPlaceholder;
    if (props.isFinish == true) return finishPlaceholder;

    if (tags.length == 0 && !stashTag.key) {
      return placeholder;
    }
    return "";
  });

  return {
    elInput,
    elInputValue,
    elInputMaxlength,
    elInputPlaceholder,
    elInputDisabled,
  };
}
