import { ref, computed, watch, nextTick } from "vue";

export default function useStatus(props, context, dep) {
  // console.log("function useStatus");
  // console.log("props =", props);
  // console.log("context =", context);

  // ============== REFS ==============

  const elApp = dep.elApp;

  // ============== DATA ==============

  const tags = dep.tags;

  const isEditMode = dep.isEditMode;

  const elDropdownDisplay = dep.elDropdownDisplay;

  const isSelectDown = ref(false);

  // ============== COMPUTED ==============

  const appIsFinish = dep.appIsFinish;

  // ============== WATCH ==============

  watch(tags, async () => {
    await nextTick();

    const options = elApp.value.querySelectorAll(".dropdown .option");
    isSelectDown.value = options.length == 0;
  });

  // ============== COMPUTED ==============

  const status = computed(() => {
    const result = [];
    if (props.disabled == true) result.push("disabled");
    if (props.loading == true) result.push("loading");
    if (isEditMode.value == true) result.push("editing");
    if (elDropdownDisplay.value == true) result.push("selecting");
    if (appIsFinish.value == true) result.push("finish");
    if (appIsFinish.value == false && isSelectDown.value == true)
      result.push("delect-down");
    return result;
  });

  context.emit("status", status);

  return {
    status,
  };
}
