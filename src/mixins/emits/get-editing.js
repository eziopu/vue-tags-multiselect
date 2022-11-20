export default {
  watch: {
    edit: {
      handler(value) {
        if (value.index != -1) {
          this.$emit("getEditing", {
            key: value.key,
            value: value.value,
          });
        } else {
          this.$emit("getEditing", {});
        }
      },
      deep: true,
    },
  },
};
