import { reactive, provide } from "vue";
import { getTagModel, getAppCallOptionSetTag } from "../models";

export default function useEventSetTag(props, _context, dep) {
  // ============== DATA ==============

  const appIsLock = dep.appIsLock;

  const dropdownStatus = dep.dropdownStatus;

  const isEditMode = dep.isEditMode;

  const stashTag = dep.stashTag;

  const appCallOptionSetTag = reactive(getAppCallOptionSetTag());

  provide("appCallOptionSetTag", appCallOptionSetTag);

  // ============== METHODS ==============

  const focusApp = dep.focusApp;

  const updateTag = dep.updateTag;

  const isDuplicateTag = dep.isDuplicateTag;

  const setStashTag = dep.setStashTag;

  const setTagToTags = dep.setTagToTags;

  const tagsGroupByKey = dep.tagsGroupByKey;

  const callOptionSetTag = (item = {}) => {
    Object.assign(appCallOptionSetTag, { ...getAppCallOptionSetTag(item) });
  };

  provide("appCallOptionSetTagFinish", () => {
    if (appCallOptionSetTag.valueIsCustome == true) {
      mergeStashTagToFinish({ value: appCallOptionSetTag.value });
    }
    callOptionSetTag();
  });

  const getIsMach = (inputKey = "", inputValue = "") => {
    // dep.log("///////getIsMach/////////", inputKey, inputValue);
    let isMachKey = false;
    let isMachValue = false;
    if (inputKey != "") {
      // const dropdownStatus = { country: { isDown: true, isAllOptionSelected: true }, country2: { isDown: false, isAllOptionSelected: false }, ... } (reactive)
      const targetDropdown = dropdownStatus[inputKey];
      if (targetDropdown != undefined) {
        isMachKey =
          typeof targetDropdown == "object" &&
          Object.keys(targetDropdown).length != 0;
        isMachValue = targetDropdown.values.includes(inputValue);
      }
    }
    return { key: isMachKey, value: isMachValue };
  };

  /**
   * parameter object <tagModel>
   * retunt void
   **/
  const mergeStashTagToFinish = (input = {}) => {
    const newTag = {
      value: input.value,
      displayValue: true,
    };
    if (input.titleElm) {
      newTag.titleElm = input.titleElm || null;
    }
    setTagToTags({
      ...stashTag,
      ...newTag,
    });
    setStashTag();
    focusApp("mergeStashTagToFinish()");
  };

  const pushTag = (item = {}) => {
    const input = getTagModel(item);
    dep.log(
      {
        context: "pushTag method starts working after receiving the parameter",
        parameter: item,
      },
      "info"
    );
    try {
      if (input.value == "") throw ["error", "value is empty"];
      if (appIsLock.value == true) throw ["error", "app is lock"];

      const targetKey =
        input.key == null && stashTag.key != null ? stashTag.key : input.key;

      dep.log("0000", targetKey);

      // 是否已存在
      if (isDuplicateTag(targetKey, input.value)) {
        // 例外狀況, 編輯中 且該tagkey 只有一個時 不回傳錯誤
        // const tagsGroupByKey = { "country": ["val1", "val2"], "country2": ["val1"] } (computed)
        const isPass =
          isEditMode.value == true &&
          tagsGroupByKey.value[targetKey].length == 1;
        if (isPass == false) {
          throw ["error", "value is repeat"];
        }
      }

      // 是否有對應的value
      const isMach = getIsMach(targetKey, input.value);
      if (isMach.value == true) {
        dep.log("2222222");
        // 有對應的value 請求 該option 觸發自動點擊
        callOptionSetTag({ key: targetKey, value: input.value });
        throw ["success", "callOptionSetTag()"];
      }

      if (
        stashTag.key != null &&
        (input.key == stashTag.key || input.key == null)
      ) {
        dep.log(
          "333333 stashTag.key != null && (input.key == stashTag.key || input.key == null)"
        );

        // 編輯模式
        if (isEditMode.value == true) {
          dep.log("444444");
          updateTag({
            value: input.value,
            displayValue: true,
          });
          focusApp("updateTag()");
          throw ["success", "updateTag()"];
        } else {
          // 選擇中
          dep.log("555");
          mergeStashTagToFinish(input);
          throw ["success", "mergeStashTag()"];
        }
      }

      // input 自己有key 且 有對應的key
      const isInputKeyMach = getIsMach(input.key, input.value);
      if (isInputKeyMach.key == true) {
        callOptionSetTag({
          key: input.key,
          value: input.value,
          valueIsCustome: isInputKeyMach.value == false,
        });
        throw ["success", "callOptionSetTag()"];
      }

      if (props.create == false) {
        throw ["error", "key not found and props create is false"];
      } else {
        // dep.log("111111111111111111");
        input.displayValue = true;
        setTagToTags(input);
        setStashTag();
        throw ["success", "setStashTag()"];
      }
    } catch (result) {
      dep.log("resultresultresult", result);
      if (result[0] == "error") {
        dep.log("[v-tags-multiselect]: methods pushTag() error");
        dep.log(result[1]);
      }
    }
  };

  return {
    pushTag,
  };
}
