import { ref, computed } from "vue";
import { getPlaceholdersModel } from "../models";

export default function useElInput(props, _context, dep) {
  // ============== REFS ================

  const elInput = ref(null);

  // ============== REFS DATA ================

  const elInputValue = ref("");

  // ============== DATA ================

  const tags = dep.tags;

  const stashTag = dep.stashTag;

  // ============== COMPUTED ==============

  const isFinish = computed(() => {
    return dep.isSelectDown == true && props.create == false;
  });

  const placeholders = computed(() => {
    return getPlaceholdersModel(props.placeholders);
  });

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

  const isAllDropdownIsDown = dep.isAllDropdownIsDown;

  const elInputPlaceholder = computed(() => {
    const doing = tags.length == 0 && !stashTag.key;
    if (props.placeholder != "" && doing == false) {
      return props.placeholder;
    }

    const { initial, loading, selectDown, finish } = placeholders.value;

    if (props.loading == true) return loading;
    if (isFinish.value == true) return finish;

    if (tags.length == 0 && !stashTag.key) {
      return initial;
    }

    if (isAllDropdownIsDown.value == true) {
      return selectDown;
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
