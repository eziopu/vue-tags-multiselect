export function getKeydownModel() {
  return {
    keyCode: -1,

    verticalIndex: -1,
    verticalLock: false,

    horizontalIndex: -1,
    horizontalLock: false,
  };
}

export function getTagModel() {
  return {
    index: -1,
    key: null,
    value: null,
    valueElm: undefined,
    titleElm: undefined,
    classList: [],
    custom: false,
    displayValue: false,
  };
}

export function getTagsGroupByKeyModel() {
  return {
    key: null,
    values: [],
    titleElm: getTagModel().titleElm,
    valueElm: null,
    classList: getTagModel().classList,
  };
}

export function getTagsGroupByKeyValueModel() {
  return {
    key: getTagModel().key, // for value-render
    custom: getTagModel().custom, // for value-render
    index: getTagModel().index,
    elm: getTagModel().valueElm,
    value: getTagModel().value,
    displayValue: getTagModel().displayValue,
  };
}
