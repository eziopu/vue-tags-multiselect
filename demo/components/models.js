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
  dropdownLoading: false,
  search: true,
  transition: true,
  create: true,
  merge: true,
  debugLog: false,
  conjunction: "",
  tagPosition: "",
  deleteIcon: "always",
  placeholder: "",
  placeholders: {
    initial: "",
    loading: "",
    selectDown: "",
    finish: "",
    tagValueRepeat: "",
  },
}

export const PACKAGE_EVENT = {
  result: {},
  status: [],
  selectingTag: {},
  inputValue: "",
  editing: {},
}

export const PACKAGE_SLOTS = {
  tagConjunction: "",
  loading: "",
  optionUndo: "",
  optionORConjunction: "",
  dropdownLoading: "",
}

export const PACKAGE_V_DROPDOWN_PROPS = {
  isDisplayForDemo: true, // for show code
  value: "",
  disabled: false,
  divided: false,
  displayAll: false,
  hidden: false,
  custom: false,
}

export const PACKAGE_V_OPTION_PROPS = {
  isDisplayForDemo: true, // for show code
  valueForDemo: "",
  title: false,
  value: "",
  displayValue: false,
  disabled: false,
  divided: false,
  selected: false,
}

export const DEMO_SETTING = {
  props: PACKAGE_PROPS,
  slots: PACKAGE_SLOTS,
  event: PACKAGE_EVENT,
  option: {
    country: generate_v_options(['', 'Māre', 'Eldia']),
    name: generate_v_options(['', 'Grisha Yeager', 'Eren Yeager', 'Armin Arlert']),
    remark: generate_v_options(['', 'yes', 'no']),
  },
  dropdown: {
    country: { ...PACKAGE_V_DROPDOWN_PROPS, ...{ value: 'country' } },
    name: { ...PACKAGE_V_DROPDOWN_PROPS, ...{ value: 'name' } },
    remark: { ...PACKAGE_V_DROPDOWN_PROPS, ...{ value: 'remark', displayAll: true}},
  },
}

function generate_v_options(values = [""]) {
  return Array.from({ length: values.length }, (_value, index) => {
    if (index == 0) {
      return { ...PACKAGE_V_OPTION_PROPS, ...{ title: true } };
    }
    return { ...PACKAGE_V_OPTION_PROPS, ...{ 
      value: values[index],
      valueForDemo: values[index]
    }};
  });
}

function deep_clone(input) {
  return JSON.parse(JSON.stringify(input));
}

export function merge_v_dropdowns(inputs = {}) {
  let dropdowns = deep_clone(DEMO_SETTING.dropdown);
  // dropdowns = {country: {}, ...}

  Object.entries(dropdowns).forEach(dropdown => {
    const [key, value] = dropdown;
    // value = {...}

    if (inputs[key] != undefined) {
      dropdowns[key] = { ...value, ...inputs[key] }
    }
  });

  return dropdowns;
}

// :option="{
// country: [{}, { selected: true }, { selected: true }],
//       }"
export function merge_v_options(inputs = [{}]) {
  let options = deep_clone(DEMO_SETTING.option);
  // options = {country: [], ...}

  Object.entries(options).forEach(option => {
    const [key, value] = option;
    // value = [{...}, {...}, ...]

    if (inputs[key] != undefined) {
      for (let index = 0; index < value.length; index++) {
        options[key][index] = {...value[index], ...inputs[key][index]}
      }
    }
  });

  return options;
}