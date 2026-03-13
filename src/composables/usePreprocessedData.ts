import { ref, reactive, computed, provide, readonly } from 'vue'
import type { DropdownStatusMap, RequestOptionClick } from '../types'
import {
  appRequestOptionClickKey,
  appRequestOptionClickInitKey,
  appDropdownStatusKey,
  appIsLockKey,
  appIsPassTagInputBlurKey,
} from '../injectionKeys'

export default function usePreprocessedData(props: Record<string, any>) {
  // ================= Dropdown status ====================
  // ============== DATA ================

  const dropdownStatus: DropdownStatusMap = reactive({})

  const getRequestOptionClickModel = (): RequestOptionClick => {
    return { key: '', value: '' }
  }
  const requestOptionClick: RequestOptionClick = reactive(getRequestOptionClickModel())

  // ============== PROVIDE ==============

  provide(appRequestOptionClickKey, requestOptionClick)
  provide(appRequestOptionClickInitKey, () => {
    Object.assign(requestOptionClick, getRequestOptionClickModel())
  })
  provide(appDropdownStatusKey, dropdownStatus)

  // ============== COMPUTED ================
  const isAllDropdownIsDown = computed(() => {
    // const dropdownStatus = { country: { isDown: true, isAllOptionSelected: true }, country2: { isDown: false, isAllOptionSelected: false }, ... } (reactive)
    return Object.values(dropdownStatus).every((status) => status.isDown)
  })

  const isAllDropdownIsHidden = computed(() => {
    // const dropdownStatus = { country: { isDown: true, isAllOptionSelected: true }, country2: { isDown: false, isAllOptionSelected: false }, ... } (reactive)
    return Object.values(dropdownStatus).every((status) => status.isHidden)
  })

  // ================= App status ====================
  // ============== COMPUTED ================
  const appIsLock = computed(() => {
    return (
      props.disabled == true ||
      props.loading == true ||
      props.dropdownLoading == true
    )
  })

  const appIsFinish = computed(() => {
    return isAllDropdownIsDown.value == true && props.create == false
  })

  // ============== PROVIDE ==============

  provide(appIsLockKey, readonly(appIsLock))

  // ================= Tag custome edit input ====================
  // ============== REF ================
  const isPassTagInputBlur = ref(false)

  // ============== PROVIDE ==============
  provide(appIsPassTagInputBlurKey, isPassTagInputBlur)


  return {
    dropdownStatus,
    isAllDropdownIsDown,
    isAllDropdownIsHidden,
    isPassTagInputBlur,

    appIsLock,
    appIsFinish,
  }
}
