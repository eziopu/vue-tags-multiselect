export default {
  watch: {
    "current.tag": {
      handler(value) {
        this.$emit("getSelectingKey", value.key != undefined ? value.key : "");
      },
      deep: true,
      immediate: true,
    },
  },
};
