import { ref, computed, watch, inject } from "vue";

export default function useDelete(props, _context, dep) {
  // ============== REF ================

  const elInput = ref(null);

  // ============== DATA ================

  const inputValue = ref("");

  const isInputValueRepeat = ref(false);

  const nextWillDelete = ref(false);

  // ============== COMPUTED ==============

  const inputWidth = computed(() => {
    return (inputValue.value.length || 2) + 1 + "em";
  });

  // ============== WATCH ==============

  let timer = null;
  const appIsDuplicateTag = inject("appIsDuplicateTag");
  watch(inputValue, (newValue) => {
    if (newValue != "") {
      nextWillDelete.value = false;
    }
    if (newValue !== props.tag.value) {
      if (appIsDuplicateTag(props.tag.key, newValue)) {
        timer = setTimeout(() => {
          valueRepeatFlashing();
        }, 500);
      } else {
        clearTimeout(timer);
      }
    }
  });

  // ============== METHODS ==============

  const valueRepeatFlashing = () => {
    isInputValueRepeat.value = true;
    setTimeout(() => {
      isInputValueRepeat.value = false;
    }, 1000);
  };

  const elInputFocus = (event) => {
    const selectionStart = event.target.selectionStart;
    if (selectionStart == 0 || selectionStart == inputValue.value.length) {
      nextWillDelete.value = false;
    }
  };

  const appBlur = inject("appBlur");
  const appIsActiveToFalse = inject("appIsActiveToFalse");
  const isActiveElementContainApp = inject("isActiveElementContainApp");

  const blur = () => {
    setTimeout(() => {
      if (isActiveElementContainApp() == false) {
        appIsActiveToFalse();
      }
      appBlur();
    }, 50);
  };

  const deleteTag = dep.deleteTag;
  const elInputBlur = () => {
    if (inputValue.value == "") {
      deleteTag(" value elInputBlur");
    }
    blur();
  };

  return {
    elInput,
    inputValue,
    inputWidth,
    isInputValueRepeat,
    nextWillDelete,

    valueRepeatFlashing,
    elInputFocus,
    elInputBlur,
    blur,
  };
}
