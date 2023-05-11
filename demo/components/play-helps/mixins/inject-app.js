import { defineComponent } from "vue";
export default defineComponent({
  inject: ["getDemo"],
  computed: {
    app() {
      return this.getDemo();
    },
  },
});
