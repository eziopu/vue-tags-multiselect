import { reactive, provide } from "vue";

export default function useEventSetTag(props, _context, dep) {
  // ============== DATA ==============

  const appIsLock = dep.appIsLock;

  const dropdownStatus = dep.dropdownStatus;

  const isEditMode = dep.isEditMode;

  const stashTag = dep.stashTag;

  const appCallDrodownSetTag = reactive({ key: "", value: "" });

  provide("appCallDrodownSetTag", appCallDrodownSetTag);

  // ============== METHODS ==============

  const focusApp = dep.focusApp;

  const updateTag = dep.updateTag;

  const isDuplicateTag = dep.isDuplicateTag;

  const setStashTag = dep.setStashTag;

  const setTagToTags = dep.setTagToTags;

  const callDrodownSetTag = (inputValue = "", inputKey = "") => {
    appCallDrodownSetTag.key = inputKey;
    appCallDrodownSetTag.value = inputValue;
  };

  const getIsMach = (inputValue = "", inputKey = "") => {
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

  const pushValue = (inputValue = "", inputKey = "") => {
    console.log("pushValue(", inputValue, inputKey, ")");
    try {
      if (inputValue == "") throw "value is empty";
      if (appIsLock.value == true) throw "app is lock";
      console.log("00000");

      // 只有value 沒有inputKey
      if (inputKey == "") {
        console.log("11111");

        // 選擇中
        if (stashTag.key != null && stashTag.value == null) {
          console.log("2222222", stashTag.key);

          // 是否已存在
          if (isDuplicateTag(stashTag.key, inputValue)) {
            console.log("55555");
            throw "value is repeat";
          }

          // 編輯模式ing
          if (isEditMode.value == true) {
            console.log("33333");
            updateTag({
              value: inputValue,
              displayValue: true,
            });
            throw "";
          }

          console.log("444444");

          // 是否有對應的value
          const isMach = getIsMach(inputValue, stashTag.key);
          if (isMach.value == true) {
            console.log("6666");
            // 請求 該option 觸發自動點擊
            callDrodownSetTag(inputValue, stashTag.key);
            throw "";
          } else {
            console.log("7777");
            setTagToTags({
              ...stashTag,
              ...{ value: inputValue, displayValue: true },
            });
            setStashTag();
            focusApp("7777");

            console.log("  pushValue: app setTagToTags");
            throw "";
          }
        }
      }

      // 只有value 沒有inputKey
      if (inputKey != "") {
        console.log("8888");
        // 是否有對應的value
        const isMach = getIsMach(inputValue, inputKey);

        if (isMach.key == true) {
          // 請求 該option 觸發自動點擊
          console.log("9999");
          callDrodownSetTag(inputValue, inputKey);
          throw "";
        }
      }

      if (props.create == false) {
        console.log("10001000");
        throw "key not found and props create is false";
      } else {
        console.log("111111111111111111");
        const newTag = {
          value: inputValue,
          displayValue: true,
        };
        if (inputKey != "") {
          newTag.key = inputKey;
        }
        setTagToTags(newTag);
        setStashTag();
        throw "";
      }
    } catch (error) {
      if (error) {
        console.log("[v-tags-multiselect]: event pushValue error");
        console.log(error);
      }
    }
  };

  return {
    pushValue,
  };
}
