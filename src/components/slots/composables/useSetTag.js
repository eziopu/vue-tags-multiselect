import { computed, inject, provide, readonly } from "vue";

export default function useSetTag(props, context, dep) {
  // ================ REFS ================

  const elDropdown = dep.elDropdown;

  // ============== COMPUTED ==============

  const getTitleInnerHTML = dep.getTitleInnerHTML;

  const classList = computed(() => {
    if (elDropdown.value == null) return [];
    const list = [...elDropdown.value.classList];
    const blacklist = new Set([
      "dropdown",
      "display-all",
      "no-title",
      "disabled",
      "divided",
      "hidden",
      "hover",
    ]);
    return list.filter((x) => !blacklist.has(x)) || [];
  });

  // ================ PROTOTYPE DATA ================

  const prototypeStashTag = {
    titleElm: null,
    valueElm: null,
    value: null, // is option value
    key: props.value,
    custom: props.custom,
    displayValue: null, // is option value
    classList: classList.value,
  };

  // ================ INJECT ================

  const appReFocus = inject("appReFocus");

  const appNextReFocusDontInit = inject("appNextReFocusDontInit");

  const appSetStashTag = inject("appSetStashTag");

  const appSetStashTagToTags = inject("appSetStashTagToTags");

  // =============== PROVIDE ==============

  provide("dropdownSetTagToTag", (item = {}) => {
    const stashTag = JSON.parse(JSON.stringify(prototypeStashTag));
    stashTag.value = item.value;
    stashTag.displayValue = item.displayValue;

    if (item.is_title == true) {
      stashTag.titleElm = item.vnode;
    } else {
      stashTag.valueElm = item.vnode;

      if (stashTag.titleElm == null) {
        stashTag.titleElm = getTitleInnerHTML.value;
      }
    }
    appSetStashTag(stashTag);

    if (stashTag.valueElm != null) {
      appSetStashTagToTags();
    } else {
      appNextReFocusDontInit();
    }
    appReFocus();
  });

  provide("dropdownProps", readonly(props));

  return {};
}
