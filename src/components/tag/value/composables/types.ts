import type { ComputedRef, Ref } from "vue";

export interface UseInputDeps {
  deleteTag: (where?: string, reason?: string) => void
}

export interface UseValueDeps {
  elInput: Ref<HTMLInputElement | null>
  inputValue: Ref<string>
}

export interface UseKeyboardDeps {
  elInput: Ref<HTMLInputElement | null>
  inputValue: Ref<string>
  nextWillDelete: Ref<boolean>
  keydownHorizontalLock: Ref<boolean>
  editByinput: ComputedRef<boolean>
  deleteTag: (where?: string, reason?: string) => void
  valueRepeatFlashing: () => void
}
