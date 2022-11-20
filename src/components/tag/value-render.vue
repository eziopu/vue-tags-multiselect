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
    <Render
      v-show="tag.custom == false || !editMyself"
      :elm="diplayElm()"
      :elmClass="{
        'tag__value--value': true,
        transition: app.transition,
        outline: noCustomeHoverAndEditMyself,
      }"
    />
    <input
      type="text"
      class="tag__value--input"
      v-show="editByinput"
      v-model="inputValue"
      ref="input"
      :style="{ width: inputWidth }"
      @keyup.delete="inputDelete()"
      @blur="inputBlur()"
    />
  </div>
</template>
<script>
import Render from "./render.vue";
import InjectApp from "../mixins/inject-app";

import { defineComponent } from "vue-demi";
export default defineComponent({
  name: "tag-value",
  mixins: [InjectApp],
  components: {
    Render,
  },
  props: {
    tag: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  model: {
    prop: "value",
    event: "update",
  },
  data() {
    return {
      isDelete: false,
      inputValue: "",
      nextWillDelete: false,
      nextKeydownWillChagneEditTag: false,
      keydownLeft: 0,
    };
  },
  computed: {
    editMyself() {
      const { app, tag } = this;
      return app.edit.index == tag.index;
    },
    inputWidth() {
      return (this.inputValue.length || 2) + 1 + "em";
    },
    appIsLock() {
      return this.app.isLock;
    },
    noCustomeHoverAndEditMyself() {
      if (this.appIsLock) return false;
      return this.editMyself && this.tag.custom == false;
    },
    editByinput() {
      return this.tag.custom == true && this.editMyself == true;
    },
  },
  watch: {
    inputValue(value) {
      this.app.edit.value = value;
      if (value != "") {
        this.nextWillDelete = false;
      }
    },
    editMyself(value) {
      if (value == true && this.tag.custom == true) {
        this.inputValue = this.tag.value;
        setTimeout(() => {
          this.$refs.input.focus();
        }, 100);
      }
    },
    "app.keydown": {
      handler(value) {
        if (this.editByinput == true) {
          this.handleKeydownLR(value.keyCode);
        }
        if (
          this.noCustomeHoverAndEditMyself == true &&
          [8, 46].indexOf(value.keyCode) > -1
        ) {
          // back space, del
          this.delete();
        }
        if (this.editMyself == false) return;
        if (value.isProcessing != false || value.keyCode != 13) return;
        this.inputEnter();
      },
      deep: true,
    },
    editByinput(value) {
      if (value == true) {
        this.app.current.lockKeydownLR = true;
        setTimeout(() => {
          this.nextKeydownWillChagneEditTag = this.isInputSelectionLimit();
        }, 100);
      } else {
        this.nextKeydownWillChagneEditTag = false;
      }
    },
  },
  methods: {
    diplayElm() {
      let { tag } = this;

      if (tag.displayValue == true || tag.elm == undefined) return tag.value;
      if (tag.elm.value != undefined) return tag.elm.value;
      if (tag.elm != undefined) return tag.elm;

      return tag.value;
    },
    handleKeydownLR(keyCode = 0) {
      setTimeout(() => {
        const selectionStart = this.$refs.input.selectionStart;
        if (
          this.nextKeydownWillChagneEditTag == true &&
          ((keyCode == 37 && selectionStart == 0) ||
            (keyCode == 39 && selectionStart == this.inputValue.length))
        ) {
          this.app.current.lockKeydownLR = false;
          this.nextKeydownWillChagneEditTag = false;
          this.app.handleKeydown(keyCode);
        }
        this.nextKeydownWillChagneEditTag = this.isInputSelectionLimit();
      }, 100);
    },
    isInputSelectionLimit() {
      const selectionStart = this.$refs.input.selectionStart;
      return selectionStart == 0 || selectionStart == this.inputValue.length
        ? true
        : false;
    },
    handleClick() {
      if (this.appIsLock == true) return;
      let { tag } = this;

      if (this.editMyself == false) {
        this.app.edit.index = tag.index;
        this.app.edit.key = tag.key;
        this.app.edit.value = tag.value;
        this.app.inputValue = "";
        this.app.setCurrentSelectLRIndex();
      }
    },
    inputEnter() {
      if (this.inputValue == "") {
        this.delete();
      } else {
        if (this.app.current.selectUDIndex == -1) {
          this.app.finish(this.inputValue);
        }
      }
    },
    inputDelete() {
      if (this.nextWillDelete == true) {
        this.delete();
      } else if (this.inputValue == "") {
        this.nextWillDelete = true;
      }
    },
    inputBlur() {
      if (this.inputValue == "") {
        this.delete();
      }
    },
    delete() {
      if (this.isDelete != true) {
        this.isDelete = true;
        this.app.deleteTags([this.tag.index]);
      }
    },
  },
});
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
