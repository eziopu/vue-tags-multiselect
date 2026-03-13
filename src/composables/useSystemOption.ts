import { computed, provide, readonly } from 'vue'
import type { DropdownStatusMap } from '../types'
import {
  appIsUndoOptionVisibleKey,
  appIsORConjunctionOptionVisibleKey,
} from '../injectionKeys'

export default function useSystemOption(dep: Record<string, any>) {
  // ============== DATA ================

  const tagsGroupByTitle = dep.tagsGroupByTitle

  const stashTag = dep.stashTag

  const focusReInit = dep.focusReInit

  const elInputValue = dep.elInputValue

  const conjunction = dep.conjunction

  const dropdownStatus: DropdownStatusMap = dep.dropdownStatus

  // ============== COMPUTED ==============

  const isEditMode = dep.isEditMode
  const tagsGroupByKey = dep.tagsGroupByKey
  const isAllDropdownIsDown = dep.isAllDropdownIsDown

  const isORConjunctionOptionVisible = computed(() => {
    if (
      tagsGroupByTitle.value.length == 0 ||
      isAllDropdownIsDown.value == true ||
      isEditMode.value == true ||
      stashTag.key != null
    ) {
      return false
    }
    if (isStillOptionsCanSelected() == false) {
      return false
    }

    return conjunction.value == ''
  })

  const isUndoOptionVisible = computed(() => {
    return stashTag.key != null && isEditMode.value == false
  })

  // ============== METHODS ==============

  const setStashTag = dep.setStashTag
  const elAppFocus = dep.elAppFocus

  const elOptionUndo = (): void => {
    dep.log('undo, reset stashTag, refocus app')
    setStashTag()
    elAppFocus()
  }

  const elOptionORConjunction = (): void => {
    dep.log('OR conjunction, reset input value refocus app')
    elInputValue.value = ''
    conjunction.value = 'OR'

    focusReInit.value = false
    elAppFocus()
  }

  const isStillOptionsCanSelected = (): boolean => {
    // const dropdownStatus = { country: { isDown: true, isAllOptionSelected: true }, country2: { isDown: false, isAllOptionSelected: false }, ... } (reactive)
    // const tagsGroupByKey = { "country": ["val1", "val2"], "country2": ["val1"] } (computed)
    const tempTagsGroupByKey: Record<string, (string | null)[]> = { ...tagsGroupByKey.value }
    Object.keys(dropdownStatus).forEach((key) => {
      if (
        dropdownStatus[key].isDown == true &&
        tempTagsGroupByKey[key] != undefined
      ) {
        delete tempTagsGroupByKey[key]
      }
    })
    return Object.keys(tempTagsGroupByKey).length > 0
  }
  // ============== PROVIDE ==============

  provide(appIsUndoOptionVisibleKey, readonly(isUndoOptionVisible))
  provide(
    appIsORConjunctionOptionVisibleKey,
    readonly(isORConjunctionOptionVisible)
  )

  return {
    isUndoOptionVisible,
    isORConjunctionOptionVisible,

    elOptionUndo,
    elOptionORConjunction,
  }
}
