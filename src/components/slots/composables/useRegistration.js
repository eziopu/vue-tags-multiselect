import { ref, watch, inject, onMounted, onBeforeUnmount } from "vue";
import clearHTML from "../../../utils/clearHTML";

export default function useRegistration(props, _context, dep) {
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

  const dropdownProps = inject("dropdownProps") || {};
  const dropdownOptionStatus = inject("dropdownOptionStatus") || {};
  onMounted(() => {
    if (dropdownProps.system == true) {
      return;
    }
    const value = props.title == true ? dropdownProps.value : props.value;
    const registrationName = value + "_" + getInnerHTML();

    if (dropdownOptionStatus[registrationName] != undefined) {
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
      log2(`dropdown key:${dropdownProps.value}`);
      log2(`value:${value}`);
      return;
    }

    dropdownOptionStatus[registrationName] = {
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
        dropdownOptionStatus[registrationName].isHidden = value;
      },
      { immediate: true }
    );

    watch(
      isSelected,
      (value) => {
        dropdownOptionStatus[registrationName].isSelected = value;
      },
      { immediate: true }
    );

    watch(
      isSearchable,
      (value) => {
        dropdownOptionStatus[registrationName].isBeSearched = value;
      },
      { immediate: true }
    );

    onBeforeUnmount(() => {
      delete dropdownOptionStatus[registrationName];
    });
  });

  return { isDuplicateOption };
}
