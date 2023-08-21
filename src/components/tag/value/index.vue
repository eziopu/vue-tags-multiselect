<template>
  <div
    class="tag__value"
    :class="{
      editing: editMyself,
      pointer: isEditVisible,
    }"
    :data-index="tag.index"
    tabindex="0"
    @click="handleClick"
  >
    <!-- {{ isInputValueRepeat }} | -->
    <div v-if="editByinput && isInputValueRepeat" class="tag__value--warning">
      {{ appPlaceholders.tagValueRepeat }}
    </div>

    <div
      v-show="tag.custom == false || !editByinput"
      class="tag__value--content"
      :class="{
        transition: appProps.transition,
        outline: editMyself,
      }"
      v-html="diplayElm()"
      tabindex="0"
      ref="elTagValueContent"
      @blur="blur"
    />
    <input
      type="text"
      class="tag__value--input"
      :class="{ error: isInputValueRepeat }"
      v-show="editByinput"
      v-model="inputValue"
      ref="elInput"
      :style="{ width: inputWidth }"
      @keyup="handleKeyup"
      @focus="elInputFocus"
      @blur="elInputBlur"
    />
  </div>
</template>
<script>
import resolve from "../../../utils/resolve";
import useDelete from "./composables/useDelete";
import useInput from "./composables/useInput";
import useValue from "./composables/useValue";
import useKeyboard from "./composables/useKeyboard";

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
      ...resolve(props, context, [useDelete, useInput, useValue, useKeyboard]),
    };
  },
};
</script>

<style lang="scss" scoped>
.tag__value {
  &:focus,
  .tag__value--content:focus {
    outline: none;
  }

  &.pointer {
    cursor: pointer;
  }

  .tag__value--input {
    outline: none;
    line-height: 0em;
    transition: color 0.2s ease-in-out;

    &.error,
    &.error:focus {
      border: 1px solid red;
      animation: shake 0.2s;
      color: transparent;
    }
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

  .tag__value--warning {
    position: absolute;
    left: 10px;
    z-index: 1;
    text-shadow: 0px 0px 4px red;
  }

  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-2px);
    }
    50% {
      transform: translateX(2px);
    }
    75% {
      transform: translateX(-2px);
    }
    100% {
      transform: translateX(0);
    }
  }
}
</style>
