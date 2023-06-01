import { ref, reactive, provide, computed, watch } from "vue";
import {
  getTagModel,
  getTagsGroupByKeyModel,
  getTagsGroupByKeyValueModel,
} from "../models";

export default function useTag(props, context, dep) {
  // ============== DATA ==============

  const tags = reactive([]);

  const stashTag = reactive(getTagModel());

  const editTagIndex = ref(-1);

  const appCallOptionClick = reactive({ key: "", value: "" });

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
    tag.displayValue = !!item.displayValue;
  };

  const deleteTags = (indexs = []) => {
    if (indexs.length == 0) return;

    // indexs.sort((a, b) => b - a);

    for (const index of indexs) {
      // Do not use splice.
      // deleting or updating tag by index may affect the calculation of the index.
      delete tags[index];
      // tags.splice(index, 1);
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

  // ============== Event ==============
  const callOptionClick = (inputValue = "", inputKey = "") => {
    appCallOptionClick.key = inputKey;
    appCallOptionClick.value = inputValue;
    console.log("  pushValue: app call option click to do");
  };

  const getIsMach = (inputValue = "", inputKey = "") => {
    const dropdownStatus = dep.dropdownStatus;
    let isMachKey = false;
    let isMachValue = false;
    if (inputKey != "") {
      const targetDropdown = dropdownStatus[inputKey];
      isMachKey =
        typeof targetDropdown == "object" &&
        Object.keys(targetDropdown).length != 0;
      isMachValue = targetDropdown.values.includes(inputValue);
    }
    return { key: isMachKey, value: isMachValue };
  };

  const appIsLock = dep.appIsLock;
  // const dropdownStatus = { country: { isDown: true, isAllOptionSelected: true }, country2: { isDown: false, isAllOptionSelected: false }, ... } (reactive)
  const pushValue = (inputValue = "", inputKey = "") => {
    try {
      if (inputValue == "") throw "value is empty";
      if (appIsLock.value == true) throw "app is lock";

      // 只有value 沒有inputKey
      if (inputKey == "") {
        if (stashTag.key != "") {
          // 編輯模式
          if (isEditMode.value == true) {
            updateTag({
              value: inputValue,
            });
            throw "";
          }

          // 選擇中
          if (stashTag.key != null && stashTag.value == null) {
            // 是否已存在
            if (isDuplicateTag(stashTag.key, inputValue)) {
              throw "value is repeat";
            }

            // 是否有對應的value
            const isMach = getIsMach(stashTag.key, inputValue);
            if (isMach.value == true) {
              // 請求 該option 觸發自動點擊
              callOptionClick(inputValue, stashTag.key);
              throw "";
            } else {
              setStashTag({ value: inputValue, displayValue: true });
              setTagToTags();
              console.log("  pushValue: app setStashTag");
              throw "";
            }
          }
        }
      }

      // 只有value 沒有inputKey
      if (inputKey != "") {
        // 是否有對應的value
        const isMach = getIsMach(inputKey, inputValue);

        if (isMach.value) {
          // 請求 該option 觸發自動點擊
          callOptionClick(inputValue, stashTag.key);
        }

        if (isMach.key == false && props.create == false) {
          throw "key not found and props create is false";
        } else {
          setStashTag({ key: inputKey, value: inputValue, displayValue: true });
          setTagToTags();
        }
      }
    } catch (error) {
      if (error) {
        console.log("[v-tags-multiselect]: event pushValue error");
        console.log(error);
      }
    }
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

    deleteTags,
    setStashTag,
    setTagToTags,

    pushValue,
  };
}
