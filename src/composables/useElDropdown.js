import { ref, reactive, computed, watch, nextTick } from "vue";

export default function useElDropdown(props, context, dep) {
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
  // ============== REFS ================

  const elDropdown = ref(null);

  const elApp = dep.elApp;

  const elControls = dep.elControls;

  // ============== DATA ================

  const elDropdownStyle = reactive({
    top: '0px',
    left: '0px'
  });

  watch(editTagIndex, async (value) => {
    await nextTick();
    
    const elControlsRect = elControls.value.getBoundingClientRect();
    let topOffset = elControlsRect.height || 0;
    let leftOffset = 0;

    if (value != -1) {
      const editTag = elApp.value.querySelector(
        ".v-tags-multiselect__tags .v-tag.editing .v-tag__value.editing"
      );

      if (editTag != undefined) {
        const elTagRect = editTag.getBoundingClientRect();

        // left
        const elControlsLeft = elControlsRect.left || 0;
        const elEditLeft = elTagRect.left || 0;
        leftOffset = elEditLeft - elControlsLeft || 0;

        // top
        if (isTagPositionVisible.value == true) {
          const elControlsTop = elControlsRect.top || 0;
          const elEditBottom = elTagRect.bottom || 0;
          topOffset = elEditBottom - elControlsTop || 0;
        }
      }
    }

    elDropdownStyle.left = `${leftOffset}px`;
    elDropdownStyle.top = `${topOffset}px`;
  }, { immediate: true });
  
  context.emit("visible-change", isElDropdownVisible);

  return {
    elDropdown,
    elDropdownStyle,

    isElDropdownVisible,
  };
}
