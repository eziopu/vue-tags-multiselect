export default {
  watch: {
    inputValue(value) {
      this.$emit("getInputValue", value);
    },
  },
};
