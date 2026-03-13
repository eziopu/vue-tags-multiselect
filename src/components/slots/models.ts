import type { PropType } from 'vue';
import type { VDropdownPropsType } from '../../types';

export const defaultDropdownProps: Readonly<VDropdownPropsType> = {
  disabled: false,
  divided: false,
  displayAll: false,
  hidden: false,
  custom: false,
  system: false,
  value: '',
};

export function vDropdownProps() {
  return {
    disabled: { type: Boolean as PropType<boolean>, default: false },
    divided: { type: Boolean as PropType<boolean>, default: false },
    displayAll: { type: Boolean as PropType<boolean>, default: false },
    hidden: { type: Boolean as PropType<boolean>, default: false },
    custom: { type: Boolean as PropType<boolean>, default: false },
    system: { type: Boolean as PropType<boolean>, default: false },
    value: { type: String as PropType<string>, default: '' },
  };
}

export function vOptionProps() {
  return {
    title: { type: Boolean as PropType<boolean>, default: false },
    displayValue: { type: Boolean as PropType<boolean>, default: false },
    disabled: { type: Boolean as PropType<boolean>, default: false },
    divided: { type: Boolean as PropType<boolean>, default: false },
    selected: { type: Boolean as PropType<boolean>, default: false },
    value: { type: String as PropType<string>, default: '' },
  };
}
