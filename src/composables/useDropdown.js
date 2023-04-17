import { ref, reactive, computed, watch, nextTick, provide } from "vue";

export default function useDropdown(props, _context, dep) {
  // ================ REFS ================

  const elDropdown = ref(null);

  const elApp = dep.elApp;

  const elMain = dep.elMain;

  // ================ REFS DATA ================

  const elDropdownLeft = ref(0);

  // ================ DATA ================

  const editTagIndex = dep.editTagIndex;

  const appIsActive = dep.isActive;

  const dropdownStatus = reactive({});

  // =============== PROVIDE ==============

  provide("appDropdownStatus", dropdownStatus);

  // ============== COMPUTED ==============

  const elDropdownDisplay = computed(() => {
    return props.disabled == false && appIsActive.value == true;
  });

  // ============== WATCH ==============

  watch(editTagIndex, async (value) => {
    if (value != -1) {
      await nextTick();

      let offset = 0;
      const editDiv = elApp.value.querySelector(
        ".tags .tag.editing .tag__value.editing"
      );
      if (editDiv != undefined) {
        const elMainLeft = elMain.value.getBoundingClientRect().left || 0;
        const editLeft = editDiv.getBoundingClientRect().left || 0;
        offset = editLeft - elMainLeft || 0;
      }
      elDropdownLeft.value = offset;
    } else {
      elDropdownLeft.value = 0;
    }
  });

  return {
    elDropdown,
    elDropdownLeft,
    elDropdownDisplay,

    dropdownStatus,
  };
}
