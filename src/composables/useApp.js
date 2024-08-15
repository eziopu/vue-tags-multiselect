import { ref, reactive, watch, computed, provide, readonly } from "vue";

import { getKeydownModel } from "../models";

import { APP_INPUT_BLUR } from "../timeouts.js";

export default function useApp(props, context, dep) {
  // ============== REFS ================

  const elApp = ref(null);

  const elControls = ref(null);

  const elTags = ref(null);

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

  const isTagPositionVisible = computed(() => {
    let position = props.tagPosition;

    const pattern = /(top|bottom)/;

    return pattern.test(position);
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

  // ============== WATCH TO EMIT ==============

  watch(
    isActive,
    (value) => {
      context.emit(value ? "focus" : "blur");
    }
  );

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
    elControls,
    elTags,

    isActive,
    isEnable,
    focusReInit,

    conjunction,
    keydown,
    tabindex,

    isTagPositionVisible,

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
