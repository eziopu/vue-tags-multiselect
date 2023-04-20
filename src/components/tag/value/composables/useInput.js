import { ref, computed, watch, inject } from "vue";

export default function useDelete(props, _context, dep) {
  // ================ REF ================

  const elInput = ref(null);

  // ================ DATA ================

  const inputValue = ref("");

  const nextWillDelete = ref(false);

  // ============== COMPUTED ==============

  const inputWidth = computed(() => {
    return (inputValue.value.length || 2) + 1 + "em";
  });

  // ============== WATCH ==============

  watch(inputValue, (value) => {
    if (value != "") {
      nextWillDelete.value = false;
    }
  });

  // ============== METHODS ==============

  const appBlur = inject("appBlur");
  const deleteTag = dep.deleteTag;
  const elInputBlur = () => {
    if (inputValue.value == "") {
      deleteTag();
    }
    appBlur();
  };

  const elInputFocus = (event) => {
    const selectionStart = event.target.selectionStart;
    if (selectionStart == 0 || selectionStart == inputValue.value.length) {
      nextWillDelete.value = false;
    }
  };

  return {
    elInput,
    inputValue,
    inputWidth,
    nextWillDelete,

    elInputFocus,
    elInputBlur,
  };
}
