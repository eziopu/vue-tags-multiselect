export default {
  computed: {
    status() {
      let result = [];
      let { disabled, loading, edit, displayDropdown, isSelectDown, isFinish } =
        this;
      if (disabled == true) result.push("disabled");
      if (loading == true) result.push("loading");
      if (edit.index != -1 && edit.key != "") result.push("editing");
      if (displayDropdown == true) result.push("selecting");
      if (isFinish == true) result.push("finish");
      if (isFinish == false && isSelectDown == true) result.push("delect-down");
      return result;
    },
  },
  watch: {
    status(value) {
      this.$emit("getStatus", value);
    },
  },
};
