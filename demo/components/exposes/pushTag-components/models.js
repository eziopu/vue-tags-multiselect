import { GET_EXPOSES__PUSHTAG_PARAMETER_DETAIL } from '@models/attributes/detail.js'
export const EXPOSES__PUSHTAG_PARAMETER_DETAIL = GET_EXPOSES__PUSHTAG_PARAMETER_DETAIL()

export function get_attributes(inputs = {}) {
  const parameters = GET_EXPOSES__PUSHTAG_PARAMETER_DETAIL()

  Object.keys(parameters).forEach((key) => {
    parameters[key] = inputs[key] || (parameters[key].type == 'boolean' ? false : '')
  })

  return parameters
}
