import { ref, computed, provide, readonly } from 'vue'
import type { EmitFn } from '../types'
import { getPlaceholdersModel } from '../models'
import { appPlaceholdersKey } from '../injectionKeys'

export default function useElInput(props: Record<string, any>, emit: EmitFn, dep: Record<string, any>) {
  // ============== REFS ================

  const elInput = ref<HTMLInputElement | null>(null)

  // ============== REFS DATA ================

  const elInputValue = ref('')

  // ============== DATA ================

  const tags = dep.tags

  const stashTag = dep.stashTag

  // ============== COMPUTED ==============

  const placeholders = computed(() => {
    return getPlaceholdersModel(props.placeholders)
  })

  const appIsLock = dep.appIsLock
  const appIsFinish = dep.appIsFinish
  const elInputDisabled = computed(() => {
    return appIsLock.value == true || appIsFinish.value == true || (props.search == false && props.create == false)
  })

  const elInputMaxlength = computed(() => {
    return elInputDisabled.value == true ||
      (stashTag.key != null && stashTag.custom == false)
      ? 0
      : 99
  })

  const isAllDropdownIsDown = dep.isAllDropdownIsDown
  const elInputPlaceholder = computed(() => {
    if (props.placeholder != '' && !stashTag.key) {
      return props.placeholder
    }

    const { initial, loading, selectDown, finish } = placeholders.value

    if (props.loading == true) return loading
    if (appIsFinish.value == true) return finish

    if (tags.length == 0 && !stashTag.key) {
      return initial
    }

    if (isAllDropdownIsDown.value == true) {
      return selectDown
    }
    return ''
  })

  // ============== PROVIDE ==============

  provide(appPlaceholdersKey, readonly(placeholders))

  // ============== EMIT ==============

  emit('input-value', elInputValue)

  return {
    elInput,
    elInputValue,
    elInputMaxlength,
    elInputPlaceholder,
  }
}
