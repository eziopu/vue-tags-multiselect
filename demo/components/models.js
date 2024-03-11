export const THEMES = ["default", "bootstrap", "semantic-ui"];

export const DATAS = [
  {
    id: 0,
    country: "Māre",
    name: "Grisha Yeager",
    height: 15,
    remark: "",
  },
  {
    id: 2,
    country: "Eldia",
    name: "Eren Yeager",
    height: 15,
    remark: "Free!",
  },
  {
    id: 0,
    country: "Eldia",
    name: "Armin Arlert",
    height: 60,
    remark: "",
  },
  {
    id: 1,
    country: "Māre",
    name: "Zeke Yeager",
    height: 17,
    remark: "Good at acting",
  },
  {
    id: 3,
    country: "Māre",
    name: "Lara Tybur",
    height: 15,
    remark: "",
  },
  {
    id: 4,
    country: "Māre",
    name: "Annie Leonhart",
    height: 14,
    remark: "",
  },
  {
    id: 5,
    country: "Māre",
    name: "Reiner Braun",
    height: 15,
    remark: "Sit down",
  },
  {
    id: 6,
    country: "Māre",
    name: "Pieck Finger",
    height: 4,
    remark: "",
  },
  {
    id: 7,
    country: "Māre",
    name: "Porco Galliard",
    height: 5,
    remark: "",
  },
  {
    id: 8,
    country: "Eldia",
    name: "Levi Ackerman",
    height: 1.6,
    remark: "",
  },
];

export const PACKAGE_PROPS = {
  disabled: false,
  loading: false,
  search: true,
  transition: true,
  create: true,
  merge: true,
  debugLog: false,
  conjunction: "",
  deleteIcon: "always",
  placeholder: "",
  placeholders: {
    initial: "",
    loading: "Wait a moment, please.",
    selectDown: "Selected End.",
    finish: "Finish.",
    tagValueRepeat: "",
  },
  dropdownLoading: false,
  tagConjunction: "",
  loadingContent: "",
  dropdownLoadingContent: "",
  optionUndoContent: "",
  optionORConjunctionContent: "",
}

export const PACKAGE_EVENT = {
  result: [],
  status: [],
  selectingTag: {},
  inputValue: "",
  editing: {},
}

export const PACKAGE_V_DROPDOWN_PROPS = {
  isDisplayForDemo: false, // for show code
  disabled: false,
  divided: false,
  displayAll: false,
  hidden: false,
  custom: false,
}

export const PACKAGE_V_OPTION_PROPS = {
  isDisplayForDemo: false, // for show code
  displayValue: false,
  disabled: false,
  divided: false,
  selected: false,
}

export const DEMO_SETTING = {
  props: PACKAGE_PROPS,
  event: PACKAGE_EVENT,
  option: {
    country: generate_v_options(3),
    name: generate_v_options(4),
    remark: generate_v_options(3),
  },
  dropdown: {
    country: PACKAGE_V_DROPDOWN_PROPS,
    name: PACKAGE_V_DROPDOWN_PROPS,
    remark: PACKAGE_V_DROPDOWN_PROPS,
  },
}

function generate_v_options(number) {
  return Array.from({ length: number }, () => ({ ...PACKAGE_V_OPTION_PROPS }));
}