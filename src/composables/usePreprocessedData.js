import { reactive, computed, provide, readonly } from "vue";

export default function usePreprocessedData(props) {
  // ================= Dropdown status ====================
  // ============== DATA ================

  const dropdownStatus = reactive({});

  const getRequestOptionClickModel = () => {
    return { key: "", value: "" };
  };
  const requestOptionClick = reactive(getRequestOptionClickModel());

  // ============== PROVIDE ==============

  provide("appRequestOptionClick", requestOptionClick);
  provide("appRequestOptionClickInit", () => {
    Object.assign(requestOptionClick, getRequestOptionClickModel());
  });
  provide("appDropdownStatus", dropdownStatus);

  // ============== COMPUTED ================
  const isAllDropdownIsDown = computed(() => {
    // const dropdownStatus = { country: { isDown: true, isAllOptionSelected: true }, country2: { isDown: false, isAllOptionSelected: false }, ... } (reactive)
    return Object.values(dropdownStatus).every((status) => status.isDown);
  });

  // ================= App status ====================
  // ============== COMPUTED ================
  const appIsLock = computed(() => {
    return props.loading == true || props.disabled == true;
  });

  const appIsFinish = computed(() => {
    return isAllDropdownIsDown.value == true && props.create == false;
  });

  // ============== PROVIDE ==============

  provide("appIsLock", readonly(appIsLock));

  return {
    dropdownStatus,
    isAllDropdownIsDown,

    appIsLock,
    appIsFinish,
  };
}
