import { reactive, provide } from 'vue'
import type { TagModel, AppCallOptionSetTag } from '../types'
import { getTagModel, getAppCallOptionSetTag } from '../models'
import {
  appCallOptionSetTagKey,
  appCallOptionSetTagFinishKey,
} from '../injectionKeys'

export default function useExposeSetTag(props: Record<string, any>, dep: Record<string, any>) {
  // ============== DATA ==============

  const appIsLock = dep.appIsLock

  const dropdownStatus = dep.dropdownStatus

  const isEditMode = dep.isEditMode

  const stashTag = dep.stashTag

  const appCallOptionSetTag: AppCallOptionSetTag = reactive(getAppCallOptionSetTag())

  provide(appCallOptionSetTagKey, appCallOptionSetTag)

  // ============== METHODS ==============

  const focusApp = dep.focusApp

  const updateTag = dep.updateTag

  const isDuplicateTag = dep.isDuplicateTag

  const setStashTag = dep.setStashTag

  const setTagToTags = dep.setTagToTags

  const tagsGroupByKey = dep.tagsGroupByKey

  const callOptionSetTag = (item: Partial<AppCallOptionSetTag> = {}): void => {
    Object.assign(appCallOptionSetTag, { ...getAppCallOptionSetTag(item) })
  }

  provide(appCallOptionSetTagFinishKey, () => {
    if (appCallOptionSetTag.valueIsCustome == true) {
      mergeStashTagToFinish({ value: appCallOptionSetTag.value })
    }
    callOptionSetTag()
  })

  const getIsMach = (inputKey: string = '', inputValue: string = ''): { key: boolean; value: boolean } => {
    let isMachKey = false
    let isMachValue = false
    if (inputKey != '') {
      // const dropdownStatus = { country: { isDown: true, isAllOptionSelected: true }, country2: { isDown: false, isAllOptionSelected: false }, ... } (reactive)
      const targetDropdown = dropdownStatus[inputKey]
      if (targetDropdown != undefined) {
        isMachKey =
          typeof targetDropdown == 'object' &&
          Object.keys(targetDropdown).length != 0
        isMachValue = targetDropdown.values.includes(inputValue)
      }
    }
    return { key: isMachKey, value: isMachValue }
  }

  /**
   * parameter object <tagModel>
   * retunt void
   **/
  const mergeStashTagToFinish = (input: Partial<TagModel> = {}): void => {
    const newTag: Partial<TagModel> = {
      value: input.value,
      valueElm: input.valueElm || null,
      classList: input.classList,
    }
    if (input.titleElm) {
      newTag.titleElm = input.titleElm || null
    }
    setTagToTags({
      ...stashTag,
      ...newTag,
    })
    setStashTag()
    focusApp('mergeStashTagToFinish()')
  }

  const pushTag = (item: Partial<TagModel> = {}): void => {
    const input = getTagModel(item)
    dep.log('pushTag', 'starts executing')
    dep.log3('get parameter', item)

    try {
      if (input.value == null) throw ['error', 'value is empty']
      if (appIsLock.value == true) throw ['error', 'app is lock']

      const targetKey =
        input.key == null && stashTag.key != null ? stashTag.key : input.key

        // 是否已存在
      if (isDuplicateTag(targetKey, input.value)) {
        // 例外狀況, 編輯中 且該tagkey 只有一個時 不回傳錯誤
        // const tagsGroupByKey = { "country": ["val1", "val2"], "country2": ["val1"] } (computed)
        const isPass =
          isEditMode.value == true &&
          tagsGroupByKey.value[targetKey].length == 1
        if (isPass == false) {
          throw ['error', 'tag value is repeat']
        }
      }

      // 是否有對應的value
      const isMach = getIsMach(targetKey!, input.value!)
      if (isMach.value == true) {
        // 有對應的value 請求 該option 觸發自動點擊
        callOptionSetTag({ key: targetKey!, value: input.value! })
        throw ['success', 'call option set tag']
      }

      if (
        stashTag.key != null &&
        (input.key == stashTag.key || input.key == null)
      ) {
        // 編輯模式
        if (isEditMode.value == true) {
          updateTag({
            value: input.value,
            valueElm: input.valueElm,
            classList: input.classList,
          })
          focusApp('updateTag()')
          throw ['success', 'update tag']
        } else {
          // 選擇中
          mergeStashTagToFinish(input)
          throw ['success', 'merge stash tag']
        }
      }

      // input 自己有key 且 有對應的key
      const isInputKeyMach = getIsMach(input.key!, input.value!)
      if (isInputKeyMach.key == true) {
        callOptionSetTag({
          key: input.key!,
          value: input.value!,
          valueIsCustome: isInputKeyMach.value == false,
        })
        throw ['success', 'call option set tag']
      }

      if (props.create == false) {
        throw ['error', 'key not found and props create is false']
      } else {
        setTagToTags(input)
        setStashTag()
        throw ['success', 'generate a tag']
      }
    } catch (result) {
      if ((result as string[])[0] == 'error') {
        dep.log('pushTag', (result as string[])[1], 'error')
      } else {
        dep.log('pushTag', `to do ${(result as string[])[1]}`, (result as string[])[0])
      }
    }
    dep.log('pushTag', 'function finished executing')
  }

  return {
    pushTag,
  }
}
