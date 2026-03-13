import { computed } from 'vue'
import type { EmitFn } from '../types'

export default function useClearable(props: Record<string, any>, emit: EmitFn, dep: Record<string, any>) {
  // ============== DATA ================

  const tags = dep.tags

  const tagsGroupByTitle = dep.tagsGroupByTitle

  const elInputValue = dep.elInputValue

  const isEditMode = dep.isEditMode

  // ============== COMPUTED ==============

  const isClearableVisible = computed(() => {
    if (props.clearable == false || isEditMode.value == true) {
      return false
    }

    return elInputValue.value != '' || tagsGroupByTitle.value.length >= 1
  })

  const init = dep.init
  const clearTags = (): void => {
    tags.splice(0, tags.length)
  }

  const clear = (): void => {
    if (props.disabled) {
      dep.log(
        `clear`,
        `method is not available while the props.disabled is 'true'`,
        `warning`
      )
      return
    }
    clearTags()
    init()

    emit('clear')
  }

  return {
    isClearableVisible,
    clear
  }
}
