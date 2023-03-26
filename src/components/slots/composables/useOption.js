import { ref, computed, onMounted } from "vue";

export default function useDropdown(props, context, dep) {
  // ================ INJECTs ================

  const app = dep.app;

  const dropdown = dep.dropdown;

  // ============== DATA ==============

  const isHover = ref(false);

  // ============== COMPUTED ==============

  const isDisabled = computed(() => {
    if (props.title == true) {
      return props.disabled;
    }
    return props.disabled || dropdown.props.disabled || app.props.disabled;
  });

  const isDuplicate = computed(() => {
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

  const isHide = computed(() => {
    const isTitle = props.title;
    // 已被選取
    if (isDuplicate.value == true) {
      return true;
    }

    // 編輯模式
    if (app.editTagIndex.value != -1) {
      if (isTitle) {
        return true;
      }
      return app.stashTag.key != dropdown.props.value ? true : false;
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

    return false;
  });

  const handleClick = dep.handleClick;

  onMounted(() => {
    if (props.selected == true) {
      handleClick();
    }
  });

  return {
    props,
    isDisabled,
    isHover,
    isHide,
  };
}
