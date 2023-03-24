export const keydownModel = {
  keyCode: -1,

  verticalIndex: -1,
  verticalLock: false,

  horizontalIndex: -1,
  horizontalLock: false,
};

export const tagModel = {
  index: -1,
  key: null,
  value: null,
  valueElm: undefined,
  titleElm: undefined,
  classList: [],
  custom: false,
  displayValue: false,
};

export const tagsGroupByKeyModel = {
  key: null,
  values: [],
  titleElm: tagModel.titleElm,
  valueElm: null,
  classList: tagModel.classList,
};

export const tagsGroupByKeyValueModel = {
  key: tagModel.key, // for value-render
  custom: tagModel.custom, // for value-render
  index: tagModel.index,
  elm: tagModel.valueElm,
  value: tagModel.value,
  displayValue: tagModel.displayValue,
};
