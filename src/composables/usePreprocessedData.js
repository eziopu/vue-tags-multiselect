import { reactive, provide } from "vue";

export default function usePreprocessedData() {
  // ==================== Dropdown status ====================
  // ================ DATA ================

  const dropdownStatus = reactive({});

  // =============== PROVIDE ==============

  provide("appDropdownStatus", dropdownStatus);

  // =============== METHODS ==============

  const isAllDropdownIsDown = () => {
    // const dropdownStatus = { "country": { "isDown": true }, "country2": { "isDown": false }, "country333": { "isDown": false } } (reactive)
    return Object.values(dropdownStatus).every((status) => status.isDown);
  };

  return {
    dropdownStatus,
    isAllDropdownIsDown,
  };
}
