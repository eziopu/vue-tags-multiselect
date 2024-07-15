import {
  ATTRIBUTES,
  EVENTS,
  EXPOSES,
  SLOTS,
  V_DROPDOWN_PROPS,
  V_OPTION_PROPS,
} from './attributes/default';

export const DEMO_SETTING = {
  attributes: ATTRIBUTES,
  slots: SLOTS,
  events: EVENTS,
  exposes: EXPOSES,
  option: {
    country: generate_v_options(['', 'Māre', 'Eldia']),
    name: generate_v_options(['', 'Grisha Yeager', 'Eren Yeager', 'Armin Arlert']),
    remark: generate_v_options(['', 'yes', 'no']),
  },
  dropdown: {
    country: { ...V_DROPDOWN_PROPS, ...{ value: 'country' } },
    name: { ...V_DROPDOWN_PROPS, ...{ value: 'name' } },
    remark: { ...V_DROPDOWN_PROPS, ...{ value: 'remark', displayAll: true } },
  },
}

function generate_v_options(values = ['']) {
  return Array.from({ length: values.length }, (_value, index) => {
    if (index == 0) {
      return { ...V_OPTION_PROPS, ...{ title: true } };
    }
    return {
      ...V_OPTION_PROPS, ...{
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