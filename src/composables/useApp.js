import { ref, reactive, computed, provide, readonly } from "vue";

import { getKeydownModel } from "../models";

import { APP_INPUT_BLUR } from "../timeouts.js";

export default function useApp(props, _context, dep) {
  // dep.log("function useApp");
  // dep.log("props =", props);
  // dep.log("context =", context);

  // ============== REFS ================

  const elApp = ref(null);

  const elMain = ref(null);

  const elTags = ref(null);

  const elFill = ref(null);

  const elInput = dep.elInput;

  // ============== DATA ================

  const isEnable = ref(false);

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

  // ============== METHODS ==============

  const setStashTag = dep.setStashTag;

  const init = (where = "") => {
    dep.log(
      `init`,
      `app initialize${where != "" ? ", called by " + where : ""}`
    );
    dep.log2(`reset stashTag`);
    dep.log2(`reset edit tag index`);
    dep.log2(`reset keydown index`);
    dep.log2(`reset conjunction`);
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
    isEnable.value = true;
  };

  const focusApp = () => {
    if (isEnable.value == true) {
      elInput.value.focus();
    }
  };

  const isActiveElementContainApp = () => {
    const actElm = document.activeElement;
    return elApp.value.contains(actElm);
  };

  const elAppFocus = () => {
    // dep.log("000 elAppFocus elAppFocus elAppFocus");

    if (!props.disabled) {
      elInput.value.focus();
      appEnable();
    }
  };

  const elInputFocus = () => {
    if (props.disabled) {
      dep.log(
        `InputFocus`,
        `method is not available while the app is locked`,
        `warning`
      );
      return;
    }
    dep.log(`InputFocus`, `available`);
    appEnable();

    if (focusReInit.value == true) {
      init("elInputFocus()");
    } else {
      focusReInit.value = true;
    }
  };

  const elInputBlur = () => {
    setTimeout(() => {
      // const actElm = document.activeElement;
      // dep.log("1 elInputBlur actElm=", actElm, isActiveElementContainApp());

      if (isActiveElementContainApp() == false) {
        dep.log(`InputBlur`, `available`);
        dep.log2(`actElm :`, document.activeElement);

        isActive.value = false;
        init("elInputBlur()");
      } else {
        isActive.value = true;
      }
    }, APP_INPUT_BLUR);
  };

  // ============== PROVIDE ==============

  provide("appProps", readonly(props));
  provide("appConjunction", readonly(conjunction));

  provide("appKeydown", keydown);
  provide("appElInputValue", elInputValue);

  provide("appIsEnable", readonly(isEnable));
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
    isEnable,
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
