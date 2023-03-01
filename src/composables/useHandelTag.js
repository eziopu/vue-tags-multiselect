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

  const inputValue = dep.inputValue;

  const editTagIndex = dep.editTagIndex;

  // ============== COMPUTED ==============

  const tagsGroupByTitle = computed(() => {
    let result = [];

    tags.forEach((tag) => {
      let item = result.find((item) => {
        return (
          tag.elm.title != undefined &&
          tag.value != undefined &&
          item.key == tag.key
        );
      });
      if (!item) {
        result.push({
          key: tag.key,
          custom: tag.custom,
          classList: tag.classList,
          values: [getTagValueByTagsGroupByTitleKey(tag)],
          elm: { title: tag.elm.title },
        });
      } else {
        item.values.push(getTagValueByTagsGroupByTitleKey(tag));
      }
    });
    return result;
  });

  // =============== METHODS ==============

  const getTagValueByTagsGroupByTitleKey = (tag = {}) => {
    return {
      elm: tag.elm.value,
      value: tag.value,
      displayValue: tag.displayValue,
    };
  };

  provide("setStashTag", (item = {}) => {
    Object.assign(stashTag, item);
  });

  provide("setStashTagToTags", () => {
    if (isEditMode.value == true) {
      const tags = tags[editTagIndex.value];

      if (inputValue.value != "") {
        tags.value = inputValue.value;
        tags.elm.value = undefined;
        tags.displayValue = true;
      } else {
        tags.value = stashTag.value;
        tags.elm.value = stashTag.elm.value;
        tags.displayValue = stashTag.displayValue;
      }
    } else {
      if (inputValue.value != "") {
        stashTag.value = inputValue.value;
        stashTag.displayValue = true;
      }
      stashTag.index = tags.length;
      tags.push(stashTag);
    }

    init();
    if (isAppActived.value == true) {
      elInput.value.focus();
    }
  });

  provide("deleteTags", (indexs = []) => {
    if (isLock.value == true) return;
    if (indexs.length == 0) return;

    let arrayIndexByTags = [];
    tags.forEach((tag, index) => {
      if (indexs.indexOf(tag.index) != -1) {
        arrayIndexByTags.push(index);
      }
    });

    arrayIndexByTags = arrayIndexByTags.sort((a, b) => {
      return b - a;
    });

    arrayIndexByTags.forEach((index) => {
      delete tags[index];
    });

    elInput.value.focus();
  });

  return {
    tagsGroupByTitle,
  };
}
