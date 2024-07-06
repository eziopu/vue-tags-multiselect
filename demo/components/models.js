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

function get_type(input) {
  if (Array.isArray(input)) return "Array";
  const type = typeof input;

  if (type == "string" && input.includes("=> void")) {
    return "Function"
  }
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function to_object(input, inputValue, supplyInputs = []) {
  return {
    type: get_type(input),
    default: input,
    value: inputValue,
    acceptedValues: supplyInputs,
  }
}

function to_detail_attributes(obj, supplyObj = {}) {
  const result = {};
  for (const key in obj) {
    const value = obj[key];
    result[key] = (typeof value === 'object' && Array.isArray(value) != true && value !== null)
      ? to_detail_attributes(value)
      : to_object(value, value, supplyObj[key])
  }
  return result;
}

//------------------------------------------------------------------------------
// ATTRIBUTES
//------------------------------------------------------------------------------
const ATTRIBUTE_VALIDATIONS = {
  merge: {
    condition: (attrs) => attrs.conjunction.value === 'AND',
    message: 'Attribute conjunction is "AND"'
  },
  tagConjunction: {
    condition: (attrs) => attrs.merge.value === false,
    message: 'Attribute merge is false'
  },
  'placeholders.loading': {
    condition: (attrs) => attrs.loading.value === false,
    message: 'Attribute loading is false'
  },
  'placeholders.selectDown': {
    condition: (attrs) => attrs.create.value === false,
    message: 'Attribute create is false'
  },
  'placeholders.finish': {
    condition: (attrs) => attrs.create.value === true,
    message: 'Attribute create is true'
  }
};

export const GET_ATTRIBUTE_INVALID_REASON = (keyName, attributes = {}) => {
  const validation = ATTRIBUTE_VALIDATIONS[keyName];
  return validation && validation.condition(attributes) ? validation.message : undefined;
};

export const GET_PACKAGE_ATTRIBUTES_DETAIL = () => {
  let result = to_detail_attributes(
    PACKAGE_ATTRIBUTES,
    {
      deleteIcon: ['always', 'edit', 'none'],
      tagPosition: ['null', 'top', 'bottom'],
      conjunction: ['null', 'OR', 'AND'],
    }
  )
  Object.keys(result.placeholders).forEach(key => {
    result.placeholders[key].value = '';
  });

  return result;
}

export const PACKAGE_ATTRIBUTES = {
  disabled: false,
  loading: false,
  dropdownLoading: false,
  search: true,
  transition: true,
  create: true,
  clearable: false,
  merge: true,
  keyboard: true,
  debugLog: false,
  conjunction: "null",
  tagPosition: "null",
  deleteIcon: "always",
  placeholder: "",
  placeholders: {
    initial: "",
    loading: "Wait a moment, please.",
    selectDown: "Selected End.",
    finish: "Finish.",
    tagValueRepeat: "repeat !",
  },
}

//------------------------------------------------------------------------------
// EVENTS
//------------------------------------------------------------------------------

export const GET_PACKAGE_EVENTS_DETAIL = () => {
  return {
    focus: to_object("() => void", 0),
    blur: to_object("() => void", 0),
    clear: to_object("() => void", 0),
    'input-value': to_object("(value: string) => void"),
    'visible-change': to_object("(visible: boolean) => void"),
    status: to_object("(status: array) => void", [], [
      "disabled",
      "loading",
      "searching",
      "editing",
      "selecting",
      "finish",
      "delect-down"
    ]),
    'remove-tag': to_object("(tag: object) => void", {}),
    'selecting-tag': to_object("(tag: object) => void", {}),
  }
}

export const PACKAGE_EVENTS = {
  focus: () => { },
  blur: () => { },
  clear: () => { },
  status: () => { },
  inputValue: (String) => { return String },
  visibleChange: (Boolean) => { return Boolean },
  removeTag: (Object) => { return Object },
  selectingTag: (Object) => { return Object },
}

//------------------------------------------------------------------------------
// EXPOSES
//------------------------------------------------------------------------------

export const GET_PACKAGE_EXPOSES_DETAIL = () => {
  return {
    focus: to_object("() => void"),
    blur: to_object("() => void"),
    clear: to_object("() => void"),
    clearTags: to_object("() => void"),
    initialize: to_object("() => void"),
    pushTag: to_object("(tag: object) => void"),
  }
}

//------------------------------------------------------------------------------
// SLOTS
//------------------------------------------------------------------------------

export const GET_PACKAGE_SLOTS_DETAIL = () => {
  let result = to_detail_attributes(PACKAGE_SLOTS);
  Object.keys(result).forEach(key => {
    result[key].value = '';
  });
  return result;
}

const demo__loading = '<div class="demo__loading"><i class="demo__loading--icon"></i></div>';
export const PACKAGE_SLOTS = {
  'v-tag-dropdown': '',
  'v-tag-option': '',
  tagConjunction: '&',
  loading: demo__loading,
  dropdownLoading: demo__loading,
  optionUndo: '<i class="demo__arrow-left"></i> Undo',
  optionORConjunction: 'OR',
}

//------------------------------------------------------------------------------
// V_DROPDOWN_PROPS
//------------------------------------------------------------------------------

export const GET_PACKAGE_V_DROPDOWN_PROPS_DETAIL = () => {
  // eslint-disable-next-line no-unused-vars
  const { isDisplayForDemo, ...rest } = PACKAGE_V_DROPDOWN_PROPS;
  return to_detail_attributes(rest);
}

export const PACKAGE_V_DROPDOWN_PROPS = {
  isDisplayForDemo: true, // for show code
  value: "",
  disabled: false,
  divided: false,
  displayAll: false,
  hidden: false,
  custom: false,
  class: [],
}

//------------------------------------------------------------------------------
// V_OPTION_PROPS
//------------------------------------------------------------------------------

export const GET_PACKAGE_V_OPTION_PROPS_DETAIL = () => {
  // eslint-disable-next-line no-unused-vars
  const { isDisplayForDemo, valueForDemo, ...rest } = PACKAGE_V_OPTION_PROPS;
  return to_detail_attributes(rest);
}

export const PACKAGE_V_OPTION_PROPS = {
  isDisplayForDemo: true, // for show code
  valueForDemo: "",
  value: "",
  title: false,
  displayValue: false,
  disabled: false,
  divided: false,
  selected: false,
  class: [],
}

export const DEMO_SETTING = {
  attributes: PACKAGE_ATTRIBUTES,
  slots: PACKAGE_SLOTS,
  events: PACKAGE_EVENTS,
  option: {
    country: generate_v_options(['', 'Māre', 'Eldia']),
    name: generate_v_options(['', 'Grisha Yeager', 'Eren Yeager', 'Armin Arlert']),
    remark: generate_v_options(['', 'yes', 'no']),
  },
  dropdown: {
    country: { ...PACKAGE_V_DROPDOWN_PROPS, ...{ value: 'country' } },
    name: { ...PACKAGE_V_DROPDOWN_PROPS, ...{ value: 'name' } },
    remark: { ...PACKAGE_V_DROPDOWN_PROPS, ...{ value: 'remark', displayAll: true } },
  },
}

function generate_v_options(values = [""]) {
  return Array.from({ length: values.length }, (_value, index) => {
    if (index == 0) {
      return { ...PACKAGE_V_OPTION_PROPS, ...{ title: true } };
    }
    return {
      ...PACKAGE_V_OPTION_PROPS, ...{
        value: values[index],
        valueForDemo: values[index]
      }
    };
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
//   country: [{}, { selected: true }, { selected: true }],
// }"
export function merge_v_options(inputs = [{}]) {
  let options = deep_clone(DEMO_SETTING.option);
  // options = {country: [], ...}

  Object.entries(options).forEach(option => {
    const [key, value] = option;
    // value = [{...}, {...}, ...]

    if (inputs[key] != undefined) {
      for (let index = 0; index < value.length; index++) {
        options[key][index] = { ...value[index], ...inputs[key][index] }
      }
    }
  });

  return options;
}