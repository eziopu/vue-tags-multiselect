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
    // console.log("///////getIsMach/////////", inputKey, inputValue);
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

  /**
   * parameter object <tagModel>
   * retunt string
   **/
  const handleNoKey = (input = {}) => {
    // console.log("handleNoKey");
    let result = "";

    try {
      // 選擇中
      if (stashTag.key != null && stashTag.value == null) {
        // console.log("2222222", stashTag.key);

        // 是否已存在
        if (isDuplicateTag(stashTag.key, input.value)) {
          // console.log("55555");
          throw "value is repeat";
        }

        // 編輯模式ing
        if (isEditMode.value == true) {
          // console.log("33333");
          updateTag({
            value: input.value,
            displayValue: true,
          });
          throw "";
        }

        // console.log("444444");

        // 是否有對應的value
        const isMach = getIsMach(stashTag.key, input.value);
        if (isMach.value == true) {
          // console.log("6666");
          // 有對應的value 請求 該option 觸發自動點擊
          callOptionSetTag({ key: stashTag.key, value: input.value });
          throw "";
        } else {
          // console.log("7777");
          mergeStashTagToFinish(input);

          // console.log("  pushTag: app setTagToTags");
          throw "";
        }
      }
    } catch (response) {
      result = response;
    }

    return result;
  };

  /**
   * parameter object <tagModel>
   * retunt string
   **/
  const handleHasKey = (input = {}) => {
    // console.log("handleHasKey");
    let result = "";

    // 編輯模式ing
    if (isEditMode.value == true && input.key == stashTag.key) {
      updateTag({
        value: input.value,
        displayValue: true,
      });
      result = "finish";
      focusApp("handleHasKey()");

    } else {
      // 是否有對應的value
      const isMach = getIsMach(input.key, input.value);
      if (isMach.key == true) {
        callOptionSetTag({
          key: input.key,
          value: input.value,
          valueIsCustome: isMach.value == false,
        });
        result = "finish";
      }
    }

    return result;
  };

  const pushTag = (item = {}) => {
    const input = getTagModel(item);
    // console.log("pushTag(", input, ")");
    try {
      if (input.value == "") throw "value is empty";
      if (appIsLock.value == true) throw "app is lock";
      // console.log("00000");

      // 有value 沒有key
      if (input.key == "") {
        const result = handleNoKey(input);
        if (result != "") {
          throw result;
        }
      }

      // 有value 有key
      // console.log("yyyyyyyyy");
      if (input.key != "") {
        const result = handleHasKey(input);
        // console.log("yyyyyyyyy2222 result=", result);
        if (result != "") {
          throw result;
        }
      }

      if (props.create == false) {
        throw "key not found and props create is false";
      } else {
        // console.log("111111111111111111");
        input.displayValue = true;
        setTagToTags(input);
        setStashTag();
        throw "";
      }
    } catch (error) {
      if (error != "finish" && error != "") {
        console.log("[v-tags-multiselect]: event pushTag error");
        console.log(error);
      }
    }
  };

  return {
    pushTag,
  };
}
