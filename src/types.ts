import type { Ref, ComputedRef } from 'vue'

// ====== Core Data Models ======

export interface TagModel {
  index: number
  key: string | null
  value: string | null
  valueElm: string | null
  titleElm: string | null
  classList: string[]
  custom: boolean
  displayValue: boolean
}

export interface TagsGroupByKeyModel {
  key: string | null
  values: TagsGroupByKeyValueModel[]
  titleElm: string | null
  classList: string[]
}

export interface TagsGroupByKeyValueModel {
  index: number
  key: string | null
  custom: boolean
  value: string | null
  valueElm: string | null
  displayValue: boolean
}

export interface PlaceholdersModel {
  initial: string
  loading: string
  selectDown: string
  finish: string
  tagValueRepeat: string
}

export interface KeydownModel {
  enterLock: boolean
  verticalIndex: number
  verticalLock: boolean
  horizontalIndex: number
  horizontalLock: boolean
  backspaceLock: boolean
}

export interface AppCallOptionSetTag {
  key: string | null
  value: string | null
  valueIsCustome: boolean
}

// ====== Dropdown Status ======

export interface DropdownStatusEntry {
  isAllOptionSelected: boolean
  isDown: boolean
  isHidden?: boolean
  values: string[]
}

export type DropdownStatusMap = Record<string, DropdownStatusEntry>

export interface OptionStatusEntry {
  isTitle: boolean
  isHidden: boolean
  isSelected: boolean
  isBeSearched: boolean
}

export type OptionStatusMap = Record<string, OptionStatusEntry>

export interface RequestOptionClick {
  key: string
  value: string
}

// ====== Processed Options ======

export interface ProcessedDropdown {
  disabled: boolean
  divided: boolean
  displayAll: boolean
  hidden: boolean
  custom: boolean
  value: string
  class?: string
  values: ProcessedOption[]
}

export interface ProcessedOption {
  title: boolean
  displayValue: boolean
  disabled: boolean
  divided: boolean
  selected: boolean
  value: string
  class?: string
  element?: string
}

// ====== Options Input ======

export type OptionsInput =
  | Record<string, (string | OptionInputObject)[]>
  | DropdownInputObject[]

export interface OptionInputObject {
  title?: boolean
  displayValue?: boolean
  disabled?: boolean
  divided?: boolean
  selected?: boolean
  value?: string
  element?: string
  class?: string
}

export interface DropdownInputObject {
  disabled?: boolean
  divided?: boolean
  displayAll?: boolean
  hidden?: boolean
  custom?: boolean
  value?: string
  class?: string
  values: (string | OptionInputObject)[]
}

// ====== Component Props (for provide/inject) ======

export interface AppProps {
  disabled: boolean
  loading: boolean
  dropdownLoading: boolean
  search: boolean
  transition: boolean
  create: boolean
  clearable: boolean
  merge: boolean
  keyboard: boolean
  conjunction: string
  deleteIcon: string
  tagPosition: string
  debugLog: boolean
  placeholders: Partial<PlaceholdersModel>
  placeholder: string
  options: OptionsInput
}

export interface VDropdownPropsType {
  disabled: boolean
  divided: boolean
  displayAll: boolean
  hidden: boolean
  custom: boolean
  system: boolean
  value: string
}

export interface VOptionPropsType {
  title: boolean
  displayValue: boolean
  disabled: boolean
  divided: boolean
  selected: boolean
  value: string
}

// ====== Tag component props ======
// tag/main.vue 的 tag prop 可能是 TagModel（未合併）或 TagsGroupByKeyModel（合併後），
// Vue template 無法有效 narrow union type，因此使用合併介面。
export interface TagComponentProp {
  index?: number
  key: string | null
  value?: string | null
  valueElm?: string | null
  titleElm: string | null
  classList: string[]
  custom?: boolean
  displayValue?: boolean
  values?: TagsGroupByKeyValueModel[]
}

// tag/value/index.vue 的 tag prop，同時涵蓋 TagModel 和 TagsGroupByKeyValueModel 的共有欄位
export interface TagValueComponentProp {
  index: number
  key: string | null
  value: string | null
  valueElm: string | null
  custom: boolean
  displayValue: boolean
}

// ====== Composable Emit ======

export type EmitFn = (event: any, ...args: any[]) => void

// ====== Emits ======

export type VTagsMultiselectEmits = {
  'update:modelValue': [value: Record<string, string[]>]
  focus: []
  blur: []
  clear: []
  status: [value: string[]]
  'input-value': [value: Ref<string>]
  'visible-change': [value: ComputedRef<boolean>]
  'remove-tag': [value: { key: string | null; value: string | null }]
  'selecting-tag': [value: Partial<TagModel> | Record<string, never>]
}

// ====== Log ======

export type LogType = 'info' | 'warning' | 'success' | 'error' | 'method'
