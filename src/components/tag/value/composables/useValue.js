import { ref, inject, computed, watch, nextTick } from "vue";
import { TAG_INPUT_FOCUS } from "../../../../timeouts.js";

export default function useValue(props, _context, dep) {
  // ================ REF ================

  const elInput = dep.elInput;

  const elTagValueContent = ref(null);

  // ================ DATA ================

  const inputValue = dep.inputValue;

  // In order to tag, if the Keydown event is passed during input editing, execute the app's Keydown again.
  const keydownHorizontalLock = ref(false);

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
      return;
    }
    if (props.tag.custom == true) {
      keydownHorizontalLock.value = true;
      inputValue.value = JSON.parse(JSON.stringify(props.tag.value));
      await nextTick();
      setTimeout(() => {
        elInput.value.focus();
      }, TAG_INPUT_FOCUS);
    } else {
      await nextTick();
      elTagValueContent.value.focus();
    }
  });

  watch(
    () => props.tag.value,
    (value) => {
      inputValue.value = JSON.parse(JSON.stringify(value));
    },
    { immediate: true }
  );

  // ============== METHODS ==============

  const appSetStashTag = inject("appSetStashTag");

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

  return {
    appProps,
    appIsLock,
    elTagValueContent,
    inputValue,
    editByinput,
    editMyself,
    noCustomeHoverAndEditMyself,
    keydownHorizontalLock,

    handleClick,
  };
}
