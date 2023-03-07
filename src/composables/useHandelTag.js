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
    console.log("const tagsGroupByTitle = computed(() => {");
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

  const getTagValueByTagsGroupByTitleKey = (item = {}) => {
    return {
      index: item.index,
      elm: item.elm.value,
      value: item.value,
      displayValue: item.displayValue,
    };
  };

  provide("setStashTag", (item = {}) => {
    console.log("////////setStashTag///////////", stashTag, item);
    Object.assign(dep.stashTag, item);
    console.log("////////setStashTag///////////", stashTag);
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

    init("provide setStashTagToTags");
    if (isAppActived.value == true) {
      elInput.value.focus();
    }
  });

  provide("appDeleteTags", (indexs = []) => {
    console.log('provide("appDeleteTags", (indexs = []) => {', indexs);
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

    console.log("tags.length");
    console.log(tags.length);
    arrayIndexByTags.forEach((index) => {
      console.log(tags[index]);
      delete tags[index];
    });
    console.log(tags.length);

    elInput.value.focus();
  });

  return {
    tagsGroupByTitle,
  };
}
