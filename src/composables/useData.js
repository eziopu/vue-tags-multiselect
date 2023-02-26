import { toRefs, ref, reactive, computed } from "vue";

export default function useData(props) {
  console.log("useData.js", props);

  const { modelValue } = toRefs(props);

  // ================ DATA ================

  // internalValue
  const iv = "single";

  const isFirstFocus = ref(false);
  const isFocus = ref(false);
  const isFocusResetCurrentFilter = ref(true);
  const optionHoverByMouse = ref(false);
  const inputValue = ref("");
  const apply = reactive({
    clickByKeyName: "",
    clickPushValue: "",
  });
  const edit = reactive({
    index: -1,
    key: "",
    value: "",
  });
  const current = reactive({
    tag: {},
    conjunction: "",
    selectUDIndex: -1,
    selectLRIndex: -1,
    lockKeydownLR: false,
  });
  const dropdown = reactive({
    style: { left: "0px" },
    count: 0,
    optionCount: 0,
    customs: {},
    isFinishs: {},
    optionCounts: {},
    optionDisplaies: {},
  });
  const tags = ref([]);
  const tagsGroupByTitleKey = ref([]);
  const firstPlaceholder = props.placeholder;


  // ============== COMPUTED ==============

  const isLock = computed(() => {
    return props.loading == true || props.disabled == true;
  });
  const isSearchMode = computed(() => {
    return props.search == true && inputValue.value != "";
  });
  const isEditMode = computed(() => {
    return edit.key != "" || edit.index != -1;
  });
  const isSelectDown = computed(() => {
    if (haveCustomDrodown.value == true || dropdown.count == 0) {
      return false;
    }

    if (props.conjunction == "AND") {
      // return this.allDropdownKeyIsInTagsKeys();

    } else if (
      this.optionDisplayCountAddSystem == 0 &&
      this.allDropdownIsFinish() == true
    ) {
      return true;
    }

    return false;
  });
  const isFinish = computed(() => {
    return isSelectDown.value == true && props.create == false;
  });
  const tagsNoUndefinedKeys = computed(() => {
    return this.tags.filter((tag) => {
      return tag.key != undefined;
    });
  });
  const tagsKeys = computed(() => {
    return [...new Set(tagsNoUndefinedKeys.value.map((tag) => tag.key))];
  });
  const haveCustomDrodown = computed(() => {
    const booleans = Object.values(dropdown.customs).flat();
    const count = booleans.filter(Boolean).length;
    return count == 0 ? false : true;
  });
  const haveOptionCanSelect = computed(() => {
    return optionDisplayCount.value != 0;
  });
  const inputPlaceholder = computed(() => {
    const {
      placeholder,
      firstPlaceholder, // data
      loadingPlaceholder,
      finishPlaceholder,
    } = this;
    const change = firstPlaceholder != placeholder && placeholder != "";
    if (change == true) return placeholder;

    if (this.loading == true) return loadingPlaceholder;
    if (this.isFinish == true) return finishPlaceholder;

    if (this.tags.length == 0 && !this.current.tag.key) {
      return placeholder;
    }
    return "";
  });
  const inputDisabled = computed(() => {
    return props.search == false && props.create == false;
  });
  const inputMaxlength = computed(() => {
    return isLock.value == true || inputDisabled.value == true ? 0 : 99;
  });
  const validatorConjunction = computed(() => {
    return props.conjunction == "OR" || props.conjunction == "AND";
  });
  const displayDropdown = computed(() => {
    return (
      props.disabled == false &&
      isFocus.value == true &&
      optionDisplayCountAddSystem.value != 0
    );
  });
  const displayUndo = computed(() => {
    return this.current.tag.key != undefined;
  });
  const displayORConjunction = computed(() => {
    if (
      this.isEditMode == true ||
      this.validatorConjunction == true ||
      this.dropdown.count == 0
    ) {
      return false;
    }

    const { tagsKeys, current } = this;
    return (
      tagsKeys.length >= 1 &&
      current.conjunction != "OR" &&
      current.tag.key == undefined &&
      this.allDropdownIsFinish() == false
    );
  });
  const optionDisplayCount = computed(() => {
    const booleans = Object.values(this.dropdown.optionDisplaies).flat();
    return booleans.filter(Boolean).length;
  });
  const optionDisplayCountAddSystem = computed(() => {
    let addSystem = optionDisplayCount.value;
    if (displayUndo.value == true) addSystem++; // undo
    if (displayORConjunction.value == true) addSystem++; // OR
    return addSystem;
  });

  /* istanbul ignore next */
  // externalValue
  console.log(modelValue);

  return {
    iv,

    isFirstFocus,
    isFocus,
    isFocusResetCurrentFilter,
    optionHoverByMouse,
    inputValue,
    apply,
    edit,
    current,
    dropdown,
    tags,
    tagsGroupByTitleKey,
    firstPlaceholder,

    // ============== COMPUTED ==============
    isLock,
    isSearchMode,
    isEditMode,
    isFinish,
    isSelectDown,
    tagsNoUndefinedKeys,
    tagsKeys,
    haveCustomDrodown,
    haveOptionCanSelect,
    inputPlaceholder,
    inputDisabled,
    inputMaxlength,
    validatorConjunction,
    displayDropdown,
    displayUndo,
    displayORConjunction,
    optionDisplayCount,
    optionDisplayCountAddSystem,
  }
}
