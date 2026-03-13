import type {
  TagModel,
  PlaceholdersModel,
  KeydownModel,
  AppCallOptionSetTag,
  TagsGroupByKeyModel,
  TagsGroupByKeyValueModel,
} from './types'

const defaultNumber = (input: unknown): number => {
  if (typeof input == 'number') {
    return input
  }
  return -1
}

export function getPlaceholdersModel(item: Partial<PlaceholdersModel> = {}): PlaceholdersModel {
  return {
    initial: item.initial || '',
    loading: item.loading || 'Wait a moment, please.',
    selectDown: item.selectDown || 'Selected End.',
    finish: item.finish || 'Finish.',
    tagValueRepeat: item.tagValueRepeat || 'repeat !',
  }
}

export function getKeydownModel(item: Partial<KeydownModel> = {}): KeydownModel {
  return {
    enterLock: item.enterLock || false,
    verticalIndex: defaultNumber(item.verticalIndex),
    verticalLock: item.verticalLock || false,
    horizontalIndex: defaultNumber(item.horizontalIndex),
    horizontalLock: item.horizontalLock || false,
    backspaceLock: item.backspaceLock || false,
  }
}

export function getTagModel(item: Partial<TagModel> = {}): TagModel {
  return {
    index: defaultNumber(item.index),
    key: item.key || null,
    value: item.value || null,
    valueElm: item.valueElm || null,
    titleElm: item.titleElm || null,
    classList: item.classList || [],
    custom: item.custom || false,
    displayValue: item.displayValue || false,
  }
}

export function getAppCallOptionSetTag(item: Partial<AppCallOptionSetTag> = {}): AppCallOptionSetTag {
  return {
    key: item.key || null,
    value: item.value || null,
    valueIsCustome: item.valueIsCustome || false,
  }
}

export function getTagsGroupByKeyModel(item: Partial<TagsGroupByKeyModel> = {}): TagsGroupByKeyModel {
  return {
    key: item.key || null,
    values: item.values || [],
    titleElm: item.titleElm || getTagModel().titleElm,
    classList: item.classList || getTagModel().classList,
  }
}

export function getTagsGroupByKeyValueModel(item: Partial<TagsGroupByKeyValueModel> = {}): TagsGroupByKeyValueModel {
  return {
    index: defaultNumber(item.index),
    key: item.key || getTagModel().key,
    custom: item.custom || getTagModel().custom,
    value: item.value || getTagModel().value,
    valueElm: item.valueElm || getTagModel().valueElm,
    displayValue: item.displayValue || getTagModel().displayValue,
  }
}
