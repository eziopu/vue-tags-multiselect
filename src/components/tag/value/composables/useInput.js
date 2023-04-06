import { ref, computed, watch } from "vue";

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

  const deleteTag = dep.deleteTag;

  const elInputDelete = () => {
    if (nextWillDelete.value == true) {
      deleteTag();
    } else if (inputValue.value == "") {
      nextWillDelete.value = true;
    }
  };
  const elInputBlur = () => {
    if (inputValue.value == "") {
      deleteTag();
    }
  };

  const elInputEnter = () => {
    if (inputValue.value == "") {
      deleteTag();
    } else {
      // if (appKeydown.UDIndex == -1) {
      //   appSetTagToTags(inputValue.value);
      // }
    }
  };

  return {
    elInput,
    inputValue,
    inputWidth,
    nextWillDelete,

    elInputEnter,
    elInputDelete,
    elInputBlur,
  };
}
