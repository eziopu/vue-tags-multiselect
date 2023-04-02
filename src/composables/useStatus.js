import { provide, computed, readonly } from "vue";

export default function useStatus(props, _context, dep) {
  // console.log("function useStatus");
  // console.log("props =", props);
  // console.log("context =", context);

  // ============ DEPENDENCIES ============

  const isLock = computed(() => {
    return props.loading == true || props.disabled == true;
  });

  const isEditMode = dep.isEditMode;

  // ============== COMPUTED ==============

  const status = computed(() => {
    const result = [];
    if (props.disabled == true) result.push("disabled");
    if (props.loading == true) result.push("loading");
    if (isEditMode.value == true) result.push("editing");
    // if (displayDropdown == true) result.push("selecting");
    // if (isFinish == true) result.push("finish");
    // if (isFinish == false && isSelectDown == true) result.push("delect-down");
    return result;
  });

  // =============== METHODS ==============

  provide("appIsLock", readonly(isLock));

  return {
    status,
  };
}
