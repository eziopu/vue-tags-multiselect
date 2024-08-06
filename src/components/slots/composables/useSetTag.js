import { ref, computed, watch, inject } from "vue";

import { getTagModel } from "../../../models";

import clearHTML from "../../../utils/clearHTML";

export default function useDropdown(props, _context, dep) {
  // ============== REFS ==============

  const elOption = ref(null);

  // ============== INJECTs ================

  const appEditTagIndex = inject("appEditTagIndex");
  const appUpdateTag = inject("appUpdateTag");
  const appReFocus = inject("appReFocus");
  const appNextReFocusDontInit = inject("appNextReFocusDontInit");
  const appSetStashTag = inject("appSetStashTag");
  const appSetTagToTags = inject("appSetTagToTags");
  const appCallOptionSetTag = inject("appCallOptionSetTag");
  const appCallOptionSetTagFinish = inject("appCallOptionSetTagFinish");

  const dropdownProps = inject("dropdownProps") || {};
  const dropdownClassList = inject("dropdownClassList") || [];
  const dropdownGetTitleInnerHTML = inject("dropdownGetTitleInnerHTML") || "";

  // ============== DATA ==============

  const isDisabled = dep.isDisabled;

  // ============== COMPUTED ==============

  const innerHTML = computed(() => {
    if (elOption.value == null) {
      return null;
    }
    return clearHTML(elOption.value.innerHTML) || "";
  });

  const prototypeStashTag = computed(() => {
    const result = Object.seal({ ...getTagModel() });
    result.custom = dropdownProps.custom;
    result.classList = dropdownClassList.value;
    result.displayValue = props.displayValue;

    if (props.title) {
      result.key = dropdownProps.value;
      result.titleElm = innerHTML.value;
    } else {
      result.key = dropdownProps.value;
      result.titleElm = dropdownGetTitleInnerHTML.value;
      result.value = props.value;
      result.valueElm = innerHTML.value;
    }
    return result;
  });

  const handleClick = () => {
    if (isDisabled) return;
    if (!props.title && props.value == "") {
      // const slotContent = context.slots.default();
      // if (
      //   slotContent &&
      //   slotContent.length > 0 &&
      //   typeof slotContent[0].props.onClick == "function"
      // ) {
      //   slotContent[0].props.onClick();
      // }
      return;
    }

    // 編輯模式
    if (appEditTagIndex.value != -1) {
      appUpdateTag(prototypeStashTag.value);
      appReFocus();
      return;
    }

    if (prototypeStashTag.value.valueElm != null) {
      appSetTagToTags(prototypeStashTag.value);
      appSetStashTag();
    } else {
      appSetStashTag(prototypeStashTag.value);
      appNextReFocusDontInit();
    }
    appReFocus();
  };

  watch(appCallOptionSetTag, (value) => {
    if (
      props.title == false &&
      value.key == dropdownProps.value &&
      value.value == props.value
    ) {
      handleClick();
      appCallOptionSetTagFinish();
    } else if (
      props.title == true &&
      value.key == dropdownProps.value &&
      value.valueIsCustome == true
    ) {
      handleClick();
      appCallOptionSetTagFinish();
    }
  });

  return {
    elOption,
    innerHTML,
    handleClick,
  };
}
