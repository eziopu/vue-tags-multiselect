import type { InjectionKey, Ref } from 'vue'
import type {
  TagModel,
  KeydownModel,
  PlaceholdersModel,
  DropdownStatusMap,
  RequestOptionClick,
  AppCallOptionSetTag,
  OptionStatusMap,
  AppProps,
  VDropdownPropsType,
} from './types'

// === useLog ===
export const logKey: InjectionKey<(...args: string[]) => void> = Symbol('log')
export const log2Key: InjectionKey<(content: string) => void> = Symbol('log2')
export const log3Key: InjectionKey<(content: string, parameter: unknown) => void> = Symbol('log3')

// === useTag ===
export const appTagsKey: InjectionKey<TagModel[]> = Symbol('appTags')
export const appStashTagKey: InjectionKey<TagModel> = Symbol('appStashTag')
export const appSetStashTagKey: InjectionKey<(item?: Partial<TagModel>) => void> = Symbol('appSetStashTag')
export const appSetTagToTagsKey: InjectionKey<(item?: Partial<TagModel>) => void> = Symbol('appSetTagToTags')
export const appUpdateTagKey: InjectionKey<(item: Partial<TagModel>) => void> = Symbol('appUpdateTag')
export const appDeleteTagsKey: InjectionKey<(indexs: number[]) => void> = Symbol('appDeleteTags')
export const appIsOnlyOneTheTagKey: InjectionKey<(keyName: string | null, value: string | null) => boolean> = Symbol('appIsOnlyOneTheTag')
export const appIsDuplicateTagKey: InjectionKey<(keyName: string | null, value: string | null) => boolean> = Symbol('appIsDuplicateTag')
export const appIsDuplicateTagByKeyKey: InjectionKey<(keyName: string) => boolean> = Symbol('appIsDuplicateTagByKey')
export const appEditTagIndexKey: InjectionKey<Ref<number>> = Symbol('appEditTagIndex')

// === useApp ===
export const appPropsKey: InjectionKey<Readonly<AppProps>> = Symbol('appProps')
export const appConjunctionKey: InjectionKey<Ref<string>> = Symbol('appConjunction')
export const appKeydownKey: InjectionKey<KeydownModel> = Symbol('appKeydown')
export const appElInputValueKey: InjectionKey<Ref<string>> = Symbol('appElInputValue')
export const appIsEnableKey: InjectionKey<Ref<boolean>> = Symbol('appIsEnable')
export const appIsActiveToFalseKey: InjectionKey<() => void> = Symbol('appIsActiveToFalse')
export const appEnableKey: InjectionKey<() => void> = Symbol('appEnable')
export const appReFocusKey: InjectionKey<(from?: string) => void> = Symbol('appReFocus')
export const appBlurKey: InjectionKey<() => void> = Symbol('appBlur')
export const appNextReFocusDontInitKey: InjectionKey<() => void> = Symbol('appNextReFocusDontInit')
export const isActiveElementContainAppKey: InjectionKey<() => boolean> = Symbol('isActiveElementContainApp')

// === usePreprocessedData ===
export const appRequestOptionClickKey: InjectionKey<RequestOptionClick> = Symbol('appRequestOptionClick')
export const appRequestOptionClickInitKey: InjectionKey<() => void> = Symbol('appRequestOptionClickInit')
export const appDropdownStatusKey: InjectionKey<DropdownStatusMap> = Symbol('appDropdownStatus')
export const appIsLockKey: InjectionKey<Ref<boolean>> = Symbol('appIsLock')
export const appIsPassTagInputBlurKey: InjectionKey<Ref<boolean>> = Symbol('appIsPassTagInputBlur')

// === useElInput ===
export const appPlaceholdersKey: InjectionKey<Ref<PlaceholdersModel>> = Symbol('appPlaceholders')

// === useSystemOption ===
export const appIsUndoOptionVisibleKey: InjectionKey<Ref<boolean>> = Symbol('appIsUndoOptionVisible')
export const appIsORConjunctionOptionVisibleKey: InjectionKey<Ref<boolean>> = Symbol('appIsORConjunctionOptionVisible')

// === useExposeSetTag ===
export const appCallOptionSetTagKey: InjectionKey<AppCallOptionSetTag> = Symbol('appCallOptionSetTag')
export const appCallOptionSetTagFinishKey: InjectionKey<() => void> = Symbol('appCallOptionSetTagFinish')

// === useKeyboard ===
export const appHandleKeydownKey: InjectionKey<(event: KeyboardEvent) => Promise<void>> = Symbol('appHandleKeydown')

// === v-dropdown composable ===
export const dropdownPropsKey: InjectionKey<Readonly<VDropdownPropsType>> = Symbol('dropdownProps')
export const dropdownIsDownKey: InjectionKey<Ref<boolean>> = Symbol('dropdownIsDown')
export const dropdownDisplayAllKey: InjectionKey<Ref<boolean>> = Symbol('dropdownDisplayAll')
export const dropdownGetTitleInnerHTMLKey: InjectionKey<Ref<string | null>> = Symbol('dropdownGetTitleInnerHTML')
export const dropdownClassListKey: InjectionKey<Ref<string[]>> = Symbol('dropdownClassList')
export const dropdownIsAnyOptionBeSearchedKey: InjectionKey<Ref<boolean>> = Symbol('dropdownIsAnyOptionBeSearched')
export const dropdownOptionStatusKey: InjectionKey<OptionStatusMap> = Symbol('dropdownOptionStatus')
