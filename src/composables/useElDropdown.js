import { ref, reactive, computed, watch, nextTick } from "vue";

export default function useElDropdown(props, _context, dep) {
  // ============== REFS ================

  const elDropdown = ref(null);

  const elApp = dep.elApp;

  const elMain = dep.elMain;

  // ============== DATA ================

  const appIsActive = dep.isActive;

  const isTagPositionVisible = dep.isTagPositionVisible;

  const editTagIndex = dep.editTagIndex;

  const stashTag = dep.stashTag;

  const dropdownStatus = dep.dropdownStatus;  

  // ============== COMPUTED ==============

  const isAllDropdownIsDown = dep.isAllDropdownIsDown;
  const isAllDropdownIsHidden = dep.isAllDropdownIsHidden;

  const isUndoOptionVisible = dep.isUndoOptionVisible;
  const isORConjunctionOptionVisible = dep.isORConjunctionOptionVisible;

  const isAllOptionIsHidden = computed(() => {
    if (
      isORConjunctionOptionVisible.value == true ||
      isUndoOptionVisible.value == true
    ) {
      return false;
    }
    return isAllDropdownIsHidden.value;
  });

  const isElDropdownVisible = computed(() => {
    if (editTagIndex.value != -1) {
      if (stashTag.key == null) {
        return false;
      }
      const status = dropdownStatus[stashTag.key];
      if (status == undefined) {
        return false;
      } else {
        return status.isAllOptionSelected == true ? false : true;
      }
    }

    if (isAllOptionIsHidden.value == true) {
      return false;
    }

    if (isAllDropdownIsDown.value == true) {
      return false;
    }

    return props.disabled == false && appIsActive.value == true;
  });


  // == elDropdownStyle ==============

  const elDropdownStyle = reactive({
    top: '90%',
    left: '0px'
  });

  watch(editTagIndex, async (value) => {
    let leftOffset = 0;
    let topOffset = 22;

    if (value != -1) {
      await nextTick();
      const editDiv = elApp.value.querySelector(
        ".tags .tag.editing .tag__value.editing"
      );

      if (editDiv != undefined) {
        const elMainRect = elMain.value.getBoundingClientRect();
        const elEditRect = editDiv.getBoundingClientRect();

        // left
        const elMainLeft = elMainRect.left || 0;
        const elEditLeft = elEditRect.left || 0;
        leftOffset = elEditLeft - elMainLeft || 0;

        // top
        if (isTagPositionVisible.value == true) {
          const elMainTop = elMainRect.top || 0;
          const elEditBottom = elEditRect.bottom || 0;
          topOffset = elEditBottom - elMainTop || 0;
        }
      }
      
    }

    elDropdownStyle.left = `${leftOffset}px`;
    elDropdownStyle.top = `${topOffset}px`;
  });

  return {
    elDropdown,
    elDropdownStyle,

    isElDropdownVisible,
  };
}
