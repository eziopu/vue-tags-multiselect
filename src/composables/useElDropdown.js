import { ref, computed, watch, nextTick } from "vue";

export default function useElDropdown(props, _context, dep) {
  // ============== REFS ================

  const elDropdown = ref(null);

  const elApp = dep.elApp;

  const elMain = dep.elMain;

  // ============== REFS DATA ================

  const elDropdownLeft = ref(0);

  // ============== DATA ================

  const appIsActive = dep.isActive;

  const editTagIndex = dep.editTagIndex;

  const stashTag = dep.stashTag;

  const dropdownStatus = dep.dropdownStatus;

  // ============== COMPUTED ==============

  const isAllDropdownIsDown = dep.isAllDropdownIsDown;

  const isElDropdownVisible = computed(() => {
    if (isAllDropdownIsDown.value == true) {
      return false;
    }

    if (editTagIndex.value != -1) {
      if (stashTag.key == null) {
        return false;
      }
      const status = dropdownStatus[stashTag.key];
      if (status == undefined) {
        return false;
      }
      if (status != undefined && status.isAllOptionSelected == true) {
        return false;
      }
    }

    return props.disabled == false && appIsActive.value == true;
  });

  // ============== WATCH ==============

  watch(editTagIndex, async (value) => {
    let offset = 0;

    if (value != -1) {
      await nextTick();
      const editDiv = elApp.value.querySelector(
        ".tags .tag.editing .tag__value.editing"
      );
      if (editDiv != undefined) {
        const elMainLeft = elMain.value.getBoundingClientRect().left || 0;
        const editLeft = editDiv.getBoundingClientRect().left || 0;
        offset = editLeft - elMainLeft || 0;
      }
    }

    elDropdownLeft.value = offset;
  });

  return {
    elDropdown,
    elDropdownLeft,
    isElDropdownVisible,
  };
}
