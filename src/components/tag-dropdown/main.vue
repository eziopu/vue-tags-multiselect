<script lang="ts">
import { defineComponent, h } from "vue";
export default defineComponent({
  render() {
    // const {
    //   // search
    //   currentTagKey,
    //   isSearchMode,
    // } = this;
    const shell = {
      class: {
        dropdown: true,
        // "no-title": true,
        // "display-all":
        //   (currentTagKey == undefined && isSearchMode) || this.realDisplayAll,
        // disabled: this.disabled,
        // divided: this.divided,
        // selecting: currentTagKey == this.value,
        // editing: this.editMyself,
        // hidden:
        //   this.hidden ||
        //   this.allChildrenIsHidden() ||
        //   (this.system == false && this.validatorString(this.value) == false),
        // hover: this.hover,
        // transition: this.app.transition,
      },
    };

    return h("div", shell, this.$slots.default());
  },
});
</script>

<style scoped lang="scss">
.dropdown {
  &,
  .option {
    // visibility: visible;
    // opacity: 1;
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
