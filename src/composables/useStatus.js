import { computed, watch } from "vue";

export default function useStatus(props, context, dep) {
  // ============== DATA ==============

  const elInputValue = dep.elInputValue;

  const isEditMode = dep.isEditMode;

  const isElDropdownVisible = dep.isElDropdownVisible;

  // ============== COMPUTED ==============
  const appIsFinish = dep.appIsFinish;

  const isAllDropdownIsDown = dep.isAllDropdownIsDown;

  const status = computed(() => {
    const result = [];
    if (props.disabled == true) result.push("disabled");
    if (props.loading == true) result.push("loading");
    if (elInputValue.value != "" && props.search == true) {
      result.push("searching");
    }
    if (isEditMode.value == true) {
      result.push("editing");
    }
    if (isElDropdownVisible.value == true) result.push("selecting");
    if (appIsFinish.value == true) {
      result.push("finish");
    }
    if (appIsFinish.value == false && isAllDropdownIsDown.value == true) {
      result.push("delect-down");
    }
    return result;
  });

  // ============== EMIT ==============

  context.emit("status", status);

  // ============== LOG ==============

  const returnLogs = {
    searching: "searching",
    editing: "edit the tag",
    finish: "app is done",
    "delect-down": "the options have been selected",
  };

  watch(status, (newValue, oldValue) => {
    Object.keys(returnLogs).forEach((key) => {
      if (newValue.indexOf(key) != -1 && oldValue.indexOf(key) == -1) {
        dep.log(returnLogs[key]);
      }
    });
  });

  return {
    status,
  };
}
