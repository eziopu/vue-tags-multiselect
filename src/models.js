export const keydown = {
  keyCode: -1,

  verticalIndex: -1,
  verticalLock: false,

  horizontalIndex: -1,
  horizontalLock: false,
};

export const tag = {
  index: -1,
  key: null,
  value: null,
  valueElm: undefined,
  titleElm: undefined,
  classList: [],
  custom: false,
  displayValue: false,
};

export const tagsGroupBy = {
  key: null,
  values: [],
  titleElm: tag.titleElm,
  valueElm: null,
  classList: tag.classList,
};

export const tagsGroupByValues = {
  key: tag.key, // for value-render
  custom: tag.custom, // for value-render
  index: tag.index,
  elm: tag.valueElm,
  value: tag.value,
  displayValue: tag.displayValue,
};
