import { toRefs, ref, reactive } from "vue";

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
  };
}
