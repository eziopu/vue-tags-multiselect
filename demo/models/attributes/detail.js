import {
  ATTRIBUTES,
  EVENTS,
  EXPOSES,
  SLOTS,
  V_DROPDOWN_PROPS,
  V_OPTION_PROPS,
} from './default';

function get_type(input) {
  if (Array.isArray(input)) return 'Array';
  const type = typeof input;

  if (type == 'string' && input.includes('=>')) {
    return 'Function'
  }
  return type.charAt(0).toUpperCase() + type.slice(1);
}


function to_object(input, supplyInputs = []) {
  return {
    type: get_type(input),
    default: input,
    acceptedValues: supplyInputs,
  }
}


function to_detail_attributes(obj, supplyObj = {}) {
  const result = {};
  for (const key in obj) {
    const value = obj[key];
    result[key] = (typeof value === 'object' && Array.isArray(value) != true && value !== null)
      ? to_detail_attributes(value)
      : to_object(value, supplyObj[key])
  }
  return result;
}

//------------------------------------------------------------------------------
// ATTRIBUTES VALIDATIONS
//------------------------------------------------------------------------------

const ATTRIBUTE_VALIDATIONS = {
  merge: {
    condition: (attrs) => attrs.conjunction === 'AND',
    message: 'Attribute conjunction is "AND"'
  },
  tagConjunction: {
    condition: (attrs) => attrs.merge === false,
    message: 'Attribute merge is false'
  },
  'placeholders.loading': {
    condition: (attrs) => attrs.loading === false,
    message: 'Attribute loading is false'
  },
  'placeholders.selectDown': {
    condition: (attrs) => attrs.create === false,
    message: 'Attribute create is false'
  },
  'placeholders.finish': {
    condition: (attrs) => attrs.create === true,
    message: 'Attribute create is true'
  }
};

export const GET_ATTRIBUTE_INVALID_REASON = (keyName, attributes = {}) => {
  const validation = ATTRIBUTE_VALIDATIONS[keyName];
  return validation && validation.condition(attributes) ? validation.message : undefined;
};

//------------------------------------------------------------------------------
// ATTRIBUTES
//------------------------------------------------------------------------------

export const GET_ATTRIBUTES_DETAIL = () => {
  let result = to_detail_attributes(
    ATTRIBUTES,
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

//------------------------------------------------------------------------------
// EVENTS
//------------------------------------------------------------------------------

export const GET_EVENTS_DETAIL = () => {
  let result = to_detail_attributes(
    EVENTS,
    {
      status: ['disabled',
        'loading',
        'searching',
        'editing',
        'selecting',
        'finish',
        'delect-down'
      ],
    }
  )

  return result;
}

//------------------------------------------------------------------------------
// EXPOSES
//------------------------------------------------------------------------------

export const GET_EXPOSES_DETAIL = () => {
  return to_detail_attributes(EXPOSES);
}

//------------------------------------------------------------------------------
// SLOTS
//------------------------------------------------------------------------------

export const GET_SLOTS_DETAIL = () => {
  let result = to_detail_attributes(SLOTS);
  Object.keys(result).forEach(key => {
    result[key].value = '';
  });
  return result;
}

//------------------------------------------------------------------------------
// V_DROPDOWN_PROPS
//------------------------------------------------------------------------------

export const GET_V_DROPDOWN_PROPS_DETAIL = () => {
  // eslint-disable-next-line no-unused-vars
  const { isDisplayForDemo, ...rest } = V_DROPDOWN_PROPS; // remove isDisplayForDemo
  return to_detail_attributes(rest);
}

//------------------------------------------------------------------------------
// V_OPTION_PROPS
//------------------------------------------------------------------------------

export const GET_V_OPTION_PROPS_DETAIL = () => {
  // eslint-disable-next-line no-unused-vars
  const { isDisplayForDemo, valueForDemo, ...rest } = V_OPTION_PROPS; // remove isDisplayForDemo, valueForDemo
  return to_detail_attributes(rest);
}
