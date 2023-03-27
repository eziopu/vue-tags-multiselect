import { provide, computed } from "vue";
import {
  getTagModel,
  getTagsGroupByKeyModel,
  getTagsGroupByKeyValueModel,
} from "../models";

export default function useHandelTag(props, context, dep) {
  // console.log("function useHandelTag");
  // console.log("props =", props);
  // console.log("context =", context);

  // ============ DEPENDENCIES ============

  const tags = dep.tags;

  const stashTag = dep.stashTag;

  const isLock = dep.isLock;

  const editTagIndex = dep.editTagIndex;

  // ============== COMPUTED ==============

  const tagsGroupByTitle = computed(() => {
    // console.log("const tagsGroupByTitle = computed(() tags = ", tags);
    const result = [];

    tags.forEach((tag) => {
      let item = result.find((item) => {
        return tag.titleElm != null && tag.value != null && item.key == tag.key;
      });
      if (!item) {
        result.push(
          getTagsGroupByKeyModel({
            key: tag.key,
            custom: tag.custom,
            classList: tag.classList,
            values: [getTagsGroupByKeyValueModel(tag)],
            titleElm: tag.titleElm,
            valueElm: null,
          })
        );
      } else {
        item.values.push(getTagsGroupByKeyValueModel(tag));
      }
    });
    // console.log("const tagsGroupByTitle = computed(() result = ", result);

    return result;
  });

  // =============== METHODS ==============

  // const getTagValueByTagsGroupByTitleKey = (item = {}) => {
  //   return {
  //     index: item.index,
  //     key: item.key, // for value-render
  //     elm: item.valueElm,
  //     value: item.value,
  //     displayValue: item.displayValue,
  //   };
  // };

  const setStashTag = (item = {}) => {
    Object.assign(stashTag, { ...getTagModel(item) });
  };
  provide("appSetStashTag", setStashTag);

  const setTagToTags = (item = {}) => {
    console.log("setTagToTags");
    item.index = tags.length;
    tags.push({ ...getTagModel(item) });
    console.log("tags[0]", tags[0]);
    console.log("setTagToTags");
  };
  provide("appSetTagToTags", setTagToTags);

  const updateTag = (item = {}) => {
    if (editTagIndex.value == -1) return;

    const tag = tags[editTagIndex.value];

    if (tag == undefined) return;

    tag.value = item.value;
    tag.valueElm = item.valueElm || null;
    tag.displayValue = item.displayValue || true;
  };
  provide("appUpdateTag", updateTag);

  provide("appDeleteTags", (indexs = []) => {
    // console.log('provide("appDeleteTags", (indexs = []) => ', indexs);
    if (isLock.value == true) return;
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
  });

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
  provide("appIsDuplicateTag", isDuplicateTag);
  provide("appIsDuplicateTagByKey", isDuplicateTagByKey);

  return {
    tagsGroupByTitle,

    setStashTag,
    setTagToTags,
  };
}
