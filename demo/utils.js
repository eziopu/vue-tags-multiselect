export function objectKeyToArray (input, inputValue) {
  return Object.entries(input)
    .filter(([key, value]) => key != "" && value === inputValue)
    .map(([key]) => key)
}

export function toBoolean (input) {
  return input == "false" ? false : true;
}

export function toUpperCaseFirstLetter(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function toKebabCase(str = '') {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function toCamelCase(str = '') {
  return str.replace(/-([a-z])/g, function (__match, p1) {
    return p1.toUpperCase();
  });
}