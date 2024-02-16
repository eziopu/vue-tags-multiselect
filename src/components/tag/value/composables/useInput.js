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
    const value = inputValue.value || "";
    return (value.length || 2) + 1 + "em";
  });

  // ============== WATCH ==============

  let timer = null;
  // const appIsDuplicateTag = inject("appIsDuplicateTag");
  const orriginalTag = Object.assign({}, props.tag);
  const appIsEnable = inject("appIsEnable");
  const appIsDuplicateTag = inject("appIsDuplicateTag");
  const appIsOnlyOneTheTag = inject("appIsOnlyOneTheTag");
  const appEditTagIndex = inject("appEditTagIndex");

  const editMyself = computed(() => {
    return appEditTagIndex.value == props.tag.index;
  });

  watch(inputValue, (newValue) => {
    if (
      editMyself.value == false ||
      appIsEnable.value == false ||
      props.tag.custom == false
    ) {
      return;
    }

    const newTag = {
      value: newValue,
      valueElm: null,
      displayValue: true,
    };

    if (newValue == orriginalTag.value) {
      newTag.valueElm = orriginalTag.valueElm;
      newTag.displayValue = orriginalTag.displayValue;
    } else {
      if (appIsDuplicateTag(props.tag.key, newValue)) {
        timer = setTimeout(() => {
          valueRepeatFlashing();
        }, 500);
      } else {
        clearTimeout(timer);
      }
    }
    updateTag(newTag);
  });

  // ============== METHODS ==============

  const appUpdateTag = inject("appUpdateTag");
  const appStashTag = inject("appStashTag");
  const updateTag = (newTag) => {
    appUpdateTag(newTag);
    appStashTag.value = newTag.value;
    appStashTag.valueElm = newTag.valueElm;
    appStashTag.displayValue = newTag.displayValue;
  };

  const valueRepeatFlashing = () => {
    isInputValueRepeat.value = true;
    setTimeout(() => {
      isInputValueRepeat.value = false;
    }, 1000);
  };

  const elInputFocus = (event) => {
    const selectionStart = event.target.selectionStart;
    const value = inputValue.value || "";
    if (selectionStart == 0 || selectionStart == value.length) {
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
  const appIsPassTagInputBlur = inject("appIsPassTagInputBlur");
  const elInputBlur = () => {
    if (appIsPassTagInputBlur.value == true) {
      appIsPassTagInputBlur.value = false;
      return;
    }

    if (inputValue.value == "" || inputValue.value == null) {
      deleteTag("elInputBlur", "value is empty");
    } else if (
      appIsOnlyOneTheTag(props.tag.key, inputValue.value) == false
    ) {
      deleteTag("elInputBlur", "value duplication");
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
