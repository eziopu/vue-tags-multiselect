import { ref, reactive, computed, provide, readonly, onMounted, nextTick, watch } from "vue";

export default function useMultiselect(props, context) {
  // console.log("function useMultiselect");
  // console.log("props =", props);
  // console.log("context =", context);

  // ================ REFS ================

  const elApp = ref(null);

  const elMain = ref(null);

  const elTag = ref(null);

  const elFill = ref(null);

  const elInput = ref(null);

  const elDropdown = ref(null);

  // ================ REFS DATA ================

  const elInputValue = ref("");

  const elDropdownLeft = ref(0);

  // ================ DATA ================

  const isAppActived = ref(false);

  const isActive = ref(false);

  const mouseClicked = ref(false);

  const tags = reactive([]);


  const getInitialTag = () => ({
    classList: [],
    custom: false,
    displayValue: false,
    index: -1,
    key: null,
    value: null,
    valueElm: undefined,
    titleElm: undefined,
  });

  const stashTag = reactive(getInitialTag());

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

  // ============== WATCH ==============
  watch(isEditMode, async (value) => {
    if (value == true) {
      await nextTick();

      let offset = 0;
      const editDiv = document.querySelector(
        ".vue-tags-multiselect .tags .tag.editing .tag__value.editing"
      );
      if (editDiv != undefined) {
        const elDropdownLeft = elDropdown.value.getBoundingClientRect().left || 0;
        const editLeft = editDiv.getBoundingClientRect().left || 0;
        offset = editLeft - elDropdownLeft || 0;
      }
      // console.log(offset);
      elDropdownLeft.value = offset;
    } else {
      elDropdownLeft.value = 0;
    }
  });

  // =============== METHODS ==============

  const init = (where = "") => {
    // console.log("////////init/////////");
    // console.log("const init = ()", where);
    // console.log("stashTag=", stashTag);
    elInputValue.value = "";
    editTagIndex.value = -1;
    Object.assign(stashTag, getInitialTag());
    // console.log("stashTag=", stashTag);

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
    // console.log("elAppMousedown", e);
  };

  // =============== PROVIDE ==============
  provide("appProps", readonly(props));
  provide("appIsLock", readonly(isLock));
  provide("appStashTag", stashTag);
  provide("appEeditTagIndex", editTagIndex);
  provide("appKeydown", keydown);
  provide("appElInputValue", elInputValue);

  return {
    elApp,
    elMain,
    elTag,
    elFill,
    elDropdown,
    elInput,
    elInputValue,

    isLock,
    isActive,
    isAppActived,
    isEditMode,

    conjunction,
    keydown,
    tabindex,
    mouseClicked,
    elDropdownLeft,

    tags,
    stashTag,
    editTagIndex,

    getInitialTag,

    init,
    initKeydown,
    initConjunction,
    elInputblur,
    elAppClicked,
    elAppMousedown,
  };
}
