import { ref, watch, computed, inject, onMounted } from "vue";

export default function useDropdown(props, _context, dep) {
  // ============== INJECTs ================

  const app = dep.app;

  const dropdown = dep.dropdown;

  // ============== DATA ==============

  const isHover = ref(false);

  // ============== COMPUTED ==============

  const isCanSearch = dep.isCanSearch;

  const isSearchable = dep.isSearchable;

  const isDisabled = computed(() => {
    if (dropdown.props.disabled == true) {
      return true;
    }
    return props.disabled || app.props.disabled;
  });

  const isSelected = computed(() => {
    return app.tags.find((tag) => {
      return (
        tag != undefined &&
        tag.key == dropdown.props.value &&
        tag.value == props.value
      );
    })
      ? true
      : false;
  });

  const isSelectedByKey = computed(() => {
    return app.tags.find((tag) => {
      return tag != undefined && tag.key == dropdown.props.value;
    })
      ? true
      : false;
  });

  const isHidden = computed(() => {
    if (dropdown.props.system == true) {
      return false;
    }

    const isTitle = props.title;
    // 已被選取
    if (isSelected.value == true) {
      return true;
    }

    // 編輯模式
    if (app.editTagIndex.value != -1) {
      if (isTitle) {
        return true;
      }
      return app.stashTag.key != dropdown.props.value ? true : false;
    }

    // selecting no key
    if (app.conjunction.value == "AND" || app.conjunction.value == "") {
      if (isSelectedByKey.value == true) {
        return true;
      }
    }

    // dropdown 已全部選擇過 且未啟用custom
    if (dropdown.isDown.value == true) {
      return true;
    }

    // 一般選擇情境
    if (app.stashTag.key != undefined) {
      if (app.stashTag.key != dropdown.props.value) {
        return true;
      } else {
        return isTitle ? true : false;
      }
    }

    if (isCanSearch.value == true) {
      if (isTitle == true) {
        return dropdown.isAnyOptionBeSearched.value == true
          ? false
          : !isSearchable.value;
      } else {
        return !isSearchable.value;
      }
    }

    if (isTitle == false) {
      return !dropdown.displayAll.value;
    }

    return false;
  });

  // ============== Init to selected ====================

  const handleClick = dep.handleClick;

  const log = inject("log");
  const log2 = inject("log2");
  onMounted(() => {
    if (props.selected == true) {
      log(`option(key:${dropdown.props.value}, value:${props.value})`);
      log2(`props.selected is true`);
      log2(`the tag will be automatically generated`);
      handleClick();
    }
  });

  // ============== App request option to click ====================

  if (props.value != "") {
    const appRequestOptionClick = inject("appRequestOptionClick");
    const appRequestOptionClickInit = inject("appRequestOptionClickInit");
    watch(
      appRequestOptionClick,
      (value) => {
        if (value.key == dropdown.props.value && value.value == props.value) {
          handleClick();
          appRequestOptionClickInit();
        }
      },
      { immediate: true }
    );
  }

  return {
    props,
    isDisabled,
    isSelected,
    isHover,
    isHidden,
  };
}
