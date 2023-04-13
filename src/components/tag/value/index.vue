<template>
  <div
    class="tag__value"
    :class="{
      editing: editMyself,
      pointer: appIsLock != true,
    }"
    tabindex="0"
    ref="elTagValue"
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
import resolve from "../../../utils/resolve";
import useDelete from "./composables/useDelete";
import useInput from "./composables/useInput";
import useValue from "./composables/useValue";

export default {
  name: "v-tag-value",
  props: {
    tag: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props, context) {
    const diplayElm = () => {
      const tag = props.tag;
      if (tag.displayValue == true || tag.valueElm == undefined) {
        return tag.value;
      }

      if (tag.valueElm != undefined) {
        return tag.valueElm;
      }

      return tag.value;
    };

    return {
      diplayElm,
      ...resolve(props, context, [useDelete, useInput, useValue]),
    };
  },
};
</script>

<style lang="scss" scoped>
.tag__value {
  &:focus {
    outline: none;
  }

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
