import { ref, reactive, provide, computed, watch } from "vue";
import {
  getTagModel,
  getTagsGroupByKeyModel,
  getTagsGroupByKeyValueModel,
} from "../models";

export default function useTag(_props, context, dep) {
  // ============== DATA ==============

  const tags = reactive([]);

  const stashTag = reactive(getTagModel());

  const editTagIndex = ref(-1);

  // ============== COMPUTED ==============

  const isEditMode = computed(() => {
    return editTagIndex.value != -1;
  });

  const tagsGroupByTitle = computed(() => {
    const group = tags.reduce((result, item) => {
      const existing = result.find(
        (i) => i.key === item.key && i.titleElm != null
      );
      if (existing) {
        existing.values.push(getTagsGroupByKeyValueModel(item));
      } else {
        result.push(
          getTagsGroupByKeyModel({
            key: item.key,
            custom: item.custom,
            classList: item.classList,
            values: [getTagsGroupByKeyValueModel(item)],
            titleElm: item.titleElm,
            valueElm: null,
          })
        );
      }
      return result;
    }, []);

    const lastTag = tags[tags.length - 1];
    if (tags.length <= 1 || lastTag == undefined) {
      return group;
    }

    if (lastTag.key != group[group.length-1].key) {
      // 找到包含指定鍵的物件
      const index = group.findIndex(obj => obj.key = lastTag.key);

      if (index !== -1) {
        // 將該物件從原始位置移除並放到陣列的最後
        const [removed] = group.splice(index, 1);
        group.push(removed);
      }
    }
    return group;
  });

  const tagsGroupByKey = computed(() => {
    return tags.reduce((result, item) => {
      if (result[item.key]) {
        result[item.key].push(item.value);
      } else {
        result[item.key] = [item.value];
      }
      return result;
    }, {});
  });

  watch(tagsGroupByKey, (value) => {
    context.emit("change");
    context.emit("update:modelValue", value);
  });

  // ============== METHODS ==============

  const log = dep.log;
  const log2 = dep.log2;
  const setStashTag = (item = {}) => {
    Object.assign(stashTag, { ...getTagModel(item) });
    if (Object.keys(item).length === 0) {
      log(`setStashTag`, `object clear`);
    } else {
      log(`setStashTag`, `to set`, `success`);
      log2(item);
    }
  };

  const setTagToTags = (item = {}) => {
    item.index = tags.length;
    tags.push({ ...getTagModel(item) });
    log(`stashTag to tags`, `success`);
  };

  const updateTag = (item = {}) => {
    if (editTagIndex.value == -1) {
      log(`cannot update the tag, not in edit mode`, `error`);
      return;
    }

    const tag = tags[editTagIndex.value];
    if (tag == undefined) {
      log(`cannot update the tag, tag is undefined`, `error`);
      return;
    }

    const oldValue = tag.value;
    tag.value = item.value;
    tag.valueElm = item.valueElm || null;
    tag.displayValue = !!item.displayValue;
    log(`${tag.key} tag update`, `success`);
    log2(`old value : ${oldValue}`);
    log2(`new value : ${item.value}`);
  };

  const deleteTags = (indexs = []) => {
    if (indexs.length == 0) {
      log(`delete tag indexs length is 0`, `error`);
      return;
    }

    // indexs.sort((a, b) => b - a);

    for (const index of indexs) {
      // Do not use splice.
      // deleting or updating tag by index may affect the calculation of the index.
      context.emit("remove-tag", {
        key: tags[index].key,
        value: tags[index].value,
      });
      delete tags[index];
      // tags.splice(index, 1);
      log(`delete tag by index is ${index}`, `success`);
    }
  };

  const isOnlyOneTheTag = (keyName, value) => {
    const filterTags = tags.filter((tag) => {
      return tag.key == keyName && tag.value == value;
    });
    
    return filterTags.length == 1;
  };

  const isDuplicateTag = (keyName, value) => {
    return tags
      .filter((tag) => {
        return tag.key != undefined;
      })
      .find((tag) => {
        return tag.key == keyName && tag.value == value;
      })
      ? true
      : false;
  };

  const isDuplicateTagByKey = (keyName) => {
    return tags.some((tag) => tag.key === keyName);
  };

  // ============== PROVIDE ==============

  provide("appTags", tags);
  provide("appStashTag", stashTag);
  provide("appSetStashTag", setStashTag);
  provide("appSetTagToTags", setTagToTags);

  provide("appUpdateTag", updateTag);
  provide("appDeleteTags", deleteTags);

  provide("appIsOnlyOneTheTag", isOnlyOneTheTag);
  provide("appIsDuplicateTag", isDuplicateTag);
  provide("appIsDuplicateTagByKey", isDuplicateTagByKey);

  provide("appEditTagIndex", editTagIndex);

  // ============== EMIT ==============

  watch(stashTag, (value) => {
    context.emit("selecting-tag", value.key ? (delete value.index, value) : {});
  });

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
  };
}
