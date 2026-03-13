import { ref, reactive, provide, computed, watch } from 'vue'
import type { TagModel, TagsGroupByKeyModel, EmitFn } from '../types'
import {
  getTagModel,
  getTagsGroupByKeyModel,
  getTagsGroupByKeyValueModel,
} from '../models'
import {
  appTagsKey,
  appStashTagKey,
  appSetStashTagKey,
  appSetTagToTagsKey,
  appUpdateTagKey,
  appDeleteTagsKey,
  appIsOnlyOneTheTagKey,
  appIsDuplicateTagKey,
  appIsDuplicateTagByKeyKey,
  appEditTagIndexKey,
} from '../injectionKeys'

export default function useTag(emit: EmitFn, dep: Record<string, any>) {
  // ============== DATA ==============

  const tags: TagModel[] = reactive([])

  const stashTag: TagModel = reactive(getTagModel())

  const editTagIndex = ref(-1)

  // ============== COMPUTED ==============

  const isEditMode = computed(() => {
    return editTagIndex.value != -1
  })

  const tagsGroupByTitle = computed<TagsGroupByKeyModel[]>(() => {
    const group: TagsGroupByKeyModel[] = tags.reduce((result: TagsGroupByKeyModel[], item: TagModel) => {
      const existing = result.find(
        (i) => i.key === item.key && i.titleElm != null
      )
      if (existing) {
        existing.values.push(getTagsGroupByKeyValueModel(item))
      } else {
        result.push(
          getTagsGroupByKeyModel({
            key: item.key,
            classList: item.classList,
            values: [getTagsGroupByKeyValueModel(item)],
            titleElm: item.titleElm,
          } as Partial<TagsGroupByKeyModel>)
        )
      }
      return result
    }, [])

    const lastTag = tags[tags.length - 1]
    if (tags.length <= 1 || lastTag == undefined) {
      return group
    }

    if (lastTag.key != group[group.length-1].key) {
      // 找到包含指定鍵的物件
      const index = group.findIndex(obj => obj.key === lastTag.key)

      if (index !== -1) {
        // 將該物件從原始位置移除並放到陣列的最後
        const [removed] = group.splice(index, 1)
        group.push(removed)
      }
    }
    return group
  })

  const tagsGroupByKey = computed<Record<string, (string | null)[]>>(() => {
    return tags.reduce((result: Record<string, (string | null)[]>, item: TagModel) => {
      if (result[item.key!]) {
        result[item.key!].push(item.value)
      } else {
        result[item.key!] = [item.value]
      }
      return result
    }, {})
  })

  watch(tagsGroupByKey, (value) => {
    emit('update:modelValue', value)
  })

  // ============== METHODS ==============

  const log = dep.log
  const log2 = dep.log2
  const setStashTag = (item: Partial<TagModel> = {}): void => {
    Object.assign(stashTag, { ...getTagModel(item) })
    if (Object.keys(item).length === 0) {
      log(`setStashTag`, `object clear`)
    } else {
      log(`setStashTag`, `to set`, `success`)
      log2(item)
    }
  }

  const setTagToTags = (item: Partial<TagModel> = {}): void => {
    (item as TagModel).index = tags.length
    tags.push({ ...getTagModel(item) })
    log(`stashTag to tags`, `success`)
  }

  const updateTag = (item: Partial<TagModel> = {}): void => {
    if (editTagIndex.value == -1) {
      log(`cannot update the tag, not in edit mode`, `error`)
      return
    }

    const tag = tags[editTagIndex.value]
    if (tag == undefined) {
      log(`cannot update the tag, tag is undefined`, `error`)
      return
    }

    const oldValue = tag.value
    tag.value = item.value || null
    tag.valueElm = item.valueElm || null
    tag.displayValue = !!item.displayValue
    log(`${tag.key} tag update`, `success`)
    log2(`old value : ${oldValue}`)
    log2(`new value : ${item.value}`)
  }

  const deleteTags = (indexs: number[] = []): void => {
    if (indexs.length == 0) {
      log(`delete tag indexs length is 0`, `error`)
      return
    }

    for (const index of indexs) {
      // Do not use splice.
      // deleting or updating tag by index may affect the calculation of the index.
      emit('remove-tag', {
        key: tags[index].key,
        value: tags[index].value,
      })
      delete tags[index]
      // tags.splice(index, 1);
      log(`delete tag by index is ${index}`, `success`)
    }
  }

  const isOnlyOneTheTag = (keyName: string | null, value: string | null): boolean => {
    const filterTags = tags.filter((tag) => {
      return tag.key == keyName && tag.value == value
    })

    return filterTags.length == 1
  }

  const isDuplicateTag = (keyName: string | null, value: string | null): boolean => {
    return tags
      .filter((tag) => {
        return tag.key != undefined
      })
      .find((tag) => {
        return tag.key == keyName && tag.value == value
      })
      ? true
      : false
  }

  const isDuplicateTagByKey = (keyName: string): boolean => {
    return tags.some((tag) => tag.key === keyName)
  }

  // ============== PROVIDE ==============

  provide(appTagsKey, tags)
  provide(appStashTagKey, stashTag)
  provide(appSetStashTagKey, setStashTag)
  provide(appSetTagToTagsKey, setTagToTags)

  provide(appUpdateTagKey, updateTag)
  provide(appDeleteTagsKey, deleteTags)

  provide(appIsOnlyOneTheTagKey, isOnlyOneTheTag)
  provide(appIsDuplicateTagKey, isDuplicateTag)
  provide(appIsDuplicateTagByKeyKey, isDuplicateTagByKey)

  provide(appEditTagIndexKey, editTagIndex)

  // ============== EMIT ==============

  watch(stashTag, (value) => {
    if (value.key) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { index, ...rest } = value
      emit('selecting-tag', rest)
    } else {
      emit('selecting-tag', {})
    }
  })

  return {
    tags,
    stashTag,
    isEditMode,

    editTagIndex,

    tagsGroupByKey,
    tagsGroupByTitle,

    updateTag,
    deleteTags,
    setStashTag,
    setTagToTags,
    isDuplicateTag,
  }
}
