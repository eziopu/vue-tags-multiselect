import { ref, computed } from "vue";

import { getTagModel } from "../../../models";

import clearHTML from "../../../utils/clearHTML";

export default function useDropdown(props, context, dep) {
  // ============== REFS ==============

  const elOption = ref(null);

  // ============== INJECTs ================

  const app = dep.app;

  const dropdown = dep.dropdown;

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
    result.custom = dropdown.props.custom;
    result.classList = dropdown.classList.value;
    result.displayValue = props.displayValue;

    if (props.title) {
      result.key = dropdown.props.value;
      result.titleElm = innerHTML.value;
    } else {
      result.key = dropdown.props.value;
      result.titleElm = dropdown.getTitleInnerHTML.value;
      result.value = props.value;
      result.valueElm = innerHTML.value;
    }
    return result;
  });

  const handleClick = () => {
    if (isDisabled) return;
    if (!props.title && props.value == "") {
      const slotContent = context.slots.default();
      if (
        slotContent &&
        slotContent.length > 0 &&
        typeof slotContent[0].props.onClick == "function"
      ) {
        slotContent[0].props.onClick();
      }
      return;
    }

    // 編輯模式
    if (app.editTagIndex.value != -1) {
      app.updateTag(prototypeStashTag.value);
      app.reFocus();
      return;
    }

    if (prototypeStashTag.value.valueElm != null) {
      app.setTagToTags(prototypeStashTag.value);
      app.setStashTag();
    } else {
      app.setStashTag(prototypeStashTag.value);
      app.nextReFocusDontInit();
    }
    app.reFocus();
  };

  return {
    elOption,
    innerHTML,
    handleClick,
  };
}
