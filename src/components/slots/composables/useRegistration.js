import { ref, watch, inject, onMounted, onBeforeUnmount } from "vue";
import clearHTML from "../../../utils/clearHTML";

export default function useRegistration(props, context, dep) {
  // ============== DATA ================

  const isDuplicateOption = ref(false);

  // ============== METHODS ================

  const getInnerHTML = () => {
    const elOption = dep.elOption;
    if (elOption.value == null) {
      return null;
    }
    return clearHTML(elOption.value.innerHTML);
  };

  onMounted(() => {
    const dropdown = dep.dropdown;
    if (dropdown.props.system == true) {
      return;
    }
    const value = props.title == true ? dropdown.props.value : props.value;
    const registrationName = value + "_" + getInnerHTML();

    if (dropdown.optionStatus[registrationName] != undefined) {
      isDuplicateOption.value = true;
      const log = inject("log");
      const log2 = inject("log2");
      log(
        `option onMounted`,
        `Duplicate ${
          props.title ? "title" : ""
        } options! last option will be forced to be hidden.`,
        `error`
      );
      log2(`dropdown key:${dropdown.props.value}`);
      log2(`value:${value}`);
      return;
    }

    dropdown.optionStatus[registrationName] = {
      isTitle: props.title,
      isHidden: false,
      isSelected: false,
      isBeSearched: false,
    };

    const isHidden = dep.isHidden;
    const isSelected = dep.isSelected;
    const isSearchable = dep.isSearchable;

    watch(
      isHidden,
      (value) => {
        dropdown.optionStatus[registrationName].isHidden = value;
      },
      { immediate: true }
    );

    watch(
      isSelected,
      (value) => {
        dropdown.optionStatus[registrationName].isSelected = value;
      },
      { immediate: true }
    );

    watch(
      isSearchable,
      (value) => {
        dropdown.optionStatus[registrationName].isBeSearched = value;
      },
      { immediate: true }
    );

    onBeforeUnmount(() => {
      delete dropdown.optionStatus[registrationName];
    });
  });

  return { isDuplicateOption };
}
