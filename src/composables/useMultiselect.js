import {
  ref,
  reactive,
  computed,
  provide,
  readonly,
  nextTick,
  watch,
} from "vue";

import { tagModel, keydownModel } from "../models";

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

  const focusReInit = ref(true);

  const isActive = ref(false);

  const mouseClicked = ref(false);

  const tags = reactive([]);

  const stashTag = reactive({ ...tagModel });

  const keydown = reactive({ ...keydownModel });

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

  const elDropdownDisplay = computed(() => {
    return props.disabled == false && isActive.value == true;
  });

  // ============== WATCH ==============
  watch(editTagIndex, async (value) => {
    if (value != -1) {
      await nextTick();

      let offset = 0;
      const editDiv = elApp.value.querySelector(
        ".tags .tag.editing .tag__value.editing"
      );
      if (editDiv != undefined) {
        const elMainLeft = elMain.value.getBoundingClientRect().left || 0;
        const editLeft = editDiv.getBoundingClientRect().left || 0;
        offset = editLeft - elMainLeft || 0;
      }
      // console.log(offset);
      elDropdownLeft.value = offset;
    } else {
      elDropdownLeft.value = 0;
    }
  });

  // =============== METHODS ==============

  const init = (where = "") => {
    console.log("////////init(" + where + ")/////////");
    // console.log("const init = ()", where);
    // console.log("stashTag=", stashTag);
    elInputValue.value = "";
    editTagIndex.value = -1;
    Object.assign(stashTag, tagModel);
    console.log("////////init(" + where + ")/////////");

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
    console.log("00000 elInputblur 00000");
  };

  const elAppClicked = () => {
    // if (!props.disabled) {
    //   elInput.value.focus();
    //   isActive.value = true;
    //   isAppActived.value = true;
    // }
  };

  const appEnable = () => {
    isActive.value = true;
    isAppActived.value = true;
  };

  const focusApp = () => {
    if (isAppActived.value == true) {
      elInput.value.focus();
    }
  };

  const isActiveElementContainApp = () => {
    const actElm = document.activeElement;
    return elApp.value.contains(actElm);
  };

  const elAppFocus = () => {
    console.log("000 elAppFocus elAppFocus elAppFocus");

    if (!props.disabled) {
      elInput.value.focus();
      appEnable();
    }
  };

  const elInputFocus = () => {
    if (props.disabled) return;
    appEnable();

    if (focusReInit.value == true) {
      console.log("yyyyyyyyyyy");
      init("elInputFocus");
    } else {
      focusReInit.value = true;
    }
  };

  const elInputBlur = () => {
    setTimeout(() => {
      const actElm = document.activeElement;
      console.log("1 elInputBlur elInputBlur");
      console.log("1 elInputBlur actElm=", actElm, isActiveElementContainApp());
      if (isActiveElementContainApp() == false) {
        init("elInputBlur");
        isActive.value = false;
      }
    }, 100);

    // deactivate();
  };
  // =============== PROVIDE ==============
  provide("appProps", readonly(props));
  provide("appIsLock", readonly(isLock));
  provide("appStashTag", stashTag);
  provide("appEeditTagIndex", editTagIndex);
  provide("appKeydown", keydown);
  provide("appElInputValue", elInputValue);

  provide("appEnable", appEnable);
  provide("appReFocus", focusApp);
  provide("appBlur", elInputBlur);
  provide("appNextReFocusDontInit", () => {
    focusReInit.value = false;
  });

  return {
    elApp,
    elMain,
    elTag,
    elFill,
    elDropdown,
    elDropdownDisplay,
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

    init,
    initKeydown,
    initConjunction,
    elInputFocus,
    elInputblur,
    elAppClicked,

    focusApp,
    elAppFocus,
    elInputBlur,
  };
}
