import { ref, reactive, provide, computed } from "vue";
import {
  getTagModel,
  getTagsGroupByKeyModel,
  getTagsGroupByKeyValueModel,
} from "../models";

export default function useTag() {
  // ============ DEPENDENCIES ============

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

  // =============== METHODS ==============

  const setStashTag = (item = {}) => {
    Object.assign(stashTag, { ...getTagModel(item) });
  };

  const setTagToTags = (item = {}) => {
    item.index = tags.length;
    tags.push({ ...getTagModel(item) });
  };

  const updateTag = (item = {}) => {
    if (editTagIndex.value == -1) return;

    const tag = tags[editTagIndex.value];

    if (tag == undefined) return;

    tag.value = item.value;
    tag.valueElm = item.valueElm || null;
    tag.displayValue = item.displayValue || true;
  };

  const appDeleteTags = (indexs = []) => {
    if (indexs.length == 0) return;

    let arrayIndexByTags = [];
    tags.forEach((tag, index) => {
      if (indexs.indexOf(tag.index) != -1) {
        arrayIndexByTags.push(index);
      }
    });

    // console.log(arrayIndexByTags);
    arrayIndexByTags = arrayIndexByTags.sort((a, b) => {
      return b - a;
    });

    arrayIndexByTags.forEach((index) => {
      delete tags[index];
    });
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
    return tags.find((tagKeyName) => tagKeyName == keyName) ? true : false;
  };

  provide("appTags", tags);
  provide("appStashTag", stashTag);
  provide("appSetStashTag", setStashTag);
  provide("appSetTagToTags", setTagToTags);

  provide("appUpdateTag", updateTag);
  provide("appDeleteTags", appDeleteTags);

  provide("appIsDuplicateTag", isDuplicateTag);
  provide("appIsDuplicateTagByKey", isDuplicateTagByKey);

  provide("appEditTagIndex", editTagIndex);

  return {
    tags,
    stashTag,
    isEditMode,

    editTagIndex,

    tagsGroupByKey,
    tagsGroupByTitle,

    setStashTag,
    setTagToTags,
  };
}
