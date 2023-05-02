import { reactive, computed, provide } from "vue";

export default function usePreprocessedData(props) {
  // ================= Dropdown status ====================
  // ============== DATA ================

  const dropdownStatus = reactive({});

  // ============== PROVIDE ==============

  provide("appDropdownStatus", dropdownStatus);

  // ============== COMPUTED ================
  const isAllDropdownIsDown = computed(() => {
    // const dropdownStatus = { "country": { "isDown": true }, "country2": { "isDown": false }, "country333": { "isDown": false } } (reactive)
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

  return {
    dropdownStatus,
    isAllDropdownIsDown,

    appIsLock,
    appIsFinish,
  };
}
