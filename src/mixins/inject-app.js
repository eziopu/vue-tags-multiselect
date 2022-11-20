export default {
  inject: ["getApp"],
  computed: {
    app() {
      return this.getApp();
    },
  },
};
