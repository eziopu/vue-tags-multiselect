export function getKeydownModel(item = {}) {
  return {
    keyCode: defaultNumber(item.keyCode),

    verticalIndex: defaultNumber(item.verticalIndex),
    verticalLock: item.verticalLock || false,

    horizontalIndex: defaultNumber(item.horizontalIndex),
    horizontalLock: item.horizontalLock || false,
  };
}

export function getTagModel(item = {}) {
  return {
    index: defaultNumber(item.index),
    key: item.key || null,
    value: item.value || null,
    valueElm: item.valueElm || null,
    titleElm: item.titleElm || null,
    classList: item.classList || [],
    custom: item.custom || false,
    displayValue: item.displayValue || false,
  };
}

export function getTagsGroupByKeyModel(item = {}) {
  return {
    key: item.key || null,
    values: item.values || [],
    titleElm: item.titleElm || getTagModel().titleElm,
    valueElm: item.valueElm || getTagModel().valueElm,
    classList: item.classList || getTagModel().classList,
  };
}

export function getTagsGroupByKeyValueModel(item = {}) {
  return {
    index: defaultNumber(item.index),
    key: item.key || getTagModel().key, // for value-render
    custom: item.custom || getTagModel().custom, // for value-render
    elm: item.elm || getTagModel().valueElm,
    value: item.value || getTagModel().value,
    displayValue: item.displayValue || getTagModel().displayValue,
  };
}

const defaultNumber = (input) => {
  if (typeof input == "number") {
    return input;
  }
  return -1;
};
