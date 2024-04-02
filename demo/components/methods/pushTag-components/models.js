export const PARAMETERS = {
  key: { type: "string", default: "null", required: "no" },
  value: { type: "string", default: "null", required: "*yes" },
  valueElm: { type: "string", default: "null", required: "no" },
  titleElm: { type: "string", default: "null", required: "no" },
  classList: { type: "array", default: "[]", required: "no" },
  custom: { type: "boolean", default: "false", required: "no" },
  displayValue: { type: "boolean", default: "false", required: "no" },
}

function deep_clone(input) {
  return JSON.parse(JSON.stringify(input));
}

export function get_attributes(inputs = {}) {
  const parameters = deep_clone(PARAMETERS);

  Object.keys(parameters).forEach(key => {
    parameters[key] = inputs[key] || undefined;
  });

  return parameters;
}