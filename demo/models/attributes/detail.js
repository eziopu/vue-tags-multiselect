import {
  ATTRIBUTES,
  ATTRIBUTE_ACCEPTED_VALUES,
  EVENTS,
  EVENTS_ACCEPTED_VALUES,
  EXPOSES,
  EXPOSES__PUSHTAG_PARAMETER,
  SLOTS,
  V_DROPDOWN_PROPS,
  V_OPTION_PROPS
} from './default'

const clear_value = (input) => {
  Object.keys(input).forEach((key) => {
    input[key].value = ''
  })
  return input
}

const clear_value_add_is_required = (input) => {
  Object.keys(input).forEach((key) => {
    input[key].isRequired = key == 'value'
    input[key].value = ''
  })
  return input
}

function get_type(input) {
  if (Array.isArray(input)) return 'Array'
  const type = typeof input

  if (type == 'string' && input.includes('=>')) {
    return 'Function'
  }
  return type.charAt(0).toUpperCase() + type.slice(1)
}

function to_object(input, inputValue = input, supplyInputs = []) {
  return {
    type: get_type(input),
    default: input,
    value: inputValue,
    acceptedValues: supplyInputs
  }
}

function to_detail_attributes(obj, supplyObj = {}) {
  const result = {}
  for (const key in obj) {
    const value = obj[key]
    result[key] =
      typeof value === 'object' && Array.isArray(value) != true && value !== null
        ? to_detail_attributes(value)
        : to_object(value, value, supplyObj[key])
  }
  return result
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
}

export const GET_ATTRIBUTE_INVALID_REASON = (keyName, attributes = {}) => {
  const validation = ATTRIBUTE_VALIDATIONS[keyName]
  return validation && validation.condition(attributes) ? validation.message : undefined
}

//------------------------------------------------------------------------------
// ATTRIBUTES
//------------------------------------------------------------------------------

export const GET_ATTRIBUTES_DETAIL = () => {
  let result = to_detail_attributes(ATTRIBUTES, ATTRIBUTE_ACCEPTED_VALUES)
  result.placeholders = clear_value(result.placeholders)
  return result
}

//------------------------------------------------------------------------------
// EVENTS
//------------------------------------------------------------------------------
export const GET_EVENTS_DETAIL = () => {
  let result = to_detail_attributes(EVENTS, EVENTS_ACCEPTED_VALUES)

  Object.keys(result).forEach((key) => {
    result[key].value = event_value_convert(result[key].default)
  })

  return result
}

const event_value_convert = (input) => {
  switch (input) {
    case '() => void':
      return 0
    case '(String) => String':
      return ''
    case '(Boolean) => Boolean':
      return undefined
    case '(Object) => Object':
      return {}
    default:
      return null
  }
}

//------------------------------------------------------------------------------
// EXPOSES
//------------------------------------------------------------------------------

export const GET_EXPOSES_DETAIL = () => {
  return clear_value(to_detail_attributes(EXPOSES))
}

export const GET_EXPOSES__PUSHTAG_PARAMETER_DETAIL = () => {
  return clear_value_add_is_required(to_detail_attributes(EXPOSES__PUSHTAG_PARAMETER))
}

//------------------------------------------------------------------------------
// SLOTS
//------------------------------------------------------------------------------

export const GET_SLOTS_DETAIL = () => {
  return clear_value(to_detail_attributes(SLOTS))
}

//------------------------------------------------------------------------------
// V_DROPDOWN_PROPS
//------------------------------------------------------------------------------

export const GET_V_DROPDOWN_PROPS_DETAIL = () => {
  // eslint-disable-next-line no-unused-vars
  const { isDisplayForDemo, ...rest } = V_DROPDOWN_PROPS // remove isDisplayForDemo
  return clear_value_add_is_required(to_detail_attributes(rest))
}

//------------------------------------------------------------------------------
// V_OPTION_PROPS
//------------------------------------------------------------------------------

export const GET_V_OPTION_PROPS_DETAIL = () => {
  // eslint-disable-next-line no-unused-vars
  const { isDisplayForDemo, valueForDemo, ...rest } = V_OPTION_PROPS // remove isDisplayForDemo, valueForDemo
  return clear_value_add_is_required(to_detail_attributes(rest))
}
