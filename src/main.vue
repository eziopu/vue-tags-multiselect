<template>
  <div
    class="vue-tags-multiselect"
    tabindex="0"
    hidefocus="true"
    ref="elApp"
    @keydown="handleKeydown"
    @click="elAppClicked"
    :class="{ active: isActive, disabled: disabled, loading: loading }"
  >
  <div class="logs" style="width: 100%;">
    elDropdownLeft = {{ elDropdownLeft }} <br> 
    editTagIndex = {{ editTagIndex }} <br> 
    <!-- 
    stashTag = <pre>{{ stashTag }} </pre><br> 
    tagsGroupByTitle = <pre>{{ tagsGroupByTitle }} </pre><br>  -->
  
      <!-- tags = 
    <pre>
      {{ tags }}
    </pre> -->
  </div>

    <!-- @blur="inputDisabled ? inputBlur() : false" -->
    <div class="tags" ref="elTags">
      <VTag
        v-for="(tag, index) in merge == true ? tagsGroupByTitle : tags"
        ref="elTag"
        :key="`tag-${index}`"
        :tag="tag"
      >
        <template v-slot:tag-conjunction>
          <slot name="tag-conjunction"></slot>
        </template>
      </VTag>
    </div>

    <div
      class="stashTag"
      ref="elStashTag"
      v-if="stashTag.key != null && isEditMode == false"
    >
      <VTag :tag="stashTag"> </VTag>
    </div>

    <div class="main" ref="elMain">
      <Transition :name="transition ? 'slide' : ''">
        <div class="dropdowns" ref="elDropdown" :style="{left: `${elDropdownLeft}px`}">
          <!-- :class="{ loading: loading || dropdownLoading, transition: transition }"
        :style="dropdown.style"
        v-show="displayDropdown" -->
          <!--  <div
          v-show="loading == true || dropdownLoading == true"
          class="dropdowns__loading"
          :tabindex="-1"
        >
          <slot name="dropdowns-loading">
            <slot name="loading">
              <Loading></Loading>
            </slot>
          </slot>
        </div>
        <VTagDropdown v-if="displayUndo" system>
          <VTagOption
            class="undo"
            cannotSearch
            :divided="optionDisplayCount != 0"
          >
            <div @click="clickUndo()">
              <slot name="option-undo"
                ><i class="option__undo--arrow-left"></i>Undo</slot
              >
            </div>
          </VTagOption>
        </VTagDropdown>

        <VTagDropdown v-if="displayORConjunction" system>
          <VTagOption
            class="conjunction"
            cannotSearch
            :divided="haveOptionCanSelect"
          >
            <div @click="clickConjunction()">
              <slot name="option-OR-conjunction">OR</slot>
            </div>
          </VTagOption>
        </VTagDropdown> -->

          <slot v-if="$slots.default"></slot>
        </div>
      </Transition>

      <div class="fill" ref="elFill__div">
        <div v-show="loading == true" class="fill__loading" ref="loading">
          <slot name="loading">
            <Loading></Loading>
          </slot>
        </div>
        <!-- <FakeInput
          :>
        </FakeInput> -->
        <div class="fill__fake-input">
          <div
            class="fill__fake-input--line"
            v-if="
              // inputDisabled &&
              isActive
            "
          >
            &nbsp;
          </div>
          <div
            class="fill__fake-input--placeholder"
            v-if="
              isActive && elInputValue == ''
              // && isSelectDown == true &&
              // isFinish == false
            "
          >
            <div class="select-down">{{ selectDownPlaceholder }}</div>
          </div>
        </div>

        <input
          v-model="elInputValue"
          ref="elInput"
          autocomplete="off"
          tabindex="0"
          type="search"
        />
        <!-- :disabled="inputDisabled"
          :placeholder="inputPlaceholder"
          :maxlength="inputMaxlength"
          @blur="inputBlur()"
          @focus="inputFocus()" -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import VTag from "./components/tag/main.vue";
import Loading from "./components/partial/loading.vue";
// import VTagDropdown from "./components/tag-dropdown/main.vue";
// import VTagOption from "./components/tag-dropdown/option.vue";

