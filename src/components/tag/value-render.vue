<template>
  <div
    class="tag__value"
    :tabindex="-1"
    :class="{
      editing: editMyself,
      pointer: appIsLock != true,
    }"
    @click="handleClick"
  >
    <div
      v-show="tag.custom == false || !editMyself"
      :class="{
        'tag__value--value': true,
        transition: appProps.transition,
        outline: noCustomeHoverAndEditMyself,
      }"
      v-html="diplayElm()"
    />
    <input
      type="text"
      class="tag__value--input"
      v-show="editByinput"
      v-model="inputValue"
      ref="elTagValueInput"
      :style="{ width: inputWidth }"
      @keyup.delete="elTagValueInputDelete()"
      @blur="elTagValueInputBlur()"
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

    const elTagValueInput = ref(null);

    const appProps = inject("appProps");
    const appIsLock = inject("appIsLock");
    const appInputValue = inject("appInputValue");
    const appKeydown = inject("appKeydown");
    const appEeditTagIndex = inject("appEeditTagIndex");
    const appDeleteTags = inject("appDeleteTags");
    const setStashTagToTags = inject("setStashTagToTags");

    // ============== COMPUTED ==============

    const inputWidth = computed(() => {
      return (inputValue.value.length || 2) + 1 + "em";
    });
    const editMyself = computed(() => {
      return appEeditTagIndex.value == props.tag.index;
    });
    const noCustomeHoverAndEditMyself = computed(() => {
      if (appIsLock.value) return false;
      return editMyself.value && props.tag.custom == false;
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
          elTagValueInput.value.focus();
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
        elTagValueInputEnter();
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
        const selectionStart = elTagValueInput.value.selectionStart;
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
      const selectionStart = elTagValueInput.value.selectionStart;
      return selectionStart == 0 || selectionStart == inputValue.value.length
        ? true
        : false;
    };

    const diplayElm = () => {
      if (props.tag.displayValue == true || props.tag.elm == undefined)
        return props.tag.value;
      if (props.tag.elm.value != undefined) return props.tag.elm.value;
      if (props.tag.elm != undefined) return props.tag.elm;

      return props.tag.value;
    };

    const deleteTag = () => {
      appDeleteTags([props.tag.index]);
    };

    const elTagValueInputDelete = () => {
      if (nextWillDelete.value == true) {
        deleteTag();
      } else if (inputValue.value == "") {
        nextWillDelete.value = true;
      }
    };
    const elTagValueInputBlur = () => {
      if (inputValue.value == "") {
        deleteTag();
      }
    };

    const setStashTag = inject("setStashTag");
    const handleClick = () => {
      if (appIsLock.value == true) return;

      if (editMyself.value == false) {
        appEeditTagIndex.value = props.tag.index;
        appInputValue.value = "";
        setStashTag(props.tag);
        // this.app.setCurrentSelectLRIndex();
      }
    };
    const elTagValueInputEnter = () => {
      if (inputValue.value == "") {
        deleteTag();
      } else {
        if (appKeydown.UDIndex == -1) {
          setStashTagToTags(inputValue.value);
        }
      }
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
      elTagValueInputDelete,
      elTagValueInputBlur,
      elTagValueInputEnter,
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

  .tag__value--value {
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
