//------------------------------------------------------------------------------
// ATTRIBUTES VALIDATIONS
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
}

export const GET_ATTRIBUTE_INVALID_REASON = (keyName, attributes = {}) => {
  const validation = ATTRIBUTE_VALIDATIONS[keyName]
  return validation && validation.condition(attributes) ? validation.message : undefined
}

//------------------------------------------------------------------------------
// ATTRIBUTES Convert to simple
//------------------------------------------------------------------------------

export const DETAIL_CONVERT_TO_SIMPLE = (input = {}) => {
  return Object.fromEntries(
    Object.entries(input).map(([key, value]) => [key, value.value])
  )
}

export const ATTRIBUTE_CONVERT_TO_SIMPLE = (attributes = {}) => {
  const placeholders = DETAIL_CONVERT_TO_SIMPLE(attributes.placeholders)
  const obj = DETAIL_CONVERT_TO_SIMPLE(attributes)
  obj.placeholders = placeholders
  return obj
}