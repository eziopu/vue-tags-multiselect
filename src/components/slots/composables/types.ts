import type { ComputedRef, Ref } from "vue";

export interface UseSearchDeps {
  innerHTML: ComputedRef<string | null>
}

export interface UseOptionDeps {
  isCanSearch: ComputedRef<boolean>
  isSearchable: ComputedRef<boolean>
  handleClick: (event?: Event) => void
}

export interface UseRegistrationDeps {
  elOption: Ref<HTMLElement | null>
  isHidden: ComputedRef<boolean>
  isSelected: ComputedRef<boolean>
  isSearchable: ComputedRef<boolean>
}
