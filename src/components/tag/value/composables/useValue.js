import { ref, inject, computed, watch } from "vue";

export default function useValue(props, _context, dep) {
  // ================ REF ================

  const elInput = dep.elInput;

  const elTagValue = ref(null);

  // ================ DATA ================

  const inputValue = dep.inputValue;
  const nextWillDelete = ref(false);
  const nextKeydownWillChagneEditTag = ref(false);

  // ================ INJECT ================

  const appProps = inject("appProps");
  const appEnable = inject("appEnable");
  const appBlur = inject("appBlur");
  const appIsLock = inject("appIsLock");
  const appElInputValue = inject("appElInputValue");
  const appKeydown = inject("appKeydown");
  const appEditTagIndex = inject("appEditTagIndex");
  // const appReFocus = inject("appReFocus");
  // const appSetTagToTags = inject("appSetTagToTags");

  // ============== COMPUTED ==============

  const editMyself = computed(() => {
    return appEditTagIndex.value == props.tag.index;
  });
  const noCustomeHoverAndEditMyself = computed(() => {
    if (appIsLock.value) return false;
    return editMyself.value == true && props.tag.custom == false;
  });
  const editByinput = computed(() => {
    return props.tag.custom == true && editMyself.value == true;
  });

  // ============== WATCH ==============

  watch(inputValue, (value) => {
    if (value != "") {
      nextWillDelete.value = false;
    }
  });

  watch(editMyself, (value) => {
    if (value == false) {
      return;
    }

    if (props.tag.custom == true) {
      inputValue.value = props.tag.value;
      setTimeout(() => {
        elInput.value.focus();
      }, 100);
    } else {
      elTagValue.value.focus();
    }
  });

  watch(
    appKeydown,
    (value) => {
      if (editByinput.value == true) {
        handleKeydownLR(value.keyCode);
      }
      if (
        noCustomeHoverAndEditMyself.value == true &&
        [8, 46].indexOf(value.keyCode) > -1
      ) {
        // back space, del
        deleteTag();
      }
      if (editMyself.value == false) return;
      if (value.keyCode != 13) return;
      dep.elInputEnter();
    },
    {
      deep: true,
    }
  );

  watch(editByinput, (value) => {
    if (value == true) {
      appKeydown.lockLR = true;
      setTimeout(() => {
        nextKeydownWillChagneEditTag.value = this.isInputSelectionLimit();
      }, 100);
    } else {
      nextKeydownWillChagneEditTag.value = false;
    }
  });

  // ============== METHODS ==============
  const deleteTag = dep.deleteTag;

  const handleKeydownLR = (keyCode = 0) => {
    setTimeout(() => {
      const selectionStart = elInput.value.selectionStart;
      if (
        nextKeydownWillChagneEditTag.value == true &&
        ((keyCode == 37 && selectionStart == 0) ||
          (keyCode == 39 && selectionStart == inputValue.value.length))
      ) {
        appKeydown.lockLR = false;
        nextKeydownWillChagneEditTag.value = false;
        // this.app.handleKeydown(keyCode);
      }
      nextKeydownWillChagneEditTag.value = isInputSelectionLimit();
    }, 100);
  };

  const isInputSelectionLimit = () => {
    const selectionStart = elInput.value.selectionStart;
    return selectionStart == 0 || selectionStart == inputValue.value.length
      ? true
      : false;
  };

  const appSetStashTag = inject("appSetStashTag");
  const handleClick = (event) => {
    event.preventDefault();
    if (appIsLock.value == true) return;

    if (editMyself.value == false) {
      appEditTagIndex.value = props.tag.index;
      appElInputValue.value = "";
      appSetStashTag(props.tag);
      appEnable();
    }
  };

  const elDivBlur = () => {
    console.log("elDivBlur", props.tag.value);
    appBlur();
  };

  return {
    appProps,
    appIsLock,
    elTagValue,
    inputValue,
    editByinput,
    editMyself,
    noCustomeHoverAndEditMyself,

    handleClick,
    elDivBlur,
  };
}
