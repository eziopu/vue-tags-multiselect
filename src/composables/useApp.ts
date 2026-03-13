import { ref, reactive, watch, computed, provide, readonly } from 'vue'
import type { KeydownModel, AppProps, EmitFn } from '../types'
import { getKeydownModel } from '../models'
import { APP_INPUT_BLUR } from '../timeouts'
import {
  appPropsKey,
  appConjunctionKey,
  appKeydownKey,
  appElInputValueKey,
  appIsEnableKey,
  appIsActiveToFalseKey,
  appEnableKey,
  appReFocusKey,
  appBlurKey,
  appNextReFocusDontInitKey,
  isActiveElementContainAppKey,
} from '../injectionKeys'

export default function useApp(props: Record<string, any>, emit: EmitFn, dep: Record<string, any>) {
  // ============== REFS ================

  const elApp = ref<HTMLElement | null>(null)

  const elControls = ref<HTMLElement | null>(null)

  const elTags = ref<HTMLElement | null>(null)

  const elInput = dep.elInput

  // ============== DATA ================

  const isEnable = ref(false)

  const focusReInit = ref(true)

  const isActive = ref(false)

  const keydown: KeydownModel = reactive(getKeydownModel())

  const conjunction = ref('')

  const editTagIndex = dep.editTagIndex

  const elInputValue = dep.elInputValue

  // ============== COMPUTED ==============

  const tabindex = computed(() => {
    return props.disabled ? -1 : 0
  })

  const isTagPositionVisible = computed(() => {
    const position = props.tagPosition

    const pattern = /(top|bottom)/

    return pattern.test(position)
  })

  // ============== METHODS ==============

  const setStashTag = dep.setStashTag

  const init = (where = ''): void => {
    dep.log(
      `init`,
      `app initialize${where != '' ? ', called by ' + where : ''}`
    )
    dep.log2(`reset stashTag`)
    dep.log2(`reset edit tag index`)
    dep.log2(`reset keydown index`)
    dep.log2(`reset conjunction`)
    elInputValue.value = ''
    editTagIndex.value = -1
    setStashTag()

    initKeydown()
    initConjunction()
  }

  const initKeydown = (): void => {
    Object.assign(keydown, getKeydownModel())
  }

  const initConjunction = (): void => {
    conjunction.value =
      props.conjunction == 'OR' || props.conjunction == 'AND'
        ? props.conjunction
        : ''
  }

  const appEnable = (): void => {
    isActive.value = true
    isEnable.value = true
  }

  const focusApp = (): void => {
    if (isEnable.value == true) {
      elInput.value.focus()
    }
  }

  const isActiveElementContainApp = (): boolean => {
    const actElm = document.activeElement
    return elApp.value!.contains(actElm)
  }

  const elAppFocus = (): void => {
    if (!props.disabled) {
      elInput.value.focus()
      appEnable()
    }
  }

  const elInputFocus = (): void => {
    if (props.disabled) {
      dep.log(
        `InputFocus`,
        `method is not available while the app is locked`,
        `warning`
      )
      return
    }
    dep.log(`InputFocus`, `available`)
    appEnable()

    if (focusReInit.value == true) {
      init('elInputFocus()')
    } else {
      focusReInit.value = true
    }
  }

  const elInputBlur = (): void => {
    setTimeout(() => {
      if (isActiveElementContainApp() == false) {
        dep.log(`InputBlur`, `available`)
        dep.log2(`actElm :`, document.activeElement)

        isActive.value = false
        init('elInputBlur()')
      } else {
        isActive.value = true
      }
    }, APP_INPUT_BLUR)
  }

  // ============== WATCH TO EMIT ==============

  watch(
    isActive,
    (value) => {
      emit(value ? 'focus' : 'blur')
    }
  )

  // ============== PROVIDE ==============

  provide(appPropsKey, props as Readonly<AppProps>)
  provide(appConjunctionKey, readonly(conjunction))

  provide(appKeydownKey, keydown)
  provide(appElInputValueKey, elInputValue)

  provide(appIsEnableKey, readonly(isEnable))
  provide(appIsActiveToFalseKey, () => {
    isActive.value = false
  })
  provide(appEnableKey, appEnable)
  provide(appReFocusKey, focusApp)
  provide(appBlurKey, elInputBlur)
  provide(appNextReFocusDontInitKey, () => {
    focusReInit.value = false
  })

  provide(isActiveElementContainAppKey, isActiveElementContainApp)

  return {
    elApp,
    elControls,
    elTags,

    isActive,
    isEnable,
    focusReInit,

    conjunction,
    keydown,
    tabindex,

    isTagPositionVisible,

    init,
    initKeydown,
    initConjunction,
    elInputFocus,
    elInputBlur,

    focusApp,
    elAppFocus,
    isActiveElementContainApp,
  }
}
