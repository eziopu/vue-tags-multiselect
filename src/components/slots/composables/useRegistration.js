import { watch, onMounted, onBeforeUnmount } from "vue";
import clearHTML from "../../../utils/clearHTML";

export default function useRegistration(props, context, dep) {
  // ================= Option status ====================

  const isNoValue = props.value == null || props.value == "";

  const isCustom = () => {
    if (isNoValue == true && props.title == false) {
      if (context.slots.default().length >= 1) {
        return true;
      }
    }
    return false;
  };

  const getInnerHTML = () => {
    const elOption = dep.elOption;
    if (elOption.value == null) {
      return null;
    }
    return clearHTML(elOption.value.innerHTML);
  };

  onMounted(() => {
    let registrationName = props.value;
    if (isNoValue == true && isCustom() == true) {
      registrationName = getInnerHTML();
    }

    if (registrationName != "") {
      console.log(registrationName);
      const dropdown = dep.dropdown;
      if (dropdown.props.system == false) {
        dropdown.optionStatus[registrationName] = { isSelected: false };

        const isSelected = dep.isSelected;
        watch(
          isSelected,
          (value) => {
            dropdown.optionStatus[registrationName].isSelected = value;
          },
          { immediate: true }
        );

        onBeforeUnmount(() => {
          delete dropdown.optionStatus[registrationName];
        });
      }
    }
  });

  return {};
}