// import EmitOutput from "./mixins/emits/output";
// import EmitGetStatus from "./mixins/emits/get-status";
// import EmitGetEditing from "./mixins/emits/get-editing";
// import EmitGetInputValue from "./mixins/emits/get-input-value";
// import EmitGetSelectingKey from "./mixins/emits/get-selecting-key";

// import RefOperatePushValue from "./mixins/ref-operates/push-value";
import resolve from "./utils/resolve";
import useKeyboard from "./composables/useKeyboard";
import useMultiselect from "./composables/useMultiselect";
import useHandelTag from "./composables/useHandelTag";

import { defineComponent } from "vue";

export default defineComponent({
  name: "v-tags-multiselect",
  emits: ["update:modelValue", "status", "edit", "input", "keydown", "keyup"],
  // mixins: [
  //   EmitOutput,
  //   EmitGetStatus,
  //   EmitGetEditing,
  //   EmitGetInputValue,
  //   EmitGetSelectingKey,
  //   RefOperatePushValue,
  // ],
  components: {
    VTag,
    Loading,
    // VTagDropdown,
    // VTagOption,
  },
  props: {
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    search: { type: Boolean, default: true },
    transition: { type: Boolean, default: true },
    create: { type: Boolean, default: true },
    merge: { type: Boolean, default: true },
    conjunction: { type: String, default: "" }, // 'OR', 'AND'
    deleteIcon: { type: String, default: "always" }, // 'always', 'edit', 'none'
    /**
     * placeholder
     **/
    placeholder: { type: String, default: "" },
    loadingPlaceholder: { type: String, default: "Wait a moment, please." },
    selectDownPlaceholder: { type: String, default: "Selected End." },
    finishPlaceholder: { type: String, default: "Finish." },
  },
  setup(props, context) {
    return resolve(props, context, [
      useMultiselect,
      useHandelTag,
      useKeyboard,
      // useData,
    ]);
  },
  // model: {
  //   prop: "value",
  //   event: "update",
  //   this.$emit('update:modelValue', value)
  // },
  // provide() {
  //   return {
  //     getApp: () => this,
  //   };
  // },
  data() {
    return {
      // isFirstFocus: false,
      // isFocus: false,
      // isFocusResetCurrentFilter: true,
      // keydown: {
      //   isProcessing: false,
      //   keyCode: undefined,
      // },
      // optionHoverByMouse: false,
      // inputValue: "",
      // apply: {
      //   clickByKeyName: "",
      //   clickPushValue: "",
      // },
      // edit: {
      //   index: -1,
      //   key: "",
      //   value: "",
      // },
      // current: {
      //   tag: {},
      //   conjunction: "",
      //   selectUDIndex: -1,
      //   selectLRIndex: -1,
      //   lockKeydownLR: false,
      // },
      // dropdown: {
      //   style: { left: "0px" },
      //   count: 0,
      //   optionCount: 0,
      //   customs: {},
      //   isFinishs: {},
      //   optionCounts: {},
      //   optionDisplaies: {},
      // },
      // tags: [],
      // tagsGroupByTitleKey: [],
      // firstPlaceholder: this.placeholder,
      // register: [
      //   {
      //     key: "",
      //     slotText: "",
      //     isFinish: false,
      //     childs: [
      //       {
      //         value: "",
      //         slotText: "",
      //         display: false,
      //       },
      //     ],
      //   },
      // ],
    };
  },
  /*
  watch: {
    /**
     * update v-events
     **
    tagsGroupByTitleKey: {
      handler() {
        this.output();
      },
      deep: true,
    },
    isEditMode: {
      handler(value) {
        if (value == false) {
          this.current.selectLRIndex = -1;
          this.current.lockKeydownLR = false;
        }
      },
      deep: true,
    },
    "current.selectUDIndex": {
      handler(value) {
        if (value == -1) {
          this.allOptionElmsNotHover();
          return false;
        }
        this.getDisplayOptionElms().forEach((option, index) => {
          if (index == value) {
            option.classList.add("hover");
          } else {
            option.classList.remove("hover");
          }
        });
      },
      deep: true,
    },
    "apply.clickByKeyName": {
      handler(newValue, oldValue) {
        if (
          newValue == "" &&
          oldValue != "" &&
          this.apply.pushValue != "" &&
          this.current.tag.key != undefined
        ) {
          this.finish(this.apply.pushValue);
        }
      },
      deep: true,
    },
    "dropdown.isFinishs": {
      handler(value) {
        this.dropdown.count = Object.keys(value).length;
      },
      deep: true,
    },
    "dropdown.optionCounts": {
      handler(value) {
        this.dropdown.optionCount = Object.values(value).reduce(
          (accumulator, value) => {
            return accumulator + value;
          },
          0
        );
      },
      deep: true,
    },
    /**
     * props
     **
    conjunction() {
      this.init();
      this.tags = [];
      this.tagsGroupByTitleKey = [];
      this.allOptionElmsNotHover();
      this.$forceUpdate();
    },
    loading(value) {
      this.resetDropdownPosition();
      if (value == true) {
        this.toFocusInput();
      }
    },
  },
  computed: {
    isLock() {
      return this.loading == true || this.disabled == true;
    },
    isSearchMode() {
      return this.search == true && this.inputValue != "";
    },
    isEditMode() {
      return this.edit.key != "" || this.edit.index != -1;
    },
    isFinish() {
      return this.isSelectDown == true && this.create == false;
    },
    isSelectDown() {
      if (this.haveCustomDrodown == true || this.dropdown.count == 0) {
        return false;
      }

      if (this.conjunction == "AND") {
        return this.allDropdownKeyIsInTagsKeys();
      } else if (
        this.optionDisplayCountAddSystem == 0 &&
        this.allDropdownIsFinish() == true
      ) {
        return true;
      }

      return false;
    },
    tagsNoUndefinedKeys() {
      return this.tags.filter((tag) => {
        return tag.key != undefined;
      });
    },
    tagsKeys() {
      return [...new Set(this.tagsNoUndefinedKeys.map((tag) => tag.key))];
    },
    haveCustomDrodown() {
      const booleans = Object.values(this.dropdown.customs).flat();
      const count = booleans.filter(Boolean).length;
      return count == 0 ? false : true;
    },
    haveOptionCanSelect() {
      return this.optionDisplayCount != 0;
    },
    inputPlaceholder() {
      const {
        placeholder,
        firstPlaceholder, // data
        loadingPlaceholder,
        finishPlaceholder,
      } = this;
      const change = firstPlaceholder != placeholder && placeholder != "";
      if (change == true) return placeholder;

      if (this.loading == true) return loadingPlaceholder;
      if (this.isFinish == true) return finishPlaceholder;

      if (this.tags.length == 0 && !this.current.tag.key) {
        return placeholder;
      }
      return "";
    },
    inputMaxlength() {
      const { isLock, inputDisabled } = this;
      return isLock == true || inputDisabled == true ? 0 : 99;
    },
    inputDisabled() {
      return this.search == false && this.create == false;
    },
    validatorConjunction() {
      return this.conjunction == "OR" || this.conjunction == "AND";
    },
    displayDropdown() {
      return (
        this.disabled == false &&
        this.isFocus == true &&
        this.optionDisplayCountAddSystem != 0
      );
    },
    displayUndo() {
      return this.current.tag.key != undefined;
    },
    displayORConjunction() {
      if (
        this.isEditMode == true ||
        this.validatorConjunction == true ||
        this.dropdown.count == 0
      ) {
        return false;
      }

      const { tagsKeys, current } = this;
      return (
        tagsKeys.length >= 1 &&
        current.conjunction != "OR" &&
        current.tag.key == undefined &&
        this.allDropdownIsFinish() == false
      );
    },
    optionDisplayCount() {
      const booleans = Object.values(this.dropdown.optionDisplaies).flat();
      return booleans.filter(Boolean).length;
    },
    optionDisplayCountAddSystem() {
      let addSystem = this.optionDisplayCount;
      if (this.displayUndo == true) addSystem++; // undo
      if (this.displayORConjunction == true) addSystem++; // OR
      return addSystem;
    },
  },
  mounted() {
    this.init();

    document.addEventListener("focusin", this.focusChanged);
    this.$el.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    document.removeEventListener("focusin", this.focusChanged);
  },
  methods: {
    init() {
      this.inputValue = "";
      this.initDataEdit();
      this.initDataCurrent();
      this.resetDropdownPosition();
      this.$forceUpdate();
    },
    initDataEdit() {
      this.edit.index = -1;
      this.edit.key = "";
      this.edit.value = "";
    },
    initDataCurrent() {
      if (Object.keys(this.current.tag).length != 0) {
        this.current.tag = {};
      }
      this.current.selectUDIndex = -1;
      this.current.selectLRIndex = -1;
      this.current.lockKeydownLR = false;
      this.current.conjunction =
        this.conjunction == "OR" || this.conjunction == "AND"
          ? this.conjunction
          : "";
    },
    /**
     * Elm option
     **
    getDisplayOptionElms() {
      return this.$el.querySelectorAll(
        ".dropdowns .dropdown:not(.hidden) .option:not(.hidden)"
      );
    },
    allOptionElmsNotHover() {
      this.$el
        .querySelectorAll(".dropdowns .dropdown .option.hover")
        .forEach((option) => {
          option.classList.remove("hover");
        });
    },
    setCurrentSelectIndexByIsHoverOptionElm() {
      this.getDisplayOptionElms().forEach((option, index) => {
        if (option.classList.value.indexOf("hover") != -1) {
          this.current.selectUDIndex = index;
        }
      });
    },
    /**
     * element events
     **
    focusApp() {
      if (this.isFirstFocus == false) return;
      if (this.isLock == true) return;
      if (this.isEditMode == true) {
        this.isFocus = true;
        this.resetDropdownPosition();
        return;
      }
      const parentNode = document.activeElement.parentNode;
      if (
        this.$el.contains(parentNode) &&
        parentNode != undefined &&
        parentNode.classList.value.indexOf("option") != -1 &&
        parentNode.getAttribute("value") == undefined
      ) {
        this.isFocus = true;
        return;
      }
      this.toFocusInput();
    },
    toFocusInput() {
      if (this.inputDisabled == true) {
        this.$refs.app.focus();
        this.inputFocus();
      } else {
        this.$refs.input.focus();
      }
    },
    inputFocus() {
      if (this.isLock == true) return;
      if (this.isFocus == true && this.isEditMode == true) {
        this.initDataEdit();
      }

      if (this.isFocus == false) {
        this.init();
      }

      this.isFocus = true;
      this.current.lockKeydownLR = false;
      this.resetDropdownPosition();
    },
    inputBlur() {
      setTimeout(() => {
        const actElm = document.activeElement;
        if (actElm != this.$refs.input && this.$el.contains(actElm) == false) {
          this.focusChanged(actElm);
        }
      }, 200);
    },
    focusChanged(event) {
      if (this.isFocus == false) return;
      const element = event.target ? event.target : event;
      const isFocusApp = element == this.$refs.app;
      const isFocusInput = element == this.$refs.input;
      if (
        !isFocusApp &&
        !isFocusInput &&
        this.$el.contains(element) == false &&
        this.isLock != true
      ) {
        if (this.isEditMode == true && this.edit.value == "") {
          this.deleteTags([this.edit.index]);
        }
        this.isFocus = false;
        this.initDataEdit();
      }
    },
    handleKeydown(event) {
      if (this.isLock == true) return false;

      let { current, inputValue, keydown } = this;
      const keyCode = event.keyCode ? event.keyCode : event;
      let selectUDIndex = current.selectUDIndex;
      keydown.isProcessing = true;
      keydown.keyCode = keyCode;
      if (keyCode === 13) {
        if (
          this.haveOptionCanSelect == false &&
          this.displayORConjunction == false
        ) {
          selectUDIndex = this.current.selectUDIndex = -1;
        }
        // enter
        if (this.isEditMode == true) {
          this.setCurrentSelectIndexByIsHoverOptionElm();
          selectUDIndex = current.selectUDIndex;
        }
        if (
          inputValue != "" &&
          (selectUDIndex == -1 || this.haveOptionCanSelect == false)
        ) {
          if (!current.tag.key && this.create == true) {
            this.current.tag.elm = {};
            this.current.tag.custom = true;
            this.finish(inputValue);
          }
          if (current.tag.key && current.tag.custom != false) {
            this.finish(inputValue);
          }
        }
        if (selectUDIndex == -1) {
          this.isFocus = true;
        }
        if (selectUDIndex != -1) {
          const option = this.getDisplayOptionElms()[selectUDIndex];
          if (option == undefined) return;
          const className = option.className;
          const conjunction = className.indexOf("conjunction") != -1;
          const noValue = className.indexOf("noValue") != -1;
          const undo = className.indexOf("undo") != -1;
          if (undo == true) {
            this.clickUndo();
          } else if (conjunction == true) {
            this.clickConjunction();
          } else {
            option.click();
          }
          if ((undo == true || conjunction == true) && noValue == false) {
            className.indexOf("undo") != -1;
          }
        }
      } else if ([38, 40].indexOf(keyCode) > -1) {
        // up, down
        this.optionHoverByMouse = false;
        if (current.selectUDIndex != -1) {
          this.setCurrentSelectIndexByIsHoverOptionElm();
        }
        selectUDIndex = current.selectUDIndex;
        let maxLength = this.optionDisplayCountAddSystem;

        if (keyCode == 40) {
          const minimum = this.haveOptionCanSelect ? 0 : -1;
          this.current.selectUDIndex =
            selectUDIndex + 1 >= maxLength ? minimum : selectUDIndex + 1;
        }
        if (keyCode == 38) {
          this.current.selectUDIndex =
            -1 >= selectUDIndex - 1 ? maxLength - 1 : selectUDIndex - 1;
        }
      } else if ([37, 39].indexOf(keyCode) > -1 && this.inputValue == "") {
        // left, right
        try {
          if (current.lockKeydownLR == true) throw "locked";
          this.current.selectLRIndex += keyCode == 37 ? 1 : -1;
          const selectLRIndex = current.selectLRIndex;
          if (selectLRIndex == -1 || selectLRIndex == this.tags.length)
            throw "refocus";

          if (
            selectLRIndex <= -1 ||
            selectLRIndex >= this.tags.length ||
            this.tags.length == 0
          )
            throw "init";

          const tagIndexs = this.getTagIndexs();
          const tagIndex = tagIndexs[tagIndexs.length - 1 - selectLRIndex];
          const tag = this.tags.find((tag) => tag.index == tagIndex);
          if (tag.custom == false) {
            this.toFocusInput();
          }
          this.current.selectUDIndex = -1;
          this.edit.index = tag.index;
          this.edit.key = tag.key;
          this.edit.value = tag.value;
        } catch (error) {
          if (error != "locked") {
            this.initDataEdit();
            this.current.selectLRIndex = -1;
          }
          if (error == "refocus") {
            this.toFocusInput();
          }
        }
      } else if ([27].indexOf(keyCode) > -1) {
        // esc
        if (selectUDIndex != -1) {
          this.current.selectUDIndex = -1;
        } else {
          this.isFocus = false;
        }
        this.$forceUpdate();
      } else if ([8, 46].indexOf(keyCode) > -1) {
        // back space, del
        if (this.inputValue != "") return false;
        if (this.isEditMode == true) return false;

        if (current.conjunction == "OR" && this.validatorConjunction == false) {
          this.current.conjunction = "";
          this.current.selectUDIndex = -1;
        } else if (current.tag && current.tag.key != undefined) {
          this.current.tag = {};
        } else {
          this.deleteTags(this.getDeleteTagIndexs());
          this.current.selectUDIndex = -1;
        }
      }

      keydown.isProcessing = false;
      this.resetDropdownPosition();
      this.$forceUpdate();
    },
    getDeleteTagIndexs() {
      if (this.tags.length == 0) return [];
      if (this.merge == false) return [this.tags.length - 1];

      return this.tagsGroupByTitleKey[
        this.tagsGroupByTitleKey.length - 1
      ].values.map((tag) => tag.index);
    },
    getTagIndexs() {
      let tagIndexs = [];
      if (this.merge == true) {
        this.tagsGroupByTitleKey.forEach((groupBy) => {
          groupBy.values.forEach((tag) => {
            tagIndexs.push(tag.index);
          });
        });
      } else {
        tagIndexs = this.tags.map((tag) => tag.index);
      }
      return tagIndexs;
    },
    /**
     * tag
     **
    deleteTags(indexs = []) {
      // tag index
      if (this.isLock == true) return;
      if (indexs.length == 0) return;

      let arrayIndexByTags = [];
      this.tags.forEach((tag, index) => {
        if (indexs.indexOf(tag.index) != -1) {
          arrayIndexByTags.push(index);
        }
      });

      arrayIndexByTags = arrayIndexByTags.sort((a, b) => {
        return b - a;
      });

      arrayIndexByTags.forEach((index) => {
        this.$delete(this.tags, index);
      });

      this.init();
      this.resetDropdownPosition();
      this.setTagsGroupByTitleKey();
      this.toFocusInput();
    },
    /**
     * dropdown
     **
    resetDropdownPosition() {
      this.$nextTick(() => {
        setTimeout(() => {
          const ref = this.$refs;
          let offset = ref.fill__div.offsetLeft || 0;
          let scrollLeft = ref.main.scrollLeft || 0;

          if (this.isEditMode == true) {
            const editDiv = this.$el.querySelector(
              ".tag.editing .tag__value.editing"
            );
            if (editDiv != undefined) {
              const appLeft = ref.app.getBoundingClientRect().left || 0;
              const editLeft = editDiv.getBoundingClientRect().left || 0;
              offset = editLeft - appLeft || 0;
              offset += 12;
            }
          }

          this.dropdown.style.left = offset - scrollLeft + "px";
        }, 10);
      });
    },
    finish(inputValue = "") {
      let tag = this.current.tag;

      if (this.isEditMode == true) {
        let index = this.edit.index;
        if (inputValue != "") {
          this.tags[index].value = inputValue;
          this.tags[index].elm.value = undefined;
          this.tags[index].displayValue = true;
        } else {
          this.tags[index].value = tag.value;
          this.tags[index].elm.value = tag.elm.value;
          this.tags[index].displayValue = tag.displayValue;
        }
      } else {
        if (inputValue != "") {
          tag.value = inputValue;
          tag.displayValue = true;
        }
        tag.index = this.tags.length;
        this.tags.push(tag);
      }
      this.apply.clickByKeyName = "";
      this.apply.pushValue = "";
      this.init();
      this.focusApp();
      this.setTagsGroupByTitleKey();
    },
    setTagsGroupByTitleKey() {
      this.resetTagsIndex();

      let result = [];
      this.tags.forEach((tag) => {
        let item = result.find((item) => {
          return tag.elm.title != undefined && item.key == tag.key;
        });
        if (!item) {
          result.push({
            key: tag.key,
            classList: tag.classList,
            values: [this.getTagValueByTagsGroupByTitleKey(tag)],
            elm: { title: tag.elm.title },
          });
        } else {
          item.values.push(this.getTagValueByTagsGroupByTitleKey(tag));
        }
      });
      this.tagsGroupByTitleKey = result;
    },
    getTagValueByTagsGroupByTitleKey(tag = {}) {
      return {
        index: tag.index,
        elm: tag.elm.value,
        key: tag.key,
        value: tag.value,
        custom: tag.custom,
        displayValue: tag.displayValue,
      };
    },
    resetTagsIndex() {
      let index = 0;
      this.tags.forEach((tag) => {
        tag.index = index;
        index++;
      });
    },
    // isSelectDown() & conjunction == "AND" run
    allDropdownKeyIsInTagsKeys() {
      const booleans = Object.keys(this.dropdown.isFinishs).map((keyName) => {
        return this.tagsKeys.find((tagsKey) => tagsKey == keyName) != undefined
          ? false
          : true;
      }); // reverse, in tags is false for filter(Boolean)
      const count = booleans.filter(Boolean).length; // remove false
      return count == 0 ? true : false;
    },
    allDropdownIsFinish() {
      const booleans = Object.values(this.dropdown.isFinishs);
      const count = booleans.filter(Boolean).length; // remove false
      return count == booleans.length ? true : false;
    },
    /**
     * elm option
     **
    clickUndo() {
      this.init();
    },
    clickConjunction() {
      this.inputValue = "";
      this.current.conjunction = "OR";
    },
    setCurrentSelectLRIndex() {
      if (this.isEditMode == false) return;
      const tagIndexs = this.getTagIndexs();
      this.current.selectLRIndex =
        this.tags.length - 1 - tagIndexs.indexOf(this.edit.index);
    },
    /**
     * tag-dropdown use
     **
    dropdownRegistered() {
      return false;
    },
    dropdownCancelled() {
      return false;
    },
    isRepeatTags(keyName, value) {
      return this.tags
        .filter((tag) => {
          return tag.key != undefined;
        })
        .find((tag) => {
          return tag.key == keyName && tag.value == value;
        })
        ? true
        : false;
    },
    isRepeatTagsByKey(keyName) {
      return this.tagsKeys.find((tagKeyName) => tagKeyName == keyName)
        ? true
        : false;
    },
  },
  */
});
</script>

