export const objectKeyToArray = (input, inputValue) => {
  return Object.entries(input)
    .filter(([key, value]) => key != "" && value === inputValue)
    .map(([key]) => key)
}

export const toBoolean = (input) => {
  return input == "false" ? false : true;
}