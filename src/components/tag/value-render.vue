<template>
  <div
    class="tag__value"
    :class="{
      editing: editMyself,
      pointer: appIsLock != true,
    }"
    tabindex="0"
    @click="handleClick"
  >
    <!-- {{ editMyself }} | -->
    <div
      v-show="tag.custom == false || !editByinput"
      class="tag__value--content"
      :class="{
        transition: appProps.transition,
        outline: editMyself,
      }"
      v-html="diplayElm()"
      tabindex="0"
      @blur="elDivBlur"
    />
    <input
      type="text"
      class="tag__value--input"
      v-show="editByinput"
      v-model="inputValue"
      ref="elInput"
      :style="{ width: inputWidth }"
      @keyup.delete="elInputDelete()"
      @blur="elInputBlur()"
    />
  </div>
</template>
<script>
// import Render from "./render.vue";

import { ref, computed, inject, watch } from "vue";

export default {
  name: "v-tag-value",
  // components: {
  //   Render,
  // },
  props: {
    tag: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    const inputValue = ref("");
    const nextWillDelete = ref(false);
    const nextKeydownWillChagneEditTag = ref(false);

    const elInput = ref(null);

    const appProps = inject("appProps");
    const appIsLock = inject("appIsLock");
    const appElInputValue = inject("appElInputValue");
    const appKeydown = inject("appKeydown");
    const appEditTagIndex = inject("appEditTagIndex");
    const appDeleteTags = inject("appDeleteTags");
    const appsetTagToTags = inject("appsetTagToTags");

    // ============== COMPUTED ==============

    const inputWidth = computed(() => {
      return (inputValue.value.length || 2) + 1 + "em";
    });
    const editMyself = computed(() => {
      return appEditTagIndex.value == props.tag.index;
    });
    const noCustomeHoverAndEditMyself = computed(() => {
      if (appIsLock.value) return false;
      return editMyself.value == true && props.tag.custom == false;
    });
    const editByinput = computed(() => {
      return props.tag.custom == true && editMyself.value == true;
    });

    // ============== WATCH ==============

    watch(inputValue, (value) => {
      if (value != "") {
        nextWillDelete.value = false;
      }
    });

    watch(editMyself, (value) => {
      if (value == true && props.tag.custom == true) {
        inputValue.value = props.tag.value;
        setTimeout(() => {
          elInput.value.focus();
        }, 100);
      }
    });

    watch(
      appKeydown,
      (value) => {
        if (editByinput.value == true) {
          handleKeydownLR(value.keyCode);
        }
        if (
          noCustomeHoverAndEditMyself.value == true &&
          [8, 46].indexOf(value.keyCode) > -1
        ) {
          // back space, del
          deleteTag();
        }
        if (editMyself.value == false) return;
        if (value.keyCode != 13) return;
        elInputEnter();
      },
      {
        deep: true,
      }
    );

    watch(editByinput, (value) => {
      if (value == true) {
        appKeydown.lockLR = true;
        setTimeout(() => {
          nextKeydownWillChagneEditTag.value = this.isInputSelectionLimit();
        }, 100);
      } else {
        nextKeydownWillChagneEditTag.value = false;
      }
    });

    // ============== METHODS ==============
    const handleKeydownLR = (keyCode = 0) => {
      setTimeout(() => {
        const selectionStart = elInput.value.selectionStart;
        if (
          nextKeydownWillChagneEditTag.value == true &&
          ((keyCode == 37 && selectionStart == 0) ||
            (keyCode == 39 && selectionStart == inputValue.value.length))
        ) {
          appKeydown.lockLR = false;
          nextKeydownWillChagneEditTag.value = false;
          // this.app.handleKeydown(keyCode);
        }
        nextKeydownWillChagneEditTag.value = isInputSelectionLimit();
      }, 100);
    };

    const isInputSelectionLimit = () => {
      const selectionStart = elInput.value.selectionStart;
      return selectionStart == 0 || selectionStart == inputValue.value.length
        ? true
        : false;
    };

    const diplayElm = () => {
      if (props.tag.displayValue == true || props.tag.valueElm == undefined)
        return props.tag.value;
      if (props.tag.valueElm != undefined) return props.tag.valueElm;

      return props.tag.value;
    };

    const deleteTag = () => {
      appDeleteTags([props.tag.index]);
    };

    const elInputDelete = () => {
      if (nextWillDelete.value == true) {
        deleteTag();
      } else if (inputValue.value == "") {
        nextWillDelete.value = true;
      }
    };
    const elInputBlur = () => {
      if (inputValue.value == "") {
        deleteTag();
      }
    };

    const appSetStashTag = inject("appSetStashTag");
    const handleClick = (event) => {
      event.preventDefault();
      if (appIsLock.value == true) return;

      if (editMyself.value == false) {
        appEditTagIndex.value = props.tag.index;
        appElInputValue.value = "";
        appSetStashTag(props.tag);
        // this.app.setCurrentSelectLRIndex();
        appEnable();
      }
    };
    const elInputEnter = () => {
      if (inputValue.value == "") {
        deleteTag();
      } else {
        if (appKeydown.UDIndex == -1) {
          appsetTagToTags(inputValue.value);
        }
      }
    };

    const appBlur = inject("appBlur");
    const appEnable = inject("appEnable");

    const elDivBlur = () => {
      console.log("elDivBlur", props.tag.value);
      appBlur();
    };

    return {
      appProps,
      appIsLock,
      inputValue,
      inputWidth,
      editByinput,
      editMyself,
      noCustomeHoverAndEditMyself,

      diplayElm,
      deleteTag,
      handleClick,
      elDivBlur,
      elInputDelete,
      elInputBlur,
      elInputEnter,
    };
  },
};
</script>

<style lang="scss" scoped>
.tag__value {
  &.pointer {
    cursor: pointer;
  }

  .tag__value--input {
    line-height: 0em;
  }

  .tag__value--content {
    &.transition:after {
      transform-origin: 0% 50%;
      transition: transform 250ms ease-in-out;
    }
    &:after {
      display: block;
      content: "";
      outline: solid 1px;
      transform: scaleX(0);
    }
    &.outline:after {
      transform: scaleX(1);
    }
  }
}
</style>
