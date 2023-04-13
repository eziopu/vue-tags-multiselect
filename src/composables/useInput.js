import { ref, computed, watch, nextTick } from "vue";

export default function useDropdown(props, _context, dep) {
  // ================ REFS ================

  const elInput = ref(null);

  // ================ REFS DATA ================

  const elInputValue = ref("");

  // ================ DATA ================

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

  return {
    elInput,
    elInputValue,
    elInputMaxlength,
    elInputDisabled,
  };
}
