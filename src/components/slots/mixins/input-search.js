export default {
  props: {
    cannotSearch: Boolean,
  },
  data() {
    return {
      isSearch: false,
    };
  },
  computed: {
    inputValue() {
      return this.app.inputValue;
    },
    search() {
      return this.app.search;
    },
  },
  watch: {
    search() {
      this.isSearch = false;
    },
    inputValue(value) {
      if (!value) {
        this.isSearch = false;
        return;
      }
      if (this.search == true && this.cannotSearch == false) {
        const slotsText = this.slotsToText(this.$slots.default());
        if (!slotsText) {
          this.isSearch = false;
          return;
        }

        const regex = new RegExp(value, "i");

        if (
          // String(this.value).search(regex) != -1 && // this.value is dropdown option value (title is key)
          slotsText.search(regex) != -1 // mixins: slots-to-text
        ) {
          this.isSearch = true;
        } else {
          this.isSearch = false;
        }
      }
    },
    isSearch(value) {
      this.dropdown.setChildrenIsSearchs(this.indexBySlot, value);
    },
  },
};
