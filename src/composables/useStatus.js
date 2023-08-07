import { computed } from "vue";

export default function useStatus(props, context, dep) {
  // ============== DATA ==============

  const isEditMode = dep.isEditMode;

  const isElDropdownVisible = dep.isElDropdownVisible;

  // ============== COMPUTED ==============
  const appIsFinish = dep.appIsFinish;

  const isAllDropdownIsDown = dep.isAllDropdownIsDown;

  const status = computed(() => {
    const result = [];
    if (props.disabled == true) result.push("disabled");
    if (props.loading == true) result.push("loading");
    if (isEditMode.value == true) result.push("editing");
    if (isElDropdownVisible.value == true) result.push("selecting");
    if (appIsFinish.value == true) result.push("finish");
    if (appIsFinish.value == false && isAllDropdownIsDown.value == true)
      result.push("delect-down");
    return result;
  });

  // ============== EMIT ==============

  context.emit("status", status);

  return {
    status,
  };
}
