import { ref, inject, computed, watch, nextTick } from "vue";

export default function useValue(props, _context, dep) {
  // ================ REF ================

  const elInput = dep.elInput;

  const elTagValueContent = ref(null);

  // ================ DATA ================

  const inputValue = dep.inputValue;

  // ================ INJECT ================

  const appProps = inject("appProps");
  const appEnable = inject("appEnable");
  const appIsLock = inject("appIsLock");
  const appElInputValue = inject("appElInputValue");
  const appEditTagIndex = inject("appEditTagIndex");

  // ============== COMPUTED ==============

  const editMyself = computed(() => {
    return appEditTagIndex.value == props.tag.index;
  });

  const noCustomeHoverAndEditMyself = computed(() => {
    if (appIsLock.value) return false;
    return editMyself.value == true && props.tag.custom == false;
  });

  const editByinput = computed(() => {
    return props.tag.custom == true && editMyself.value == true;
  });

  // ============== WATCH ==============

  watch(editMyself, async (value) => {
    if (value == false) {
      inputValue.value = "";
      return;
    }

    await nextTick();
    if (props.tag.custom == true) {
      inputValue.value = props.tag.value;
      elInput.value.focus();
    } else {
      elTagValueContent.value.focus();
    }
  });

  // ============== METHODS ==============

  const appBlur = inject("appBlur");
  const appSetStashTag = inject("appSetStashTag");
  const appIsActiveToFalse = inject("appIsActiveToFalse");

  const handleClick = (event) => {
    event.preventDefault();
    if (appIsLock.value == true) return;

    if (editMyself.value == false) {
      appEditTagIndex.value = props.tag.index;
      appElInputValue.value = "";
      appSetStashTag(props.tag);
      appEnable();
    }
  };

  const elDivBlur = () => {
    appIsActiveToFalse();
    console.log("elDivBlur", props.tag.value);
    appBlur();
  };

  return {
    appProps,
    appIsLock,
    elTagValueContent,
    inputValue,
    editByinput,
    editMyself,
    noCustomeHoverAndEditMyself,

    handleClick,
    elDivBlur,
  };
}
