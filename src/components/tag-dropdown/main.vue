<script>
import InjectApp from "../mixins/inject-app";
import { defineComponent, h, isVue2 } from "vue-demi";
export default defineComponent({
  name: "v-tag-dropdown",
  mixins: [InjectApp],
  provide() {
    return {
      getDropdown: () => this,
    };
  },
  props: {
    disabled: Boolean,
    divided: Boolean,
    displayAll: Boolean,
    hidden: Boolean,
    system: Boolean,
    value: String,
    custom: Boolean,
  },
  data() {
    return {
      hover: false,
      selecting: false,
      editMyself: false,
      titleVNode: {
        exist: false,
        elm: undefined,
      },
      classList: [],
      children: {
        optionCounts: 0,
        values: [],
        displaies: [],
        isSearchs: [],
      },
    };
  },
  computed: {
    currentTagKey() {
      return (this.app.current.tag || {}).key || undefined;
    },
    tags() {
      return this.app.tags;
    },
    edit() {
      return this.app.edit;
    },
    appIsEditMode() {
      return this.app.isEditMode;
    },
    appIsSearchMode() {
      return this.app.isSearchMode;
    },
    isSearchMode() {
      const booleans = Object.values(this.children.isSearchs).flat();
      const count = booleans.filter(Boolean).length;
      return count != 0 && this.appIsSearchMode == true;
    },
    realDisplayAll() {
      return this.displayAll || !this.titleVNode.exist;
    },
    applyClickByKeyName() {
      return this.app.apply.clickByKeyName;
    },
    currentConjunction() {
      return this.app.current.conjunction;
    },
    isSilentReply() {
      return (
        this.hidden == true ||
        this.system == true ||
        this.validatorString(this.value) == false
      );
    },
    isFinish() {
      if (this.custom == true) return false;
      if (this.hidden == true || this.children.optionCounts == 0) return true;

      let booleans = this.children.values
        .map((childrenValue) =>
          this.app.isRepeatTags(this.value, childrenValue)
        )
        .filter((boolean) => {
          return boolean != false;
        });
      if (booleans.length >= this.children.values.length) return true;

      return false;
    },
  },
  watch: {
    value(newValue, oldValue) {
      this.appCancelled(oldValue);
      this.appRegistered(newValue);
    },
    isSilentReply(value) {
      if (value == true) {
        this.appCancelled();
      } else {
        this.appRegistered();
      }
    },
    applyClickByKeyName(value) {
      if (value == this.value) {
        this.setTitle();
      }
    },
    edit: {
      handler(value) {
        if (value.index != -1 && value.key == this.value) {
          this.editMyself = true;
        } else {
          this.editMyself = false;
        }
      },
      deep: true,
    },
    "children.optionCounts": {
      handler(value) {
        if (this.isSilentReply == true) return;
        this.app.dropdown.optionCounts[this.value] = value;
      },
      deep: true,
    },
    "children.displaies": {
      handler(value) {
        if (this.isSilentReply == true) return;
        this.app.dropdown.optionDisplaies[this.value] = value;
      },
      deep: true,
    },
    isFinish: {
      handler(value) {
        if (this.isSilentReply == true) return;
        this.app.dropdown.isFinishs[this.value] = value || false;
      },
      immediate: true,
    },
    custom: {
      handler(value) {
        if (this.isSilentReply == true) return;
        this.app.dropdown.customs[this.value] = value;
      },
      immediate: true,
    },
  },
  mounted() {
    this.$el.classList.forEach((name) => {
      if (
        name != "dropdown" &&
        name != "display-all" &&
        name != "no-title" &&
        name != "disabled" &&
        name != "divided" &&
        name != "hidden" &&
        name != "hover"
      ) {
        this.classList.push(name);
      }
    });
  },
  beforeUnmount() {
    this.appCancelled();
  },
  methods: {
    // only watch isSilentReply is false work
    appRegistered(value = this.value) {
      if (this.validatorString(value) == false) return;
      const { app } = this;
      if (app.dropdown.customs[value] == undefined) {
        app.dropdown.customs[value] = this.custom;
      }
      if (app.dropdown.isFinishs[value] == undefined) {
        app.dropdown.isFinishs[value] = this.isFinish || false;
      }
      if (app.dropdown.optionCounts[value] == undefined) {
        app.dropdown.optionCounts[value] = this.children.optionCounts;
      }
      if (app.dropdown.optionDisplaies[value] == undefined) {
        app.dropdown.optionDisplaies[value] = this.children.displaies;
      }
    },
    appCancelled(value = this.value) {
      if (this.validatorString(value) == false) return;
      let { app } = this;
      this.$delete(app.dropdown.customs, value);
      this.$delete(app.dropdown.isFinishs, value);
      this.$delete(app.dropdown.optionCounts, value);
      this.$delete(app.dropdown.optionDisplaies, value);
    },
    optionRegistered(target = "title", value, indexBySlot) {
      if (target == "title" && this.titleVNode.exist == false) {
        this.titleVNode.exist = true;
        this.titleVNode.elm = value;
      } else if (target == "option") {
        this.children.optionCounts++; // maybe option value is undefined (need use push update option value)
        this.children.values.splice(indexBySlot, 0, value);
      }
      this.children.isSearchs.splice(indexBySlot, 0, false);
    },
    optionCancelled(target = "title", value, indexBySlot) {
      if (target == "title") {
        this.titleVNode.exist = false;
        this.titleVNode.elm = undefined;
      } else if (target == "option") {
        this.children.optionCounts--;
        let index = this.children.values.findIndex((childrenValue) => {
          return childrenValue == value;
        });
        if (index != -1) {
          this.children.values.splice(index, 1);
        }
      }
      this.children.isSearchs.splice(indexBySlot, 1);
    },
    setValue(option = {}) {
      if (this.titleVNode.exist == false) {
        this.setParentKey(option);
      } else {
        option.elm.title = this.titleVNode.elm;
        this.setParentKey(option);
      }
      this.app.finish();
    },
    setTitle() {
      this.setParentKey({
        key: this.value,
        elm: {
          title: this.titleVNode.elm,
        },
      });
    },
    setParentKey(option = { elm: {} }) {
      this.app.current.tag = {
        elm: {
          title: option.elm.title,
          value: option.elm.value,
        },
        key: option.key || this.value,
        value: option.value,
        custom: this.custom,
        classList: this.classList,
        displayValue: option.displayValue,
      };
      this.app.inputValue = "";
      this.app.apply.clickByKeyName = "";
      this.app.current.selectUDIndex = -1;
    },
    setOptionHoverByMouse() {
      this.app.optionHoverByMouse = true;
    },
    /**
     * for child title and option use
     **/
    optionHide(indexBySlot = 0, target = "title", optionValue = "") {
      if (this.system == true) return false;
      if (this.hidden == true || this.isFinish == true) return true;

      if (target == "option") {
        if (this.app.isRepeatTags(this.value, optionValue) == true) return true;
      }

      if (this.appIsEditMode == true) {
        if (this.editMyself == false) return true;
        if (this.editMyself == true) {
          return target == "title";
        }
      }

      // selecting no key
      if (this.currentConjunction == "AND" || this.currentConjunction == "") {
        if (this.app.isRepeatTagsByKey(this.value) == true) return true;
      }

      // 竟可能過濾 虛隱藏的情況 最後return false
      if (this.currentTagKey) {
        if (this.currentTagKey != this.value) return true;
        if (target == "title") return true;
      }

      if (this.appIsSearchMode == true) {
        return this.optionHideBySearchMode(indexBySlot, target);
      }

      if (target == "option" && this.currentTagKey == undefined) {
        return !this.realDisplayAll;
      }
      return false;
    },
    optionHideBySearchMode(indexBySlot = 0, target) {
      if (this.system == true) return false;
      const currentKey = this.currentTagKey;
      const isSearch = this.children.isSearchs[indexBySlot];
      if (currentKey) {
        return currentKey == this.value && target == "option"
          ? !isSearch
          : true;
      } else {
        if (this.isSearchMode == true && target == "title") return false;
        return !isSearch;
      }
    },
    setChildrenDisplaies(index, boolean) {
      if (index != -1) {
        this.children.displaies[index] = boolean;
      }
    },
    setChildrenIsSearchs(index, boolean) {
      if (index != -1) {
        this.children.isSearchs[index] = boolean;
      }
    },
    getChildrenIndex(childrenSlot) {
      let slots = isVue2 ? this.$slots.default : this.$slots.default();
      return slots.findIndex((slot) => {
        if (slot.child == undefined) return -1;
        return slot.child.$slots.default == childrenSlot;
      });
    },
    validatorString(value) {
      return !(value == undefined || value == "");
    },
    allChildrenIsHidden() {
      const booleans = Object.values(this.children.displaies) || [];
      const count = booleans.filter(Boolean).length;
      return count == 0;
    },
  },
  render(createElement) {
    const {
      // search
      currentTagKey,
      isSearchMode,
    } = this;
    const shell = {
      staticClass: "dropdown",
      class: {
        "no-title": !this.titleVNode.exist,
        "display-all":
          (currentTagKey == undefined && isSearchMode) || this.realDisplayAll,
        disabled: this.disabled,
        divided: this.divided,
        selecting: currentTagKey == this.value,
        editing: this.editMyself,
        hidden:
          this.hidden ||
          this.allChildrenIsHidden() ||
          (this.system == false && this.validatorString(this.value) == false),
        hover: this.hover,
        transition: this.app.transition,
      },
    };

    if (isVue2) {
      return createElement("div", shell, this.$slots.default);
    }
    // vue3
    return h("div", shell, this.$slots.default());
  },
});
</script>
<style scoped lang="scss">
.dropdown {
  &,
  .option {
    visibility: visible;
    opacity: 1;
  }

  &.transition,
  &.transition .option {
    transform: scaleY(1);
    transform-origin: top;
    transition: transform 0.26s ease;
  }

  .option {
    padding: 8px 18px;
    height: auto;
    text-align: left;
    cursor: pointer;

    &.disabled {
      cursor: default;
      pointer-events: none;
      opacity: 0.45;
    }

    &.divided {
      border-bottom: 1px solid #2224261a;
    }

    &.hover {
      background: #f2f2f2;
    }
  }

  &.divided {
    border-bottom: 1px solid #2224261a;
  }

  &.hidden,
  .option.hidden {
    height: 0;
    padding: 0;
    visibility: hidden;
    opacity: 0;
    transform: scaleY(0);
  }

  &.display-all:not(.no-title):not(.editing):not(.selecting) {
    // show all
    .option:not(.title) {
      padding-left: 30px;
    }
  }
}
</style>
