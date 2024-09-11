export function vDropdownProps() {
  return {
    disabled: { type: Boolean, default: false },
    divided: { type: Boolean, default: false },
    displayAll: { type: Boolean, default: false },
    hidden: { type: Boolean, default: false },
    custom: { type: Boolean, default: false },
    system: { type: Boolean, default: false },
    value: { type: String, default: '' },
  };
}

export function vOptionProps() {
  return {
    title: { type: Boolean, default: false },
    displayValue: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    divided: { type: Boolean, default: false },
    selected: { type: Boolean, default: false },
    value: { type: String, default: '' },
  };
}