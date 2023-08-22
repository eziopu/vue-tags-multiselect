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
    if (props.title == true) {
      return props.disabled;
    }
    return props.disabled || dropdown.props.disabled || app.props.disabled;
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

  const isHide = computed(() => {
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
      return !isSearchable.value;
    }

    return false;
  });

  // ================= Init to selected ====================

  const handleClick = dep.handleClick;

  const log = inject("log");
  onMounted(() => {
    if (props.selected == true) {
      log(`option(key:${dropdown.props.value}, value:${props.value})`);
      console.log(`  > props.selected is true`);
      console.log(`  > the tag will be automatically generated`);
      handleClick();
    }
  });

  // ================= App request option to click ====================

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
    isHide,
  };
}
