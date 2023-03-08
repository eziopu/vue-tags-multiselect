import { ref, reactive, computed, provide } from "vue";

export default function useMultiselect(props, context) {
  console.log("function useMultiselect");
  console.log("props =", props);
  console.log("context =", context);

  // ================ REFS ================

  const elApp = ref(null);

  const elMain = ref(null);

  const elTag = ref(null);

  const elFill = ref(null);

  const elInput = ref(null);

  // ================ DATA ================

  const isAppActived = ref(false);

  const isActive = ref(false);

  const inputValue = ref("");

  const mouseClicked = ref(false);

  const tags = reactive([]);

  const getInitialStashTag = () => ({
    classList: undefined,
    custom: false,
    displayValue: false,
    elm: { value: undefined, title: undefined },
    index: -1,
    key: undefined,
    value: undefined,
  });

  const stashTag = reactive(getInitialStashTag());

  const getInitialKeydown = () => ({
    keyCode: -1,
    lockLR: -1,
    UDIndex: -1,
    LRIndex: -1,
    lockKeydownLR: false,
  });

  const keydown = reactive(getInitialKeydown());

  const conjunction = ref("");

  const editTagIndex = ref(-1);

  // ============== COMPUTED ==============

  const tabindex = computed(() => {
    return props.disabled ? -1 : 0;
  });

  const isLock = computed(() => {
    return props.loading == true || props.disabled == true;
  });

  const isEditMode = computed(() => {
    return editTagIndex.value != -1;
  });

  const elDropdownLeft = computed(() => {
    let offset = elFill.value.offsetLeft || 0;
    let scrollLeft = elMain.value.scrollLeft || 0;

    if (isEditMode.value == true) {
      const editDiv = this.$el.querySelector(
        ".tag.editing .tag__value.editing"
      );
      if (editDiv != undefined) {
        const appLeft = elApp.value.getBoundingClientRect().left || 0;
        const editLeft = editDiv.getBoundingClientRect().left || 0;
        offset = editLeft - appLeft || 0;
        offset += 12;
      }
    }
    return offset - scrollLeft;
  });

  // =============== METHODS ==============

  const init = (where = "") => {
    console.log("////////init/////////");
    console.log("const init = ()", where);
    console.log("stashTag=", stashTag);
    inputValue.value = "";
    Object.assign(stashTag, getInitialStashTag());
    console.log("stashTag=", stashTag);

    initKeydown();
    initConjunction();
  };

  const initKeydown = () => {
    Object.assign(keydown, {
      keyCode: -1,
      UDIndex: -1,
      LRIndex: -1,
      lockKeydownLR: false,
    });
  };

  const initConjunction = () => {
    conjunction.value =
      props.conjunction == "OR" || props.conjunction == "AND"
        ? props.conjunction
        : "";
  };

  const elInputblur = () => {
    const actElm = document.activeElement;
    if (actElm != elInput.value && this.$el.contains(actElm) == false) {
      init("elInputblur");
    }
  };

  const elAppClicked = () => {
    if (!props.disabled) {
      elInput.value.focus();

      isActive.value = true;
      isAppActived.value = true;
    }
  };

  /* istanbul ignore next */
  const elAppMousedown = (e) => {
    mouseClicked.value = true;
    console.log("elAppMousedown", e);
  };

  // =============== PROVIDE ==============
  provide("appProps", props);
  provide("appIsLock", isLock);
  provide("appStashTag", stashTag);
  provide("appEeditTagIndex", editTagIndex);
  provide("appKeydown", keydown);
  provide("appInputValue", inputValue);

  return {
    elApp,
    elMain,
    elTag,
    elFill,
    elInput,

    isLock,
    isActive,
    isAppActived,
    isEditMode,

    conjunction,
    inputValue,
    keydown,
    tabindex,
    mouseClicked,
    elDropdownLeft,

    tags,
    stashTag,
    editTagIndex,

    init,
    initKeydown,
    initConjunction,
    elInputblur,
    elAppClicked,
    elAppMousedown,
  };
}
