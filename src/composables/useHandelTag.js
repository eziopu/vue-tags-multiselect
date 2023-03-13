import { provide, computed } from "vue";

export default function useHandelTag(props, context, dep) {
  console.log("function useHandelTag");
  console.log("props =", props);
  console.log("context =", context);

  // ============ DEPENDENCIES ============

  const tags = dep.tags;

  const stashTag = dep.stashTag;

  const init = dep.init;

  const isLock = dep.isLock;

  const isEditMode = dep.isEditMode;

  const isAppActived = dep.isAppActived;

  const elInput = dep.elInput;

  const editTagIndex = dep.editTagIndex;

  // ============== COMPUTED ==============

  const tagsGroupByTitle = computed(() => {
    console.log("const tagsGroupByTitle = computed(() tags = ", tags);
    const result = [];

    tags.forEach((tag) => {
      let item = result.find((item) => {
        return (
          tag.titleElm != null &&
          tag.value != null &&
          item.key == tag.key
        );
      });
      if (!item) {
        result.push({
          key: tag.key,
          custom: tag.custom,
          classList: tag.classList,
          values: [getTagValueByTagsGroupByTitleKey(tag)],
          titleElm: tag.titleElm,
          valueElm: null,
        });
      } else {
        item.values.push(getTagValueByTagsGroupByTitleKey(tag));
      }
    });
    console.log("const tagsGroupByTitle = computed(() result = ", result);

    return result;
  });

  // =============== METHODS ==============

  const getTagValueByTagsGroupByTitleKey = (item = {}) => {
    return {
      index: item.index,
      key: item.key, // for value-render
      elm: item.valueElm,
      value: item.value,
      displayValue: item.displayValue,
    };
  };

  const setStashTag = (item = {}) => {
    Object.assign(dep.stashTag, item);
  };
  provide("setStashTag", setStashTag);

  const setStashTagValue = (value) => {
    if (isEditMode.value == true) {
      console.log("  11111111");
      const tags = tags[editTagIndex.value];

      if (value != "") {
        tags.value = value;
        tags.valueElm = undefined;
        tags.displayValue = true;
      } else {
        tags.value = stashTag.value;
        tags.valueElm = stashTag.valueElm;
        tags.displayValue = stashTag.displayValue;
      }
    } else {
      console.log("  222222");
      if (value != "") {
        console.log("  33333");
        stashTag.value = value;
        stashTag.displayValue = true;
      }
    }
  };
  provide("setStashTagValue", setStashTagValue);

  const setStashTagToTags = () => {
    console.log("  setStashTagToTags");
    stashTag.index = tags.length;
    tags.push({ ...stashTag });

    init("provide setStashTagToTags");
    if (isAppActived.value == true) {
      elInput.value.focus();
    }
  };
  provide("setStashTagToTags", setStashTagToTags);

  provide("appDeleteTags", (indexs = []) => {
    console.log('provide("appDeleteTags", (indexs = []) => ', indexs);
    if (isLock.value == true) return;
    if (indexs.length == 0) return;

    let arrayIndexByTags = [];
    tags.forEach((tag, index) => {
      if (indexs.indexOf(tag.index) != -1) {
        arrayIndexByTags.push(index);
      }
    });

    console.log(arrayIndexByTags);
    arrayIndexByTags = arrayIndexByTags.sort((a, b) => {
      return b - a;
    });

    arrayIndexByTags.forEach((index) => {
      delete tags[index];
    });

    init("appDeleteTags");

    elInput.value.focus();
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
    return tags.find((tagKeyName) => tagKeyName == keyName)
      ? true
      : false;
  };

  provide("appTags", tags);
  provide("appIsDuplicateTag", isDuplicateTag);
  provide("appIsDuplicateTagByKey", isDuplicateTagByKey);

  return {
    tagsGroupByTitle,

    setStashTag,
    setStashTagValue,
    setStashTagToTags,
  };
}
