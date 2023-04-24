import { ref, reactive, computed, provide, readonly } from "vue";

import { getKeydownModel } from "../models";

import { APP_INPUT_BLUR } from "../timeouts.js";

export default function useApp(props, _context, dep) {
  // console.log("function useApp");
  // console.log("props =", props);
  // console.log("context =", context);

  // ================ REFS ================

  const elApp = ref(null);

  const elMain = ref(null);

  const elTags = ref(null);

  const elFill = ref(null);

  const elInput = dep.elInput;

  // ================ DATA ================

  const isAppActived = ref(false);

  const focusReInit = ref(true);

  const isActive = ref(false);

  const keydown = reactive(getKeydownModel());

  const conjunction = ref("");

  const editTagIndex = dep.editTagIndex;

  const elInputValue = dep.elInputValue;

  // ============== COMPUTED ==============

  const tabindex = computed(() => {
    return props.disabled ? -1 : 0;
  });

  // =============== METHODS ==============

  const setStashTag = dep.setStashTag;

  const init = (where = "") => {
    console.log("////////init(" + where + ")/////////0");
    // console.log("const init = ()", where);
    elInputValue.value = "";
    editTagIndex.value = -1;
    setStashTag();

    initKeydown();
    initConjunction();
  };

  const initKeydown = () => {
    Object.assign(keydown, getKeydownModel());
  };

  const initConjunction = () => {
    conjunction.value =
      props.conjunction == "OR" || props.conjunction == "AND"
        ? props.conjunction
        : "";
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
    // console.log("000 elAppFocus elAppFocus elAppFocus");

    if (!props.disabled) {
      elInput.value.focus();
      appEnable();
    }
  };

  const elInputFocus = () => {
    if (props.disabled) return;
    appEnable();

    if (focusReInit.value == true) {
      init("elInputFocus");
    } else {
      focusReInit.value = true;
    }
  };

  const elInputBlur = () => {
    setTimeout(() => {
      const actElm = document.activeElement;
      console.log("1 elInputBlur actElm=", actElm, isActiveElementContainApp());
      if (isActiveElementContainApp() == false) {
        isActive.value = false;
        init("elInputBlur");
      }
    }, APP_INPUT_BLUR);
  };
  // =============== PROVIDE ==============
  provide("appProps", readonly(props));
  provide("appConjunction", readonly(conjunction));

  provide("appKeydown", keydown);
  provide("appElInputValue", elInputValue);

  provide("appIsActiveToFalse", () => {
    isActive.value = false;
  });
  provide("appEnable", appEnable);
  provide("appReFocus", focusApp);
  provide("appBlur", elInputBlur);
  provide("appNextReFocusDontInit", () => {
    focusReInit.value = false;
  });

  provide("isActiveElementContainApp", isActiveElementContainApp);

  return {
    elApp,
    elMain,
    elTags,
    elFill,

    isActive,
    isAppActived,
    focusReInit,

    conjunction,
    keydown,
    tabindex,

    init,
    initKeydown,
    initConjunction,
    elInputFocus,
    elInputBlur,

    focusApp,
    elAppFocus,
    isActiveElementContainApp,
  };
}
