export default {
  methods: {
    pushValue(value = "", keyName = "") {
      if (value == "" || this.isLock == true) return;
      let tag = this.current.tag;
      if (
        // please this slot auto click
        tag.key == undefined &&
        typeof keyName == "string" &&
        keyName.length >= 1
      ) {
        this.apply.clickByKeyName = keyName;
        this.apply.pushValue = value;
        return;
      }
      if (tag.key != undefined) {
        this.finish(value);
      }
    },
  },
};
