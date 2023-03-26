import {
  ref,
  computed,
  onMounted,
  // onMounted,
  // nextTick,
  inject,
} from "vue";

import clearHTML from "../../../utils/clearHTML";
import { getTagModel } from "../../../models";

export default function useOption(props) {
  // ================ DATA ================

  const isHover = ref(false);

  // ================ REFS ================

  const elOption = ref(null);

  // ================ INJECT ================

  const appTags = inject("appTags");
  const appProps = inject("appProps");
  const appStashTag = inject("appStashTag");
  const appEeditTagIndex = inject("appEeditTagIndex");

  const appReFocus = inject("appReFocus");
  const appNextReFocusDontInit = inject("appNextReFocusDontInit");

  const appUpdateTag = inject("appUpdateTag");
  const appSetStashTag = inject("appSetStashTag");
  const appSetStashTagToTags = inject("appSetStashTagToTags");

  const dropdownProps = inject("dropdownProps");
  const dropdownIsDown = inject("dropdownIsDown");
  const dropdownGetTitleInnerHTML = inject("dropdownGetTitleInnerHTML");
  const dropdownClassList = inject("dropdownClassList");

  // ============== COMPUTED ==============

  const isDisabled = computed(() => {
    if (props.title == true) {
      return props.disabled;
    }
    return props.disabled || dropdownProps.disabled || appProps.disabled;
  });

  const isDuplicate = computed(() => {
    return appTags.find((tag) => {
      return (
        tag != undefined &&
        tag.key == dropdownProps.value &&
        tag.value == props.value
      );
    })
      ? true
      : false;
  });

  const isHide = computed(() => {
    const isTitle = props.title;
    // 已被選取
    if (isDuplicate.value == true) {
      return true;
    }

    // 編輯模式
    if (appEeditTagIndex.value != -1) {
      if (isTitle) {
        return true;
      }
      return appStashTag.key != dropdownProps.value ? true : false;
    }

    // dropdown 已全部選擇過 且未啟用custom
    if (dropdownIsDown.value == true) {
      return true;
    }

    // 一般選擇情境
    if (appStashTag.key != undefined) {
      if (appStashTag.key != dropdownProps.value) {
        return true;
      } else {
        return isTitle ? true : false;
      }
    }

    return false;
  });

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
    if (isDisabled.value) return;
    if (!props.title && props.value == "") return;

    // 編輯模式
    if (appEeditTagIndex.value != -1) {
      appUpdateTag({
        valueElm: innerHTML.value,
        value: props.value,
      });
      appReFocus();
      return;
    }

    appSetStashTag(prototypeStashTag.value);

    if (prototypeStashTag.value.valueElm != null) {
      appSetStashTagToTags();
    } else {
      appNextReFocusDontInit();
    }
    appReFocus();
  };

  onMounted(() => {
    if (props.selected == true && isDuplicate.value == false) {
      handleClick();
    }
  });

  return {
    elOption,

    props,
    isDisabled,
    isHover,
    isHide,

    handleClick,
  };
}
