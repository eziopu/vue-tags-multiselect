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
    return tags.reduce((result, item) => {
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
      log(`setStashTag`, `to set`);
      log2(`>`, item);
    }
  };

  const setTagToTags = (item = {}) => {
    item.index = tags.length;
    tags.push({ ...getTagModel(item) });
    log(`stashTag to tags`);
  };

  const updateTag = (item = {}) => {
    if (editTagIndex.value == -1) return;

    const tag = tags[editTagIndex.value];

    if (tag == undefined) return;

    tag.value = item.value;
    tag.valueElm = item.valueElm || null;
    tag.displayValue = !!item.displayValue;
    log(`update tag`, `success`);
  };

  const deleteTags = (indexs = []) => {
    if (indexs.length == 0) return;

    // indexs.sort((a, b) => b - a);

    for (const index of indexs) {
      // Do not use splice.
      // deleting or updating tag by index may affect the calculation of the index.
      delete tags[index];
      // tags.splice(index, 1);
      log(`delete tag`, `index is ${index}`, `success`);
    }
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

  provide("appIsDuplicateTag", isDuplicateTag);
  provide("appIsDuplicateTagByKey", isDuplicateTagByKey);

  provide("appEditTagIndex", editTagIndex);

  // ============== EMIT ==============

  watch(stashTag, (value) => {
    context.emit("selectingTag", value.key ? (delete value.index, value) : {});
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
