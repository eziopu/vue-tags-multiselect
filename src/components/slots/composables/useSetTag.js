import { computed, inject, provide, readonly } from "vue";

import { getTagModel } from "../../../models";

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
    ...getTagModel(),
    ...{
      key: props.value,
      custom: props.custom,
      classList: classList.value,
    },
  };
  Object.seal(prototypeStashTag);

  // ================ INJECT ================

  const appReFocus = inject("appReFocus");

  const appNextReFocusDontInit = inject("appNextReFocusDontInit");

  const appSetStashTag = inject("appSetStashTag");

  const appSetStashTagToTags = inject("appSetStashTagToTags");

  // =============== PROVIDE ==============

  provide("dropdownSetTagToTag", (item = {}) => {
    const stashTag = { ...prototypeStashTag, ...item };
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

  provide("dropdownClassList", readonly(classList));

  return {};
}
