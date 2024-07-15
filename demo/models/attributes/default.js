export const ATTRIBUTES = {
  disabled: false,
  loading: false,
  dropdownLoading: false,
  search: true,
  transition: true,
  create: true,
  clearable: false,
  merge: true,
  keyboard: true,
  debugLog: false,
  conjunction: 'null',
  tagPosition: 'null',
  deleteIcon: 'always',
  placeholder: '',
  placeholders: {
    initial: '',
    loading: 'Wait a moment, please.',
    selectDown: 'Selected End.',
    finish: 'Finish.',
    tagValueRepeat: 'repeat !',
  },
}

//------------------------------------------------------------------------------
// EVENTS
//------------------------------------------------------------------------------

export const EVENTS = {
  focus: '() => void',
  blur: '() => void',
  clear: '() => void',
  status: '() => void',
  inputValue: '(String) => String',
  visibleChange: '(Boolean) => Boolean',
  removeTag: '(Object) => Object',
  selectingTag: '(Object) => Object',
}

//------------------------------------------------------------------------------
// EXPOSES
//------------------------------------------------------------------------------

export const EXPOSES = {
  focus: '() => void',
  blur: '() => void',
  clear: '() => void',
  clearTags: '() => void',
  initialize: '() => void',
  pushTag: '(tag: object) => void',
}

//------------------------------------------------------------------------------
// SLOTS
//------------------------------------------------------------------------------

const demo__loading = '<div class="demo__loading"><i class="demo__loading--icon"></i></div>';
export const SLOTS = {
  'v-tag-dropdown': '',
  'v-tag-option': '',
  tagConjunction: '&',
  loading: demo__loading,
  dropdownLoading: demo__loading,
  optionUndo: '<i class="demo__arrow-left"></i> Undo',
  optionORConjunction: 'OR',
}

//------------------------------------------------------------------------------
// V_DROPDOWN_PROPS
//------------------------------------------------------------------------------

export const V_DROPDOWN_PROPS = {
  isDisplayForDemo: true, // for show code
  value: '',
  disabled: false,
  divided: false,
  displayAll: false,
  hidden: false,
  custom: false,
  class: [],
}

//------------------------------------------------------------------------------
// V_OPTION_PROPS
//------------------------------------------------------------------------------

export const V_OPTION_PROPS = {
  isDisplayForDemo: true, // for show code
  valueForDemo: '',
  value: '',
  title: false,
  displayValue: false,
  disabled: false,
  divided: false,
  selected: false,
  class: [],
}