<style scoped lang="scss">
.vue-tags-multiselect {
  & {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    border: 1px solid rgba(34, 36, 38, 0.15);
    text-align: left;
    cursor: text;
    min-width: 0;
    padding: 0 0.2em;
    padding-right: 0.8em;

    &.disabled,
    &.disabled input {
      cursor: no-drop !important;
    }

    &.loading,
    &.loading input {
      cursor: wait !important;
    }
  }
  .main {
    & {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      // overflow: hidden;
    }

    .fill {
      & {
        flex-grow: 1;
        display: flex;
        align-items: center;
      }

      .fill__fake-input {
        & {
          margin-left: 4px;
          position: relative;
        }

        .fill__fake-input--line {
          border-right: 1px solid black;
          margin-left: -1px;
          height: 20px;
          animation: focus 1.2s infinite;
        }
        .fill__fake-input--placeholder .select-down {
          position: absolute;
          opacity: 0;
          color: #757575;
          bottom: -10px;
          white-space: nowrap;
          animation: flickerAnimation 1.2s infinite;
          animation-iteration-count: 2;
        }
      }
      @keyframes flickerAnimation {
        0% {
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }

      @keyframes focus {
        0% {
          opacity: 1;
        }
        49% {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }
        100% {
          opacity: 0;
        }
      }
    }
  }

  input {
    position: static;
    padding: 0;
    margin: 0.2em;
    margin-left: 0.14em !important;
    cursor: text;
    background: none transparent !important;
    border: none !important;
    box-shadow: none !important;
    overflow: visible;
    width: 100%;

    &:focus {
      outline: none;
    }
  }

  .dropdowns {
    position: absolute;
    width: auto;
    border: 1px solid rgba(34, 36, 38, 0.15);
    background-color: white;
    overflow-y: auto;
    transform-origin: top;

    overflow: hidden;
    z-index: 11;
    top: 90%;


    &.loading {
      cursor: wait !important;
    }
  }

  .option__undo--arrow-left {
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 4px;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  }

  .loading:not(.vue-tags-multiselect):not(.dropdowns) {
    display: flex;
    align-items: center;
  }

  .dropdowns {
    .dropdowns__loading {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgb(242 242 242 / 63%);
    }
  }

  .transition {
    transition: transform 0.3s ease-in-out;
  }

  .slide-enter,
  .slide-leave-to {
    transform: scaleY(0);
  }
}
</style>
